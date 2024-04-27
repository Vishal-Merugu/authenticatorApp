import { randomBytes, pbkdf2Sync } from "crypto";

export function generateSalt(): string {
  return randomBytes(16).toString("base64");
}

export function hashPassword(password: string, salt: string): string {
  const saltBuffer = Buffer.from(salt, "base64");
  return pbkdf2Sync(password, saltBuffer, 10000, 64, "sha1").toString("base64");
}
