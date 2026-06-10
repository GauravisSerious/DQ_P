import { findingsByAudit, actionsByAudit } from "../data/findings";
import { scoreByAudit } from "../data/scores";
import { pillarsByAudit, statusCycle } from "../data/pillars";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CUSTOM_MAP = {
  "Data Quality": {
    pillar: "Data quality validation",
    score: 79,
    finding: {
      title: "Critical Customer Attribute Gaps",
      severity: "amber",
      text: "Null values found in 15% of critical customer attributes.",
      observation: "Null values found in 15% of critical customer attributes.",
      fix: "Enforce constraint check rules on customer schema to prevent NULL parameters.",
      outcome: "Improves data pipeline coverage and segmentation accuracy."
    },
    action: {
      title: "Cleanse critical customer attributes",
      description: "Enforce constraint check rules on customer schema to prevent NULL parameters.",
      impact: "Improves data pipeline coverage and segmentation accuracy",
      priority: "high",
    }
  },
  "Tracking Integrity": {
    pillar: "Tracking integrity",
    score: 85,
    finding: {
      title: "Missing Transaction Timestamps",
      severity: "red",
      text: "10% of transaction events lack purchase timestamps.",
      observation: "10% of transaction events lack purchase timestamps.",
      fix: "Inject server-side transaction timestamps on client purchase triggers.",
      outcome: "Fixes sequence parsing inconsistencies in funnel analytics."
    },
    action: {
      title: "Add transaction event timestamps",
      description: "Inject server-side transaction timestamps on client purchase triggers.",
      impact: "Fixes sequence parsing inconsistencies in funnel analytics",
      priority: "high",
    }
  },
  "Attribution": {
    pillar: "Attribution quality",
    score: 72,
    finding: {
      title: "App Install Attribution Gaps",
      severity: "blue",
      text: "Some attribution models do not account for app installs.",
      observation: "Some attribution models do not account for app installs.",
      fix: "Map organic and paid install hooks to the centralized attribution engine.",
      outcome: "Restores app-install ROI visibility."
    },
    action: {
      title: "Align mobile install attribution modeling",
      description: "Map organic and paid install hooks to the centralized attribution engine.",
      impact: "Restores app-install ROI visibility",
      priority: "medium",
    }
  },
  "AI Readiness": {
    pillar: "AI & ML data readiness",
    score: 68,
    finding: {
      title: "Feature Scaling Imbalances",
      severity: "amber",
      text: "Input features lack normalized scaling values.",
      observation: "Input features lack normalized scaling values.",
      fix: "Implement min-max scaling preprocessing steps inside features pipelines.",
      outcome: "Improves ML model training convergence rates by 30%."
    },
    action: {
      title: "Standardize scale scaling preprocessing",
      description: "Implement min-max scaling preprocessing steps inside features pipelines.",
      impact: "Improves ML model training convergence rates by 30%",
      priority: "medium",
    }
  },
  "Compliance": {
    pillar: "Compliance auditing",
    score: 74,
    finding: {
      title: "Plain-text PII Gaps",
      severity: "red",
      text: "Plain-text user emails leaked into custom link clicks.",
      observation: "Plain-text user emails leaked into custom link clicks.",
      fix: "Configure automated triggers to hash emails and names from URL logs.",
      outcome: "Ensures compliance with basic data privacy legislation."
    },
    action: {
      title: "Redact query params PII links",
      description: "Configure automated triggers to hash emails and names from URL logs.",
      impact: "Ensures compliance with basic data privacy legislation",
      priority: "high",
    }
  },
  "Governance": {
    pillar: "Data governance",
    score: 76,
    finding: {
      title: "Missing Schema Metadata",
      severity: "blue",
      text: "Metadata descriptions are missing on 30% of tables.",
      observation: "Metadata descriptions are missing on 30% of tables.",
      fix: "Write descriptive schemas documentation using a structured data dictionary.",
      outcome: "Enhances team discoverability and onboarding efficiency."
    },
    action: {
      title: "Establish standard tables metadata registry",
      description: "Write descriptive schemas documentation using a structured data dictionary.",
      impact: "Enhances team discoverability and onboarding efficiency",
      priority: "low",
    }
  },
  "Marketing Measurement": {
    pillar: "Marketing measurement validation",
    score: 82,
    finding: {
      title: "Google Ads Auto-Tagging Gaps",
      severity: "amber",
      text: "Google Ads gclid parameter missing from 5% of click records.",
      observation: "Google Ads gclid parameter missing from 5% of click records.",
      fix: "Verify auto-tagging integration is active and matches page query parameter formats.",
      outcome: "Restores click-to-lead matching precision."
    },
    action: {
      title: "Sync Google Ads auto-tagging keys",
      description: "Verify auto-tagging integration is active and matches page query parameter formats.",
      impact: "Restores click-to-lead matching precision",
      priority: "high",
    }
  }
};

export const auditService = {
  async runAudit({ audit, customCategories = [], onProgress }) {
    let pillars = [];
    let scores = null;
    let findings = [];
    let recommendations = [];

    if (audit === "custom") {
      const categories = customCategories.length > 0 ? customCategories : ["Data Quality"];
      const breakdown = [];
      let totalScore = 0;

      categories.forEach((cat) => {
        const data = CUSTOM_MAP[cat];
        if (data) {
          pillars.push(data.pillar);
          breakdown.push({ pillar: data.pillar, score: data.score });
          totalScore += data.score;
          findings.push(data.finding);
          recommendations.push(data.action);
        }
      });

      const avgScore = Math.round(totalScore / categories.length) || 0;
      let verdict = "Your custom scope foundation is good, with minor issues to address.";
      let tag = "Good";
      let blurb = "Your customized audit is positive. Implementing recommended fixes will improve compliance and accuracy.";

      if (avgScore >= 85) {
        verdict = "Your custom scope foundation is strong and reliable.";
        tag = "Strong";
        blurb = "The customized checks show high readiness. Continue maintaining standard checks.";
      } else if (avgScore < 70) {
        verdict = "Your custom scope foundation needs attention.";
        tag = "Needs Work";
        blurb = "Several critical actions were flagged. Address high-priority fixes before scaling.";
      }

      scores = {
        score: avgScore,
        verdict,
        tag,
        blurb,
        breakdown,
      };
    } else {
      pillars = pillarsByAudit[audit] || pillarsByAudit.complete;
      scores = scoreByAudit[audit] || scoreByAudit.complete;
      findings = findingsByAudit[audit] || findingsByAudit.complete;
      recommendations = actionsByAudit[audit] || actionsByAudit.complete;
    }

    for (let i = 0; i <= pillars.length; i += 1) {
      onProgress({
        step: i,
        total: pillars.length,
        status: statusCycle[i % statusCycle.length],
      });
      await wait(900);
    }

    return {
      scores,
      findings,
      recommendations,
    };
  },
};
