import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const payload = "user=demo@example.com&role=admin";
  const hardcodedKey = "insecure-static-key";
  const key = Buffer.from(hardcodedKey.padEnd(16, "0").slice(0, 16), "utf8");

  // A04 demo: cryptography intentionally weak and misused.
  const md5 = crypto.createHash("md5").update(payload).digest("hex");
  const ecb = crypto
    .createCipheriv("aes-128-ecb", key, null)
    .update(payload, "utf8", "base64");

  return NextResponse.json({
    note: "Cryptographie volontairement faible/mal configurée pour la demo.",
    payload,
    md5,
    ecb,
    keyHint: hardcodedKey,
  });
}
