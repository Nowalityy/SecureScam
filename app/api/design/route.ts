import { NextResponse } from "next/server";

let lastIssuedToken = "";

function issuePredictableToken(email: string) {
  const day = new Date().toISOString().slice(0, 10);
  return Buffer.from(`${email}:${day}:reset`, "utf8").toString("base64");
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; token?: string };
  const email = body.email ?? "demo@example.com";

  // A06 demo: insecure design for password reset (predictable token + no expiry).
  if (!body.token) {
    lastIssuedToken = issuePredictableToken(email);
    return NextResponse.json({
      message: "Token de réinitialisation émis (volontairement prévisible).",
      email,
      token: lastIssuedToken,
    });
  }

  // Accept any token that matches predictable format; no rate limit, no expiry.
  if (body.token === issuePredictableToken(email)) {
    return NextResponse.json({
      message:
        "Réinitialisation acceptée sans vérifications supplémentaires (insecure design).",
      email,
      token: body.token,
      resetPasswordTo: "password123",
    });
  }

  return NextResponse.json(
    { error: "Token invalide." },
    { status: 401 }
  );
}
