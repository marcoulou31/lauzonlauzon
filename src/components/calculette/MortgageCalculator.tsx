"use client";

import { useMemo, useState } from "react";

const NOTARY_FEE = 2750;
const EVALUATION_FEE = 1500;
const INSPECTION_FEE = 1200;

const AMORTIZATION_YEARS = Array.from({ length: 25 }, (_, i) => 25 - i);

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) {
    return "0,00 $";
  }
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function calculatePayment(
  principal: number,
  periodRate: number,
  periods: number,
): number {
  if (!Number.isFinite(principal) || principal <= 0 || periods <= 0) {
    return 0;
  }
  if (periodRate === 0) {
    return principal / periods;
  }
  return (principal * periodRate) / (1 - Math.pow(1 + periodRate, -periods));
}

function calculateTransferTax(amount: number): number {
  if (amount <= 0) {
    return 0;
  }
  const tier1 = 58900;
  const tier2 = 294600;
  if (amount > tier2) {
    return (
      tier1 * 0.005 + (tier2 - tier1) * 0.01 + (amount - tier2) * 0.015
    );
  }
  if (amount > tier1) {
    return tier1 * 0.005 + (amount - tier1) * 0.01;
  }
  return amount * 0.005;
}

type ScheduleRow = {
  year: number;
  startBalance: number;
  interest: number;
  principal: number;
  endBalance: number;
};

function buildSchedule(
  principal: number,
  annualRate: number,
  years: number,
): ScheduleRow[] {
  if (!Number.isFinite(principal) || principal <= 0 || years <= 0) {
    return [];
  }

  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  const monthlyPayment = calculatePayment(principal, monthlyRate, totalMonths);

  const rows: ScheduleRow[] = [];
  let balance = principal;

  for (let year = 1; year <= years; year += 1) {
    const startBalance = balance;
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let month = 0; month < 12; month += 1) {
      const interest = balance * monthlyRate;
      let principalPaid = monthlyPayment - interest;
      if (principalPaid > balance) {
        principalPaid = balance;
      }
      yearInterest += interest;
      yearPrincipal += principalPaid;
      balance -= principalPaid;
    }

    rows.push({
      year,
      startBalance,
      interest: yearInterest,
      principal: yearPrincipal,
      endBalance: balance < 0.005 ? 0 : balance,
    });
  }

  return rows;
}

export function MortgageCalculator() {
  const [transaction, setTransaction] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [amortization, setAmortization] = useState(25);
  const [rate, setRate] = useState("4.00");
  const [showSchedule, setShowSchedule] = useState(false);

  const results = useMemo(() => {
    const transactionAmount = Number(transaction) || 0;
    const downPaymentAmount = Number(downPayment) || 0;
    const annualRate = (Number(rate) || 0) / 100;

    const loanAmount = transactionAmount - downPaymentAmount;
    const transferTax = calculateTransferTax(transactionAmount);
    const totalFees = transferTax + NOTARY_FEE + EVALUATION_FEE + INSPECTION_FEE;

    const monthlyPayment = calculatePayment(
      loanAmount,
      annualRate / 12,
      amortization * 12,
    );
    const biweeklyPayment = calculatePayment(
      loanAmount,
      annualRate / 26,
      amortization * 26,
    );

    return {
      loanAmount,
      transferTax,
      totalFees,
      monthlyPayment,
      biweeklyPayment,
      annualRate,
    };
  }, [transaction, downPayment, amortization, rate]);

  const schedule = useMemo(() => {
    if (!showSchedule) {
      return [];
    }
    return buildSchedule(results.loanAmount, results.annualRate, amortization);
  }, [showSchedule, results.loanAmount, results.annualRate, amortization]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="transaction"
            className="mb-2 block text-base font-medium text-navy"
          >
            Montant de la transaction
          </label>
          <div className="relative">
            <input
              id="transaction"
              type="number"
              inputMode="decimal"
              min={0}
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              placeholder="0"
              className="w-full border border-cream-dark bg-white px-4 py-4 pr-10 text-navy outline-none transition-colors focus:border-gold"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/50">
              $
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="downPayment"
            className="mb-2 block text-base font-medium text-navy"
          >
            Mise de fonds
          </label>
          <div className="relative">
            <input
              id="downPayment"
              type="number"
              inputMode="decimal"
              min={0}
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="0"
              className="w-full border border-cream-dark bg-white px-4 py-4 pr-10 text-navy outline-none transition-colors focus:border-gold"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/50">
              $
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="amortization"
              className="mb-2 block text-base font-medium text-navy"
            >
              Durée de l&apos;amortissement
            </label>
            <select
              id="amortization"
              value={amortization}
              onChange={(e) => setAmortization(Number(e.target.value))}
              className="w-full border border-cream-dark bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold"
            >
              {AMORTIZATION_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "an" : "ans"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rate"
              className="mb-2 block text-base font-medium text-navy"
            >
              Taux d&apos;intérêt (%)
            </label>
            <input
              id="rate"
              type="number"
              inputMode="decimal"
              step="0.01"
              min={0}
              max={100}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-cream-dark bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold"
            />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-navy/60">
          Les droits de mutation (taxe de bienvenue) sont calculés sur des
          paliers progressifs : 0,5 % jusqu&apos;à 58 900 $, 1,0 % de 58 900 $ à
          294 600 $ et 1,5 % au-delà. Certaines municipalités appliquent des paliers
          supplémentaires (2,0 % de 500 000 $ à 1 M$ et 3,0 % au-delà de 1 M$).
          Les seuils sont indexés annuellement.
        </p>
        <p className="text-sm leading-relaxed text-navy/60">
          Les montants pour les frais de notaire, l&apos;évaluation et
          l&apos;inspection sont des estimations moyennes. Cette calculette est
          fournie à titre indicatif seulement.
        </p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="border border-cream-dark bg-white p-6">
          <h3 className="font-serif text-2xl text-navy">
            Frais liés à la transaction
          </h3>
          <dl className="mt-4 space-y-3 text-navy/80">
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <dt>Droits de mutation</dt>
              <dd className="font-medium text-navy">
                {formatCurrency(results.transferTax)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <dt>
                Frais de notaire
                <span className="mt-0.5 block text-xs text-navy/50">
                  Acte de vente et acte de prêt, selon la nature du dossier
                </span>
              </dt>
              <dd className="font-medium text-navy">
                {formatCurrency(NOTARY_FEE)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <dt>Évaluation de l&apos;immeuble</dt>
              <dd className="font-medium text-navy">
                {formatCurrency(EVALUATION_FEE)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <dt>Inspection de l&apos;immeuble</dt>
              <dd className="font-medium text-navy">
                {formatCurrency(INSPECTION_FEE)}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-1">
              <dt className="font-medium text-navy">
                Total des frais approximatifs
              </dt>
              <dd className="font-serif text-xl text-gold">
                {formatCurrency(results.totalFees)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="border border-cream-dark bg-white p-6">
          <h3 className="font-serif text-2xl text-navy">Financement</h3>
          <div className="mt-4 space-y-3 text-navy/80">
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <span>Montant du prêt requis</span>
              <span className="font-medium text-navy">
                {formatCurrency(results.loanAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-cream-dark pb-3">
              <span>Remboursement mensuel</span>
              <span className="font-serif text-xl text-gold">
                {formatCurrency(results.monthlyPayment)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span>Remboursement aux 2 semaines</span>
              <span className="font-serif text-xl text-gold">
                {formatCurrency(results.biweeklyPayment)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowSchedule((prev) => !prev)}
          className="inline-flex w-full items-center justify-center border border-navy bg-navy px-6 py-4 text-base font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-navy-light"
        >
          {showSchedule
            ? "Masquer la cédule de remboursement"
            : "Afficher la cédule de remboursement"}
        </button>
      </div>

      {/* Schedule */}
      {showSchedule && (
        <div className="lg:col-span-2">
          {schedule.length === 0 ? (
            <p className="border border-cream-dark bg-white p-6 text-navy/70">
              Entrez un montant de transaction et un taux d&apos;intérêt pour
              générer la cédule de remboursement.
            </p>
          ) : (
            <div className="overflow-x-auto border border-cream-dark bg-white">
              <table className="w-full min-w-160 border-collapse text-left text-navy/80">
                <thead>
                  <tr className="bg-navy text-cream">
                    <th className="px-4 py-3 font-medium">An</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Solde début
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Intérêts
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Remb. capital
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Solde fin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr
                      key={row.year}
                      className="border-b border-cream-dark last:border-b-0 even:bg-cream/50"
                    >
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3 text-right">
                        {formatCurrency(row.startBalance)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatCurrency(row.endBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
