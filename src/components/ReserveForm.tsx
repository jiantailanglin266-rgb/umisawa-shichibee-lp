"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2, Minus, Plus, CalendarDays, Clock, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { bcp47 } from "@/i18n/config";
import { submitForm } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

const SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

const ymd = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export function ReserveForm() {
  const { locale, t } = useI18n();
  const r = t.reserve;
  const bcp = bcp47[locale];

  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [plan, setPlan] = useState(0);
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const now = new Date();
    const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setToday(t0);
    setView({ y: t0.getFullYear(), m: t0.getMonth() });
    setMounted(true);
  }, []);

  // 曜日ヘッダー（日曜始まり・各言語）
  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(bcp, { weekday: "short" });
    const base = new Date(2024, 0, 7); // 2024-01-07 = 日曜
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + i))
    );
  }, [bcp]);

  const monthLabel = useMemo(() => {
    if (!view) return "";
    return new Intl.DateTimeFormat(bcp, { year: "numeric", month: "long" }).format(
      new Date(view.y, view.m, 1)
    );
  }, [view, bcp]);

  const cells = useMemo(() => {
    if (!view || !today) return [];
    const first = new Date(view.y, view.m, 1);
    const lead = first.getDay();
    const days = new Date(view.y, view.m + 1, 0).getDate();
    const arr: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= days; d++) arr.push(new Date(view.y, view.m, d));
    return arr;
  }, [view, today]);

  const canPrev = useMemo(() => {
    if (!view || !today) return false;
    return view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());
  }, [view, today]);

  const shift = (delta: number) => {
    setView((v) => {
      if (!v) return v;
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const notes = String(fd.get("notes") ?? "").trim();
    const honey = String(fd.get("company") ?? "").trim();
    if (honey) return setStatus("success");
    if (!selected) return setErr(r.errDate);
    if (!time) return setErr(r.errTime);
    if (!name) return setErr(r.errName);
    if (!EMAIL_RE.test(email)) return setErr(r.errEmail);

    setStatus("loading");
    const dateStr = selected
      ? `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, "0")}-${String(selected.getDate()).padStart(2, "0")}`
      : "";
    const ok = await submitForm({
      _subject: `【予約リクエスト】${name} / ${dateStr} ${time}`,
      name,
      email,
      date: dateStr,
      time: time ?? "",
      plan: r.plans[plan],
      guests: String(guests),
      notes,
      locale,
      source: "reserve",
    });
    if (ok) {
      setStatus("success");
    } else {
      setErr(r.errSend);
    }
  }
  const setErr = (m: string) => {
    setError(m);
    setStatus("error");
  };

  function reset() {
    setSelected(null);
    setTime(null);
    setPlan(0);
    setGuests(2);
    setStatus("idle");
    setError("");
  }

  const fullDate = selected
    ? new Intl.DateTimeFormat(bcp, { year: "numeric", month: "long", day: "numeric", weekday: "short" }).format(selected)
    : r.notSelected;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-5xl">
        <SectionHeading as="h1" align="center" eyebrow={r.eyebrow} title={r.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{r.lead}</p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-14 max-w-md rounded-2xl border border-gold/30 bg-ink-card px-8 py-12 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Check size={28} strokeWidth={1.5} />
            </span>
            <p className="mt-6 font-serif text-lg text-cream">{r.successTitle}</p>
            <p className="mt-2 text-sm leading-loose text-cream/70">{r.successMsg}</p>

            <dl className="mt-8 space-y-2.5 border-t border-white/10 pt-6 text-left text-sm">
              <Row label={r.labelDate} value={fullDate} />
              <Row label={r.labelTime} value={time ?? r.notSelected} />
              <Row label={r.labelPlan} value={r.plans[plan]} />
              <Row label={r.labelGuests} value={`${guests}${r.guestsUnit}`} />
            </dl>

            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full border border-cream/25 px-6 py-3 text-sm tracking-widest2 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {r.newReservation}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* カレンダー */}
            <div className="rounded-2xl border border-white/10 bg-ink-card p-6 md:p-7">
              <div className="mb-5 flex items-center gap-2 text-xs tracking-widest2 text-gold">
                <CalendarDays size={16} /> {r.stepDate}
              </div>

              {mounted && view ? (
                <>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => shift(-1)}
                      disabled={!canPrev}
                      aria-label="Previous month"
                      className="rounded-full p-1.5 text-cream/70 transition-colors enabled:hover:text-gold disabled:opacity-25"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <p className="font-serif text-base text-cream">{monthLabel}</p>
                    <button
                      type="button"
                      onClick={() => shift(1)}
                      aria-label="Next month"
                      className="rounded-full p-1.5 text-cream/70 transition-colors hover:text-gold"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[0.7rem] text-stone">
                    {weekdays.map((w) => (
                      <span key={w} className="py-1">{w}</span>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {cells.map((d, i) => {
                      if (!d) return <span key={`b${i}`} />;
                      const past = today ? d < today : false;
                      const isSel = selected && ymd(d) === ymd(selected);
                      return (
                        <button
                          key={ymd(d)}
                          type="button"
                          disabled={past}
                          onClick={() => setSelected(d)}
                          className={`aspect-square rounded-lg text-sm transition-colors ${
                            isSel
                              ? "bg-gold font-medium text-ink"
                              : past
                                ? "text-stone/30"
                                : "text-cream/80 hover:bg-white/10"
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="h-[19rem] animate-pulse rounded-xl bg-white/5" />
              )}
            </div>

            {/* 右：時間・詳細 */}
            <div className="space-y-6">
              {/* 時間 */}
              <div className="rounded-2xl border border-white/10 bg-ink-card p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-xs tracking-widest2 text-gold">
                  <Clock size={16} /> {r.timeHeading}
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTime(s)}
                      className={`rounded-lg border py-2.5 text-sm transition-colors ${
                        time === s
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/15 text-cream/80 hover:border-cream/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 詳細 */}
              <div className="rounded-2xl border border-white/10 bg-ink-card p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-xs tracking-widest2 text-gold">
                  <Users size={16} /> {r.detailsHeading}
                </div>

                {/* プラン */}
                <p className="mb-2 text-xs tracking-widest2 text-stone">{r.planLabel}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {r.plans.map((p, i) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlan(i)}
                      className={`rounded-lg border py-2.5 text-sm transition-colors ${
                        plan === i
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/15 text-cream/80 hover:border-cream/40"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* 人数 */}
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs tracking-widest2 text-stone">{r.guestsLabel}</p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="-"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-cream/80 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center font-display text-lg text-cream">
                      {guests}
                      <span className="ml-0.5 text-xs text-stone">{r.guestsUnit}</span>
                    </span>
                    <button
                      type="button"
                      aria-label="+"
                      onClick={() => setGuests((g) => Math.min(8, g + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-cream/80 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* 氏名・メール・備考 */}
                <div className="mt-6 space-y-4">
                  <Field id="name" label={r.nameLabel} placeholder={r.namePlaceholder} autoComplete="name" />
                  <Field id="email" label={r.emailLabel} placeholder={r.emailPlaceholder} type="email" autoComplete="email" />
                  <div>
                    <label htmlFor="notes" className="mb-2 block text-xs tracking-widest2 text-stone">
                      {r.notesLabel}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      placeholder={r.notesPlaceholder}
                      className="w-full resize-none rounded-lg border border-white/15 bg-ink px-4 py-3 text-cream placeholder:text-stone/60 outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  {/* ハニーポット */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                </div>
              </div>

              {/* 選択中サマリー */}
              <div className="rounded-2xl border border-white/10 bg-ink px-6 py-5 text-sm">
                <p className="font-serif text-cream">{r.summaryHeading}</p>
                <dl className="mt-3 space-y-1.5">
                  <Row label={r.labelDate} value={fullDate} />
                  <Row label={r.labelTime} value={time ?? r.notSelected} />
                </dl>
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-300">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {r.submitting}
                  </>
                ) : (
                  r.submit
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right text-cream/90">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs tracking-widest2 text-stone">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-cream placeholder:text-stone/60 outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
