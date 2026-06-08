export const scoreByAudit = {
  complete: {
    score: 78,
    verdict: "Your data foundation is strong, with a few important fixes needed",
    tag: "Good",
    blurb: "Your setup is mostly reliable. Fixing identity continuity and attribution consistency will improve decision confidence.",
    breakdown: [
      { pillar: "Schema hygiene", score: 84 },
      { pillar: "Identity coverage", score: 61 },
      { pillar: "Tracking quality", score: 81 },
      { pillar: "Session continuity", score: 79 },
      { pillar: "Attribution readiness", score: 72 },
    ],
  },
  ml: {
    score: 69,
    verdict: "You can use ML, but data consistency needs improvement first",
    tag: "Needs Work",
    blurb: "You have enough data volume. Improve feature quality and freshness to make model outputs trustworthy.",
    breakdown: [
      { pillar: "Feature completeness", score: 73 },
      { pillar: "Label quality", score: 66 },
      { pillar: "Entity consistency", score: 62 },
      { pillar: "Event freshness", score: 75 },
    ],
  },
  tracking: {
    score: 86,
    verdict: "Your tracking setup is reliable and ready to scale",
    tag: "Strong",
    blurb: "Your core implementation is clean. Next focus: governance rules and proactive quality monitoring.",
    breakdown: [
      { pillar: "Event naming", score: 90 },
      { pillar: "Parameter integrity", score: 84 },
      { pillar: "Session stitching", score: 82 },
      { pillar: "Conversion fidelity", score: 88 },
    ],
  },
  governance: {
    score: 71,
    verdict: "Data governance and privacy setup has gaps that require attention",
    tag: "Needs Work",
    blurb: "While some consent structures exist, inconsistent policy enforcement and unclassified fields pose compliance risks.",
    breakdown: [
      { pillar: "Consent validation", score: 68 },
      { pillar: "Retention policies", score: 75 },
      { pillar: "Privacy controls", score: 64 },
      { pillar: "Data classification", score: 77 },
    ],
  },
  marketing: {
    score: 83,
    verdict: "Your marketing measurement tags and attribution are mostly reliable",
    tag: "Good",
    blurb: "UTM tracking and attribution fields are in place, but conversion duplicate firing and platform inconsistencies are leaking attribution credit.",
    breakdown: [
      { pillar: "UTM validation", score: 88 },
      { pillar: "Attribution consistency", score: 80 },
      { pillar: "Conversion tracking", score: 79 },
      { pillar: "Platform parity", score: 85 },
    ],
  },
};
