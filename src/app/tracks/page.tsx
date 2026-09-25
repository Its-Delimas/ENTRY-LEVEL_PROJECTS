import type { Metadata } from "next";
import AppShell from "@/components/dashboard/AppShell";
import TrackCatalog from "@/components/tracks/TrackCatalog";

export const metadata: Metadata = { title: "Choose your track — Nurulabs" };

export default function TracksPage() {
  return (
    <AppShell>
      <TrackCatalog />
    </AppShell>
  );
}
