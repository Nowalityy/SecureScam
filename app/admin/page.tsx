"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Database, LockOpen, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminPayload = {
  environment: string;
  revenue: string;
  credentials: { user: string; password: string };
  notes: string[];
};

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string | null>(null);
  const [payload, setPayload] = useState<AdminPayload | null>(null);
  const roleLabel = useMemo(() => {
    if (!role) return "—";
    if (role === "admin") return "admin";
    if (role === "user") return "utilisateur";
    if (role === "guest") return "invité";
    return role;
  }, [role]);

  useEffect(() => {
    const storedRole = localStorage.getItem("demo_role");
    setRole(storedRole ?? "guest");
  }, []);

  useEffect(() => {
    fetch("/api/admin")
      .then((response) => response.json())
      .then((data) => setPayload(data))
      .catch(() => setPayload(null));
  }, []);

  const accessGranted = useMemo(() => {
    const queryRole = searchParams.get("as");
    return role === "admin" || queryRole === "admin";
  }, [role, searchParams]);

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
              Console d'administration
            </Badge>
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
              Contrôle d'accès cassé
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-white">
            Tableau de bord des opérations
          </h1>
          <p className="max-w-2xl text-sm text-zinc-300">
            L'accès est décidé par un flag dans localStorage et le paramètre{" "}
            <span className="font-mono text-emerald-200">?as=admin</span> de
            l'URL. C'est volontairement vulnérable.
          </p>
        </header>

        <Card className="border-emerald-500/20 bg-black/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-emerald-50">
              <ShieldAlert className="h-5 w-5 text-emerald-300" />
              Statut d'accès
            </CardTitle>
            <Badge
              className={
                accessGranted
                  ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-100"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-200"
              }
            >
              {accessGranted ? "Autorisé" : "Refusé"}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-zinc-300">
            <p>
              Rôle actuel :{" "}
              <span className="font-mono text-emerald-200">{roleLabel}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
                onClick={() => {
                  localStorage.setItem("demo_role", "admin");
                  setRole("admin");
                }}
              >
                Forcer admin en local
              </Button>
              <Button
                variant="ghost"
                className="text-zinc-300"
                onClick={() => {
                  localStorage.removeItem("demo_role");
                  setRole("guest");
                }}
              >
                Réinitialiser le rôle
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-50">
              <Database className="h-5 w-5 text-emerald-300" />
              Données sensibles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-200">
            <p>
              Ces données sont récupérées depuis{" "}
              <span className="font-mono">/api/admin</span> sans authentification.
            </p>
            <pre className="rounded-lg border border-emerald-500/20 bg-black/70 p-4 text-xs text-emerald-100">
              {payload ? JSON.stringify(payload, null, 2) : "Chargement..."}
            </pre>
            <p className="flex items-center gap-2 text-xs text-emerald-200/80">
              <LockOpen className="h-4 w-4" />
              Tout le monde peut appeler ce point d'API directement.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
