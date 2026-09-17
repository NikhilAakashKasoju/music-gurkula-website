import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramHeader from "@/components/layout/ProgramHeader";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/shared/WhatsAppFab";
import ProgramHero from "@/components/programs/ProgramHero";
import ProgramDetails from "@/components/programs/ProgramDetails";
import OtherPaths from "@/components/programs/OtherPaths";
import { PROGRAMS, getOtherPrograms, getProgram } from "@/lib/programs";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: `${program.name} — Music Gurukula`,
    description: program.shortDescription,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <>
      <ProgramHeader />
      <main className="flex-1">
        <ProgramHero program={program} />
        <ProgramDetails program={program} />
        <OtherPaths programs={getOtherPrograms(program.slug)} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
