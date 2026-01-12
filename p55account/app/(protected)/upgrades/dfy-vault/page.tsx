import { Metadata } from "next"
import DFYVaultClient from "./DFYVaultClient"
import { APP_NAME } from "@/lib/branding"

export const metadata: Metadata = {
  title: `DFY Vault | ${APP_NAME}`,
  description: "200+ viral videos with ready-to-use comments",
}

export default function DFYVaultPage() {
  return <DFYVaultClient />
}
