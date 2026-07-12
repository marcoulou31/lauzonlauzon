import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FORMSPARK_FORM_ID = "zOyTj4RtB";

function formDataToObject(formData: FormData): Record<string, string> {
  const payload: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    payload[key] = typeof value === "string" ? value : value.name;
  }
  return payload;
}

function getFormsparkEndpoint(): string {
  const endpoint = process.env.CONTACT_FORM_FORMSPARK_ENDPOINT?.trim();
  if (endpoint) {
    return endpoint;
  }

  const formId =
    process.env.CONTACT_FORM_FORMSPARK_ID?.trim() ?? DEFAULT_FORMSPARK_FORM_ID;
  return `https://submit-form.com/${formId}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (String(formData.get("website") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Veuillez remplir tous les champs obligatoires." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "L'adresse courriel semble invalide." },
      { status: 400 },
    );
  }

  formData.set("source", "lauzon-contact-page");
  formData.delete("website");

  try {
    const response = await fetch(getFormsparkEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToObject(formData)),
    });

    if (!response.ok) {
      const providerResponse = await response.text();
      console.error("[contact] Formspark rejected submission", {
        status: response.status,
        formsparkStatus: response.headers.get("formspark-status"),
        providerResponse,
      });

      return NextResponse.json(
        {
          ok: false,
          error:
            "Le service de formulaire a rejeté la soumission. Veuillez réessayer.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown provider error";
    console.error("[contact] Formspark request failed", { error: message });

    return NextResponse.json(
      {
        ok: false,
        error:
          "Impossible d'envoyer le formulaire pour le moment. Veuillez réessayer.",
      },
      { status: 502 },
    );
  }
}
