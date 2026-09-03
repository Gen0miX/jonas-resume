// components/projects/stackIcons.ts
import type { IconType } from "react-icons";
import { KeyRound, MapPin } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiResend,
  SiSanity,
  SiGooglemaps,
} from "react-icons/si";

const STACK_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  Resend: SiResend,
  "Sanity CMS": SiSanity,
  "Maps API": SiGooglemaps,
};

const FALLBACK_ICONS: Record<string, IconType> = {
  "Maps API": MapPin,
  "Auth par mot de passe": KeyRound,
};

export function getStackIcon(item: string): IconType | undefined {
  return STACK_ICONS[item] ?? FALLBACK_ICONS[item];
}
