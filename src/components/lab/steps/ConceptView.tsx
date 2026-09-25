import Image from "next/image";
import { Lightbulb } from "lucide-react";
import type { ConceptStep } from "@/lib/curriculum/types";
import RichText from "../RichText";
import PythonCode from "../PythonCode";

export default function ConceptView({ step }: { step: ConceptStep }) {
  const hasSide = !!(step.code || step.image);
  return (
    <div
      className={`mx-auto grid w-full gap-10 px-6 py-12 md:py-16 ${
        hasSide ? "max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center" : "max-w-2xl"
      }`}
    >
      <div>
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {step.title}
        </h1>
        <div className="mt-6 space-y-4">
          {step.body.map((p) => (
            <p key={p} className="text-[16px] leading-relaxed text-ink/70">
              <RichText text={p} />
            </p>
          ))}
        </div>
        {step.keyIdea && (
          <div className="mt-8 flex gap-3 rounded-2xl border border-lime-deep/15 bg-lime-soft p-5">
            <Lightbulb size={18} className="mt-0.5 shrink-0 text-lime-deep" />
            <p className="text-sm font-medium leading-relaxed text-ink/85">
              <RichText text={step.keyIdea} />
            </p>
          </div>
        )}
      </div>

      {hasSide && (
        <div className="space-y-4">
          {step.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(min-width: 768px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          )}
          {step.code && <PythonCode code={step.code} lineNumbers />}
        </div>
      )}
    </div>
  );
}
