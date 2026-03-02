import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    environment: "production",
    revenue: "1 942 100,32 €",
    credentials: {
      user: "root",
      password: "not-a-real-password",
    },
    notes: [
      "Tous les contrôles d'accès sont volontairement absents.",
      "Le point d'API est public pour les tests de contrôle d'accès cassé.",
    ],
  });
}
