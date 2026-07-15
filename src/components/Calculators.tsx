import React, { useState, useEffect } from "react";
import { Calculator, TrendingUp, Landmark, PieChart } from "lucide-react";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal, SlideIn } from "./ui/scroll-reveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { t } from "../utils/translations";
import { formatPrice as formatPriceCurrency, CurrencyCode } from "../utils/currency";

interface CalculatorsProps {
  theme: "light" | "dark";
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export default function Calculators({ theme }: CalculatorsProps) {
  const isDark = theme === "dark";
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "en";
    }
    return "en";
  });

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, []);

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("app-currency") as CurrencyCode) || "AED";
    }
    return "AED";
  });

  useEffect(() => {
    const handleCurrencyChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCurrency(customEvent.detail);
      }
    };
    window.addEventListener("currency-change", handleCurrencyChange);
    return () => window.removeEventListener("currency-change", handleCurrencyChange);
  }, []);

  // --- Mortgage Calculator States ---
  const [propertyPrice, setPropertyPrice] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(3.99);
  const [loanYears, setLoanYears] = useState<number>(25);

  const [loanAmount, setLoanAmount] = useState<number>(4000000);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(18738);
  const [totalInterest, setTotalInterest] = useState<number>(2621400);
  const [totalPayment, setTotalPayment] = useState<number>(6621400);

  useEffect(() => {
    const principal = propertyPrice - downPayment;
    setLoanAmount(principal > 0 ? principal : 0);

    if (principal <= 0) {
      setMonthlyEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    const r = (interestRate / 100) / 12;
    const n = loanYears * 12;

    let emi = 0;
    if (r === 0) {
      emi = principal / n;
    } else {
      emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }

    const totalPay = emi * n;
    const totInterest = totalPay - principal;

    setMonthlyEmi(Math.round(emi));
    setTotalInterest(Math.round(totInterest));
    setTotalPayment(Math.round(totalPay + downPayment));
  }, [propertyPrice, downPayment, interestRate, loanYears]);

  const handlePriceChange = (val: number) => {
    setPropertyPrice(val);
    const pct = downPayment / propertyPrice;
    setDownPayment(Math.round(val * (isNaN(pct) ? 0.2 : pct)));
  };

  // --- ROI Calculator States ---
  const [annualRent, setAnnualRent] = useState<number>(350000);
  const [expenses, setExpenses] = useState<number>(60000);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(8);

  const [netRoi, setNetRoi] = useState<number>(6.35);
  const [roiRating, setRoiRating] = useState<string>("Very Good");
  const [netAnnualReturn, setNetAnnualReturn] = useState<number>(290000);

  useEffect(() => {
    const netReturn = annualRent - expenses;
    const computedRoi = (netReturn / propertyPrice) * 100;
    setNetRoi(Number(computedRoi.toFixed(2)));
    setNetAnnualReturn(netReturn);

    if (computedRoi >= 8) setRoiRating(t("calc.ratingOutstanding", lang));
    else if (computedRoi >= 6) setRoiRating(t("calc.ratingVeryGood", lang));
    else if (computedRoi >= 4) setRoiRating(t("calc.ratingGood", lang));
    else setRoiRating(t("calc.ratingModerate", lang));
  }, [annualRent, expenses, propertyPrice, lang]);

  // Donut chart
  const totalPool = downPayment + loanAmount + totalInterest;
  const dpPct = (downPayment / totalPool) * 100 || 0;
  const princPct = (loanAmount / totalPool) * 100 || 0;
  const intPct = (totalInterest / totalPool) * 100 || 0;

  const dRadius = 40;
  const dCirc = 2 * Math.PI * dRadius;
  const offsetPrincipal = dCirc - (dpPct / 100) * dCirc;
  const offsetInterest = dCirc - ((dpPct + princPct) / 100) * dCirc;

  const formatPrice = (val: number) => {
    return formatPriceCurrency(val, currency);
  };

  return (
    <section id="calculators-section" className="relative z-10 w-full py-20 md:py-28 overflow-hidden">
      <GradientBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
              {t("calc.investTitle", lang)}
            </h2>
            <p className={`text-sm max-w-xl mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
              {t("calc.investDesc", lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ============ MORTGAGE CALCULATOR ============ */}
          <SlideIn from="left">
            <div className={`rounded-3xl border backdrop-blur-xl overflow-hidden ${isDark ? "border-white/10 bg-white/5" : "border-stone-200/60 bg-white/80 shadow-sm"}`}>
              <div className="relative z-10 p-6 md:p-8">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-[#C9A227]" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{t("calc.mortgageTitle", lang)}</h3>
                </div>

                {/* Main Result */}
                <div className={`mb-8 p-5 rounded-2xl ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-stone-50 border border-stone-200/60"}`}>
                  <p className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("calc.monthlyEmi", lang)}</p>
                  <span className="font-num text-3xl md:text-4xl font-extrabold text-[#E7C96A]">
                    {formatPrice(monthlyEmi)}
                  </span>
                </div>

                {/* Sliders */}
                <div className="space-y-5 mb-8">
                  <div>
                    <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.propertyPrice", lang)}</span>
                      <span className="font-num text-xs font-bold text-[#E7C96A]">{formatPrice(propertyPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="20000000"
                      step="250000"
                      value={propertyPrice}
                      onChange={(e) => handlePriceChange(Number(e.target.value))}
                      className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A227] ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                    />
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.downPayment", lang)} ({Math.round((downPayment / propertyPrice) * 100)}%)</span>
                      <span className="font-num text-xs font-bold text-[#E7C96A]">{formatPrice(downPayment)}</span>
                    </div>
                    <input
                      type="range"
                      min={propertyPrice * 0.1}
                      max={propertyPrice * 0.8}
                      step="50000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A227] ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                    />
                  </div>

                  {/* Interest Rate & Loan Tenure */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={`font-sans text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.interestRate", lang)}</span>
                        <span className="font-num text-xs font-bold text-[#E7C96A]">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.05"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A227] ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={`font-sans text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.loanTenure", lang)}</span>
                        <span className="font-num text-xs font-bold text-[#E7C96A]">{loanYears} Yr</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={loanYears}
                        onChange={(e) => setLoanYears(Number(e.target.value))}
                        className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A227] ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Donut Chart + Breakdown */}
                <div className="grid grid-cols-2 gap-6 items-center">
                  {/* Donut */}
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r={dRadius} fill="transparent" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} strokeWidth="8" />
                      <circle cx="50" cy="50" r={dRadius} fill="transparent" stroke="#C9A227" strokeWidth="8"
                        strokeDasharray={dCirc} strokeDashoffset={0} strokeLinecap="round" />
                      <circle cx="50" cy="50" r={dRadius} fill="transparent" stroke="#10b981" strokeWidth="8"
                        strokeDasharray={dCirc} strokeDashoffset={offsetPrincipal} strokeLinecap="round" />
                      <circle cx="50" cy="50" r={dRadius} fill="transparent" stroke="#3b82f6" strokeWidth="8"
                        strokeDasharray={dCirc} strokeDashoffset={offsetInterest} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <PieChart className={`w-4 h-4 mb-1 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      <span className={`font-num text-[10px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.breakdown", lang)}</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
                        <span className={`font-sans text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>Down Payment</span>
                      </span>
                      <span className={`font-num text-[11px] font-semibold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{formatPrice(downPayment)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className={`font-sans text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.principalLoan", lang)}</span>
                      </span>
                      <span className={`font-num text-[11px] font-semibold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{formatPrice(loanAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                        <span className={`font-sans text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.totalInterest", lang)}</span>
                      </span>
                      <span className={`font-num text-[11px] font-semibold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{formatPrice(totalInterest)}</span>
                    </div>
                    <div className={`pt-2 border-t ${isDark ? "border-white/5" : "border-stone-200/60"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-sans text-[11px] font-semibold ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("calc.totalPayment", lang)}</span>
                        <span className="font-num text-[11px] text-[#E7C96A] font-bold">{formatPrice(totalPayment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* ============ ROI CALCULATOR ============ */}
          <SlideIn from="right">
            <div className={`relative rounded-3xl border backdrop-blur-xl overflow-hidden ${isDark ? "border-white/10 bg-white/5" : "border-stone-200/60 bg-white/80 shadow-sm"}`}>
              <div className="relative z-10 p-6 md:p-8">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{t("calc.roiTitle", lang)}</h3>
                </div>

                {/* Main Result */}
                <div className={`mb-8 p-5 rounded-2xl ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-stone-50 border border-stone-200/60"}`}>
                  <p className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("calc.netAnnualRoi", lang)}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-num text-3xl md:text-4xl font-extrabold text-emerald-400">
                      {netRoi}%
                    </span>
                    <span className={`text-sm ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                      = {formatPrice(netAnnualReturn)} / year
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{roiRating}</p>
                </div>

                {/* Sliders */}
                <div className="space-y-5 mb-8">
                  {/* Annual Rent */}
                  <div>
                    <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.expectedRent", lang)}</span>
                      <span className="font-num text-xs font-bold text-emerald-400">{formatPrice(annualRent)}</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="1000000"
                      step="10000"
                      value={annualRent}
                      onChange={(e) => setAnnualRent(Number(e.target.value))}
                      className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-400 ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                    />
                  </div>

                  {/* Expenses */}
                  <div>
                    <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.expenses", lang)}</span>
                      <span className="font-num text-xs font-bold text-yellow-400">{formatPrice(expenses)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={expenses}
                      onChange={(e) => setExpenses(Number(e.target.value))}
                      className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-yellow-400 ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                    />
                  </div>

                  {/* Appreciation */}
                  <div>
                    <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("calc.appreciation", lang)}</span>
                      <span className="font-num text-xs font-bold text-[#E7C96A]">{propertyAppreciation}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={propertyAppreciation}
                      onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                      className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#C9A227] ${isDark ? "bg-white/5" : "bg-stone-200"}`}
                    />
                  </div>
                </div>

                {/* 5-Year Projection Chart */}
                <div className={`p-4 rounded-2xl ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-stone-50 border border-stone-200/60"}`}>
                  <p className={`text-xs mb-4 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("calc.projection", lang)}</p>
                  <div className="h-32 flex items-end justify-between gap-2 px-1">
                    {[...Array(5)].map((_, i) => {
                      const year = i + 1;
                      const futureVal = propertyPrice * Math.pow(1 + (propertyAppreciation / 100), year);
                      const maxVal = propertyPrice * 1.8;
                      const ratio = (futureVal / maxVal) * 100;

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                          <div className="relative w-full flex justify-center">
                            <div className={`absolute -top-8 text-[9px] px-2 py-1 rounded border border-emerald-500/30 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-30 font-num ${isDark ? "bg-black/95 text-white" : "bg-white shadow-lg text-stone-900 border border-stone-200"}`}>
                              {formatPrice(futureVal)}
                            </div>
                          </div>
                          <div className="w-full relative">
                            <div
                              style={{ height: `${Math.min(90, Math.max(20, ratio))}px` }}
                              className="w-full rounded-t-md bg-emerald-500/70 hover:bg-emerald-400 transition-colors duration-300"
                            />
                          </div>
                          <span className={`text-[9px] ${isDark ? "text-gray-500" : "text-stone-400"}`}>Yr {year}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
