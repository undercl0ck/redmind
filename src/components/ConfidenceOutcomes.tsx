type Outcome = {
  title: string;
  description: string;
};

type ConfidenceOutcomesProps = {
  confidence: {
    regionLabel: string;
    outcomes: Outcome[];
  };
};

export function ConfidenceOutcomes({ confidence }: ConfidenceOutcomesProps) {
  return (
    <section className="confidence" aria-label={confidence.regionLabel}>
      <div className="shell confidence__grid">
        {confidence.outcomes.map((outcome) => (
          <article className="confidence__outcome" key={outcome.title}>
            <h2>{outcome.title}</h2>
            <p>{outcome.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
