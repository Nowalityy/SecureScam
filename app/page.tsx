import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  Database,
  KeyRound,
  Settings,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const weaknesses = [
  {
    code: "A01:2025",
    title: "Broken Access Control",
    description:
      "Endpoints admin et profils accessibles sans verification d'acces.",
    icon: ShieldAlert,
  },
  {
    code: "A02:2025",
    title: "Security Misconfiguration",
    description:
      "Endpoint de debug public, CORS permissif, exposition de config.",
    icon: Settings,
  },
  {
    code: "A03:2025",
    title: "Supply Chain Failures",
    description:
      "Script tiers charge depuis un CDN sans version epinglee ni SRI.",
    icon: Bug,
  },
  {
    code: "A04:2025",
    title: "Cryptographic Failures",
    description:
      "Crypto faible (MD5, AES-ECB) et cle statique exposee.",
    icon: KeyRound,
  },
  {
    code: "A06:2025",
    title: "Insecure Design",
    description:
      "Reset de mot de passe avec token previsible et sans expiration.",
    icon: Database,
  },
  {
    code: "IDOR",
    title: "Insecure Direct Object Reference",
    description: "Acces aux profils par ID sans controle de propriete.",
    icon: UserRound,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 pb-16 pt-12 text-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-200/80">
            <Badge className="rounded-full border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
              OWASP 2025
            </Badge>
            laboratoire vulnerabilites
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              SecureScam Lab
              <span className="block text-emerald-200">
                Application volontairement fragile pour la formation.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300">
              Ce projet concentre plusieurs failles OWASP 2025 pour des demos
              rapides. Toutes les failles sont intentionnelles.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-400 text-emerald-950">
                <Link href="/admin">
                  Console admin <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
              >
                <Link href="/login">Connexion demo</Link>
              </Button>
              <Button asChild variant="ghost" className="text-zinc-300">
                <Link href="/users/1001">Profil exemple</Link>
              </Button>
            </div>
          </div>
        </header>

        <Separator className="bg-emerald-500/20" />

        <section className="grid gap-6 md:grid-cols-3">
          {weaknesses.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={`${item.code}-${item.title}`}
                className="border-emerald-500/20 bg-black/40 backdrop-blur"
              >
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <Badge className="w-fit rounded-full border-emerald-500/40 bg-emerald-500/10 text-[10px] text-emerald-100">
                      {item.code}
                    </Badge>
                    <CardTitle className="text-base text-emerald-50">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-zinc-300">
                  {item.description}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-50">
                Raccourcis de demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-200">
              <p>
                Accedez a{" "}
                <span className="font-mono text-emerald-200">/admin</span> sans
                vous connecter, ou ajoutez{" "}
                <span className="font-mono text-emerald-200">?as=admin</span>.
              </p>
              <p>
                Appelez{" "}
                <span className="font-mono text-emerald-200">/api/admin</span>,{" "}
                <span className="font-mono text-emerald-200">/api/debug</span> et{" "}
                <span className="font-mono text-emerald-200">/api/crypto</span> pour
                voir les failles A01/A02/A04.
              </p>
              <p>
                Changez l'ID dans{" "}
                <span className="font-mono text-emerald-200">/users/:id</span> pour
                illustrer l'IDOR.
              </p>
              <p>
                Testez{" "}
                <span className="font-mono text-emerald-200">/api/design</span> pour
                un reset de mot de passe concu de maniere fragile.
              </p>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20 bg-black/60">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-50">
                Notes importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-300">
              Ce site est une demo volontairement vulnerable. A utiliser
              uniquement dans des environnements de test isoles. Les failles
              sont documentees dans le README et dans les endpoints ci-dessus.
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
