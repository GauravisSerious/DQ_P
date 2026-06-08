export const pillarsByAudit = {
  complete: ["Schema hygiene", "Identity coverage", "Tracking quality", "Session continuity", "Attribution readiness"],
  ml: ["Feature completeness", "Label quality", "Entity consistency", "Event freshness"],
  tracking: ["Event naming", "Parameter integrity", "Session stitching", "Conversion fidelity"],
  governance: ["Consent validation", "Retention policies", "Privacy controls", "Data classification"],
  marketing: ["UTM validation", "Attribution consistency", "Conversion tracking", "Platform parity"],
};

export const statusCycle = ["Validating metadata", "Inspecting event streams", "Computing readiness score", "Packaging recommendations"];
