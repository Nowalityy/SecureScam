import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  {
    id: "1001",
    name: "Maya Dupont",
    plan: "Entreprise",
    lastLogin: "01/03/2026",
    notes: "Escalade de facturation en cours.",
  },
  {
    id: "1002",
    name: "Jonas Keller",
    plan: "Pro",
    lastLogin: "26/02/2026",
    notes: "Demande de rapport SOC 2.",
  },
  {
    id: "1003",
    name: "Amina Zahra",
    plan: "Débutant",
    lastLogin: "22/02/2026",
    notes: "Réinitialisation MFA nécessaire.",
  },
];

export default function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = users.find((entry) => entry.id === params.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <Badge className="border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
            Profil utilisateur
          </Badge>
          <h1 className="text-3xl font-semibold text-white">{user.name}</h1>
          <p className="text-sm text-zinc-300">
            Cette page révèle des données utilisateur à partir de l'ID dans
            l'URL, sans vérification de propriété.
          </p>
        </header>

        <Card className="border-emerald-500/20 bg-black/60">
          <CardHeader>
            <CardTitle className="text-emerald-50">Détails du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-200">
            <div>Offre : {user.plan}</div>
            <div>Dernière connexion : {user.lastLogin}</div>
            <div>Notes : {user.notes}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
