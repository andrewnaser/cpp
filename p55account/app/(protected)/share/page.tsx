import type { Metadata } from "next"
import LinkVaultClient from "./LinkVaultClient"
import { APP_NAME } from "@/lib/branding"

export const metadata: Metadata = {
  title: `Link Vault | ${APP_NAME}`,
  description: "Store and manage your affiliate links for maximum conversions.",
}

export default function LinkVaultPage() {
  return <LinkVaultClient />
}
