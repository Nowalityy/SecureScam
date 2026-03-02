"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("analyste");
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    localStorage.setItem("demo_name", name);
    localStorage.setItem("demo_role", role);
    router.push("/admin");
  };

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">
              SecureScam Lab
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Écran de connexion factice
            </h1>
          </div>
          <Badge className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
            Volontairement vulnérable
          </Badge>
        </header>

        <Card className="border-emerald-500/20 bg-black/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-50">
              <KeyRound className="h-5 w-5 text-emerald-300" />
              Accès local uniquement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-300">
            <p>
              Ce formulaire écrit les rôles dans localStorage. Il n'y a aucune
              vérification côté serveur.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Nom affiché
                </label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="border-emerald-500/20 bg-black/40 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Rôle
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={role === "user" ? "default" : "secondary"}
                    className="flex-1 border border-emerald-500/30 bg-emerald-500/15 text-emerald-100"
                    onClick={() => setRole("user")}
                  >
                    Utilisateur
                  </Button>
                  <Button
                    type="button"
                    variant={role === "admin" ? "default" : "secondary"}
                    className="flex-1 border border-emerald-500/30 bg-emerald-500/15 text-emerald-100"
                    onClick={() => setRole("admin")}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-emerald-400 text-emerald-950"
              onClick={handleLogin}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Accéder à la console
            </Button>
            <p className="text-xs text-emerald-200/80">
              Astuce : vous pouvez modifier{" "}
              <span className="font-mono">demo_role</span> dans les DevTools pour
              obtenir un accès admin.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
