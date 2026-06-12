"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { subscribe, type SubscribeState } from "@/app/actions";
import { SectionHeading } from "@/components/SectionHeading";

const initialState: SubscribeState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          送信中…
        </>
      ) : (
        "登録する"
      )}
    </button>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(subscribe, initialState);

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="container-x max-w-xl">
        <SectionHeading
          align="center"
          eyebrow="Notify Me"
          title="公開を、いちばんに。"
        />
        <p className="mt-6 text-center leading-loose text-cream/70">
          Makuake 公開のお知らせを、メールでお届けします。
          <br className="hidden sm:block" />
          最初の支援者として、海沢 七兵衛の物語に加わってください。
        </p>

        {state.status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 flex flex-col items-center rounded-2xl border border-gold/30 bg-ink-card px-8 py-14 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Check size={28} strokeWidth={1.5} />
            </span>
            <p className="mt-6 font-serif text-lg text-cream">
              ご登録ありがとうございます。
            </p>
            <p className="mt-2 text-sm leading-loose text-cream/70">
              Makuake公開時にご案内します。
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="mt-12 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs tracking-widest2 text-stone"
              >
                お名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="海沢 七兵衛"
                className="w-full rounded-lg border border-white/15 bg-ink-card px-4 py-3.5 text-cream placeholder:text-stone/60 outline-none transition-colors focus:border-gold"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs tracking-widest2 text-stone"
              >
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/15 bg-ink-card px-4 py-3.5 text-cream placeholder:text-stone/60 outline-none transition-colors focus:border-gold"
              />
            </div>

            {/* ハニーポット（bot 対策・視覚的に隠す） */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {state.status === "error" && (
              <p role="alert" className="text-sm text-red-300">
                {state.message}
              </p>
            )}

            <SubmitButton />

            <p className="text-center text-xs leading-relaxed text-stone">
              送信により
              <Link href="/privacy" className="text-cream/70 underline underline-offset-2 hover:text-gold">
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
