import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    mode: "debug",
    message:
      "Endpoint de debug expose (volontairement) pour illustrer une mauvaise configuration.",
    server: {
      nodeEnv: process.env.NODE_ENV,
      nextRuntime: process.env.NEXT_RUNTIME,
      timezone: process.env.TZ,
    },
    // Expose de la configuration sensible pour la demo A02 (mauvaise config).
    env: process.env,
    features: {
      publicDebug: true,
      allowAllOrigins: true,
      allowAllMethods: true,
    },
  });

  // CORS permissif + headers de debug: mauvaise configuration volontaire.
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  response.headers.set("X-Debug-Enabled", "true");

  return response;
}
