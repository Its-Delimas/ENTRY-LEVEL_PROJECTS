import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/components/dashboard/AppShell";
import PlacementCheck from "@/components/tracks/PlacementCheck";
import { getTrack, tracks } from "@/lib/curriculum";

export function generateStaticParams() {
  return tracks.filter((t) => t.placement?.length).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/placement/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);
  return { title: track ? `${track.name} placement check — Nurulabs` : "Not found — Nurulabs" };
}

export default async function PlacementPage({ params }: PageProps<"/placement/[slug]">) {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track?.placement?.length) notFound();
  return (
    <AppShell>
      <PlacementCheck track={track} />
    </AppShell>
  );
}
