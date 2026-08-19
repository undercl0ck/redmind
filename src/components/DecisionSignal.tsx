export function DecisionSignal() {
  return (
    <svg
      className="decision-signal"
      viewBox="0 0 618 382"
      width="618"
      height="382"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className="decision-signal__ledger" d="M44 64H574M44 191H574M44 318H574" />
      <path className="decision-signal__axis" d="M101 42V340M309 42V340M517 42V340" />
      <path className="decision-signal__trace decision-signal__trace--quiet" d="M74 286C145 286 151 235 213 235C278 235 278 151 346 151C411 151 421 94 544 94" />
      <path className="decision-signal__trace decision-signal__trace--signal" d="M74 286C145 286 151 235 213 235C278 235 278 151 346 151C411 151 421 94 544 94" />
      <circle className="decision-signal__node decision-signal__node--one" cx="74" cy="286" r="11" />
      <circle className="decision-signal__node decision-signal__node--two" cx="213" cy="235" r="11" />
      <circle className="decision-signal__node decision-signal__node--three" cx="346" cy="151" r="11" />
      <circle className="decision-signal__node decision-signal__node--four" cx="544" cy="94" r="15" />
      <path className="decision-signal__reticle" d="M544 61V45M544 143V127M511 94H495M593 94H577" />
    </svg>
  );
}
