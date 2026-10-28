import { DecodeText } from "@/components/ui/DecodeText";

type SectionHeadingProps = {
  code: string;
  kicker: string;
  title: string;
  description?: string;
  titleId?: string;
  className?: string;
};

export function SectionHeading({
  code,
  kicker,
  title,
  description,
  titleId,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="section-code">
        <span className="bracket">[</span>
        {code}
        <span className="text-dim">//</span>
        {kicker}
        <span className="bracket">]</span>
        <span className="tick" aria-hidden="true" />
      </p>
      <h2 id={titleId} className="section-heading mt-5">
        <DecodeText text={title} caret />
      </h2>
      {description ? (
        <p className="section-sub mt-6" data-reveal>
          {description}
        </p>
      ) : null}
    </div>
  );
}
