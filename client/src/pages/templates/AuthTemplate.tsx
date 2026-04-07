/**
 * Volt UI – Login & Auth Template
 * Route: /showcase/auth
 * Drei Screens: Sign-in, Sign-up, Forgot Password
 */
import { useState } from "react";
import { Link } from "wouter";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltTabs } from "@/components/volt/VoltTabs";
import {
  Terminal, Mail, Lock, User, Eye, EyeOff,
  ArrowRight, Github, Chrome, KeyRound, CheckCircle2,
} from "lucide-react";

type Screen = "signin" | "signup" | "forgot";

function SignInForm({ onForgot }: { onForgot: () => void }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="space-y-4">
      <VoltInput
        label="E-Mail"
        type="email"
        placeholder="name@firma.de"
        leftElement={<Mail className="w-4 h-4 text-muted-foreground" />}
        variant="boxed"
      />
      <VoltInput
        label="Passwort"
        type={showPw ? "text" : "password"}
        placeholder="••••••••"
        leftElement={<Lock className="w-4 h-4 text-muted-foreground" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        variant="boxed"
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-border" />
          <span className="text-muted-foreground">Angemeldet bleiben</span>
        </label>
        <button
          type="button"
          onClick={onForgot}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Passwort vergessen?
        </button>
      </div>
      <VoltButton variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
        Anmelden
      </VoltButton>
    </div>
  );
}

function SignUpForm() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <VoltInput
          label="Vorname"
          placeholder="Max"
          leftElement={<User className="w-4 h-4 text-muted-foreground" />}
          variant="boxed"
        />
        <VoltInput
          label="Nachname"
          placeholder="Mustermann"
          variant="boxed"
        />
      </div>
      <VoltInput
        label="E-Mail"
        type="email"
        placeholder="name@firma.de"
        leftElement={<Mail className="w-4 h-4 text-muted-foreground" />}
        variant="boxed"
      />
      <VoltInput
        label="Passwort"
        type={showPw ? "text" : "password"}
        placeholder="Mindestens 8 Zeichen"
        leftElement={<Lock className="w-4 h-4 text-muted-foreground" />}
        hint="Mindestens 8 Zeichen, 1 Großbuchstabe, 1 Zahl"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        variant="boxed"
      />
      <label className="flex items-start gap-2 cursor-pointer text-sm text-muted-foreground">
        <input type="checkbox" className="rounded border-border mt-0.5 flex-shrink-0" />
        <span>
          Ich stimme den{" "}
          <span className="text-foreground underline underline-offset-2">Nutzungsbedingungen</span>
          {" "}und der{" "}
          <span className="text-foreground underline underline-offset-2">Datenschutzerklärung</span>
          {" "}zu.
        </span>
      </label>
      <VoltButton variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
        Konto erstellen
      </VoltButton>
    </div>
  );
}

function ForgotForm({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-4">
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 bg-[#E4FF97] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-black" />
          </div>
          <h3 className="font-display font-bold text-base mb-2">E-Mail gesendet</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Wir haben dir einen Link zum Zurücksetzen deines Passworts geschickt.
            Bitte prüfe auch deinen Spam-Ordner.
          </p>
          <VoltButton variant="outline" size="sm" onClick={onBack}>
            Zurück zur Anmeldung
          </VoltButton>
        </div>
      ) : (
        <>
          <VoltAlert variant="info" title="Passwort zurücksetzen">
            Gib deine E-Mail-Adresse ein. Wir senden dir einen Link zum Zurücksetzen.
          </VoltAlert>
          <VoltInput
            label="E-Mail"
            type="email"
            placeholder="name@firma.de"
            leftElement={<Mail className="w-4 h-4 text-muted-foreground" />}
            variant="boxed"
          />
          <VoltButton
            variant="primary"
            size="md"
            className="w-full"
            rightIcon={<KeyRound className="w-4 h-4" />}
            onClick={() => setSent(true)}
          >
            Link anfordern
          </VoltButton>
          <button
            type="button"
            onClick={onBack}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Zurück zur Anmeldung
          </button>
        </>
      )}
    </div>
  );
}

export default function AuthTemplate() {
  const [screen, setScreen] = useState<Screen>("signin");

  const title = screen === "forgot" ? "Passwort zurücksetzen" : "Willkommen zurück";
  const subtitle =
    screen === "forgot"
      ? "Wir helfen dir, wieder Zugang zu erhalten."
      : screen === "signin"
      ? "Melde dich in deinem Konto an."
      : "Erstelle jetzt dein kostenloses Konto.";

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-[#E4FF97]" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight">Volt</span>
        </div>
        <Link href="/showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Showcase
        </Link>
      </header>

      {/* Screen Switcher (nur für Template-Demo) */}
      <div className="flex justify-center pt-6 pb-2">
        <div className="inline-flex items-center gap-1 bg-background border border-border rounded-full px-2 py-1.5 text-xs">
          <span className="text-muted-foreground mr-1 pl-1">Demo:</span>
          {(["signin", "signup", "forgot"] as Screen[]).map((s) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                screen === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "signin" ? "Sign-in" : s === "signup" ? "Sign-up" : "Forgot"}
            </button>
          ))}
        </div>
      </div>

      {/* Auth Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <VoltCard variant="elevated" className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center">
                <Terminal className="w-6 h-6 text-[#E4FF97]" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="font-display font-bold text-xl mb-1">{title}</h1>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>

            {/* Social Login */}
            {screen !== "forgot" && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <VoltButton variant="outline" size="sm" leftIcon={<Github className="w-4 h-4" />}>
                    GitHub
                  </VoltButton>
                  <VoltButton variant="outline" size="sm" leftIcon={<Chrome className="w-4 h-4" />}>
                    Google
                  </VoltButton>
                </div>
                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-3 text-muted-foreground">oder mit E-Mail</span>
                  </div>
                </div>
              </>
            )}

            {/* Tab Navigation (Sign-in / Sign-up) */}
            {screen !== "forgot" && (
              <div className="mb-5">
                <VoltTabs
                  variant="boxed"
                  activeTab={screen}
                  onTabChange={(id) => setScreen(id as Screen)}
                  tabs={[
                    { id: "signin", label: "Anmelden" },
                    { id: "signup", label: "Registrieren" },
                  ]}
                />
              </div>
            )}

            {/* Form */}
            {screen === "signin" && <SignInForm onForgot={() => setScreen("forgot")} />}
            {screen === "signup" && <SignUpForm />}
            {screen === "forgot" && <ForgotForm onBack={() => setScreen("signin")} />}
          </VoltCard>

          {/* Footer Note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Durch die Nutzung stimmst du unseren{" "}
            <span className="underline underline-offset-2 cursor-pointer">Nutzungsbedingungen</span>
            {" "}zu.
          </p>
        </div>
      </main>
    </div>
  );
}
