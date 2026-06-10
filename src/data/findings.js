export const findingsByAudit = {
  complete: [
    {
      title: "Sales Event Currency Gaps",
      severity: "amber",
      text: "Some sales events are missing currency, which can misreport revenue totals.",
      observation: "Some sales events are missing currency, which can misreport revenue totals.",
      fix: "Add a default currency mapping table so that every purchase, refund, and subscription event carries a consistent ISO 4217 currency code.",
      outcome: "Eliminates up to 15% revenue reporting variance across multi-currency markets."
    },
    {
      title: "Identity Continuity Issues",
      severity: "red",
      text: "Many logged-in sessions do not carry user ID, so customer journeys look broken.",
      observation: "Many logged-in sessions do not carry user ID, so customer journeys look broken.",
      fix: "Update your tag management setup to ensure that every logged-in session includes the same canonical user_id field.",
      outcome: "Restores full cross-device journey visibility for 40%+ of your user base."
    },
    {
      title: "Attribution Taxonomy Inconsistency",
      severity: "blue",
      text: "Web and app attribution fields use different names, making channel reports inconsistent.",
      observation: "Web and app attribution fields use different names, making channel reports inconsistent.",
      fix: "Create a shared naming standard for source, medium, and campaign columns across web and app data exports.",
      outcome: "Makes channel performance reports accurate and consistent across platforms."
    },
  ],
  ml: [
    {
      title: "Entity Identifier Duplication",
      severity: "red",
      text: "Customer IDs are generated differently across CRM, web, and app — causing entity duplication in training sets.",
      observation: "Customer IDs are generated differently across CRM, web, and app — causing entity duplication in training sets.",
      fix: "Implement a universal entity resolution layer to unify customer IDs across all channels.",
      outcome: "Gives you cleaner customer counts and more reliable customer reports."
    },
    {
      title: "Conversion Label Latency",
      severity: "amber",
      text: "Conversion labels arrive 24–48 hours late, delaying model feedback loops and reducing prediction accuracy.",
      observation: "Conversion labels arrive 24–48 hours late, delaying model feedback loops and reducing prediction accuracy.",
      fix: "Set up real-time label freshness monitoring and latency alerts.",
      outcome: "Keeps feedback loops tight and maintains high prediction accuracy."
    },
    {
      title: "Weekend Feature Gaps",
      severity: "amber",
      text: "Weekend data imports frequently leave key feature columns empty, creating bias in weekend predictions.",
      observation: "Weekend data imports frequently leave key feature columns empty, creating bias in weekend predictions.",
      fix: "Implement validation rules and fallback values for critical weekend feature data.",
      outcome: "Prevents model performance degradation and reporting gaps over weekends."
    },
    {
      title: "Feature Distribution Shift",
      severity: "blue",
      text: "Feature distributions shift significantly between weekdays and weekends without normalization.",
      observation: "Feature distributions shift significantly between weekdays and weekends without normalization.",
      fix: "Apply daily normalization scaling and seasonality adjustments to feature pipelines.",
      outcome: "Stabilizes model predictions and enables fairer day-over-day performance comparisons."
    },
  ],
  tracking: [
    {
      title: "Consistent Event Naming Standard",
      severity: "green",
      text: "Core event names follow a consistent snake_case convention — strong foundation for governance.",
      observation: "Core event names follow a consistent snake_case convention — strong foundation for governance.",
      fix: "Maintain the current naming conventions and document them in your event registry.",
      outcome: "Ensures long-term schema scalability and easier analytics onboarding."
    },
    {
      title: "High-Cardinality Dimension Noise",
      severity: "amber",
      text: "Several custom dimensions contain 500+ unique values, creating high-cardinality noise in reports.",
      observation: "Several custom dimensions contain 500+ unique values, creating high-cardinality noise in reports.",
      fix: "Set cardinality limits on custom dimensions and bucket long-tail values into 'other'.",
      outcome: "Reduces report load times by up to 40% and simplifies analytics dashboards."
    },
    {
      title: "Legacy Tag Redundancy",
      severity: "blue",
      text: "Some legacy event names (v1 format) still fire alongside new names — creating duplicate counts.",
      observation: "Some legacy event names (v1 format) still fire alongside new names — creating duplicate counts.",
      fix: "Deprecate legacy tags and implement redirects or tag cleanup in Google Tag Manager.",
      outcome: "Eliminates double-counting errors and reduces overall event volume costs by ~15%."
    },
    {
      title: "Session Configuration Complete",
      severity: "green",
      text: "Session and pageview setup is complete, with correct timeout and engagement settings.",
      observation: "Session and pageview setup is complete, with correct timeout and engagement settings.",
      fix: "No immediate action required; schedule quarterly reviews of session timeout parameters.",
      outcome: "Ensures reliable session duration metrics and accurate bounce rate calculations."
    },
  ],
  governance: [
    {
      title: "GDPR Consent Parameter Gaps",
      severity: "amber",
      text: "Consent parameters are missing on 12% of custom measurement hits, violating GDPR consent guidelines.",
      observation: "Consent parameters are missing on 12% of custom measurement hits, violating GDPR consent guidelines.",
      fix: "Implement explicit consent gating and tag configuration in GTM before firing hits.",
      outcome: "Mitigates legal and compliance risks under GDPR/CCPA regulations."
    },
    {
      title: "PII Query Parameter Leaks",
      severity: "red",
      text: "Personally Identifiable Information (PII) detected in plain-text query parameters for email and signup events.",
      observation: "Personally Identifiable Information (PII) detected in plain-text query parameters for email and signup events.",
      fix: "Implement a URL sanitization script or GTM custom template to redact PII before storage.",
      outcome: "Guarantees zero plain-text PII storage, ensuring user privacy and compliance."
    },
    {
      title: "Infinite Data Retention Gaps",
      severity: "blue",
      text: "Data retention settings default to 'infinite' instead of the recommended 14-month compliance cycle.",
      observation: "Data retention settings default to 'infinite' instead of the recommended 14-month compliance cycle.",
      fix: "Adjust BigQuery and GA4 retention rules to automatically expire older user-level data.",
      outcome: "Aligns storage practices with data minimization principles and reduces storage costs."
    },
  ],
  marketing: [
    {
      title: "UTM Parameter Gaps",
      severity: "amber",
      text: "8.4% of incoming ad-campaign traffic has missing or malformed UTM parameters.",
      observation: "8.4% of campaign traffic has missing or malformed UTM parameters.",
      fix: "Implement centralized UTM governance, automated link builders, and validation rules.",
      outcome: "Improves campaign attribution accuracy and marketing channel reporting reliability."
    },
    {
      title: "Duplicate Conversion Triggers",
      severity: "red",
      text: "Duplicate conversion event triggers fired on confirmation page, inflating Google Ads conversions.",
      observation: "Duplicate conversion event triggers fired on confirmation page, inflating Google Ads conversions.",
      fix: "De-duplicate conversion triggers using transaction ID hashing or fire-once cookie flags.",
      outcome: "Restores CPA metrics accuracy, preventing ad spend attribution bloat."
    },
    {
      title: "Mobile App UTM Mismatch",
      severity: "blue",
      text: "Mobile app campaigns use a different UTM mapping than web campaigns, creating attribution gaps.",
      observation: "Mobile app campaigns use a different UTM mapping than web campaigns, creating attribution gaps.",
      fix: "Align mobile app SDK parameters with the web UTM taxonomy.",
      outcome: "Creates unified ROI reports across web and mobile platforms."
    },
  ],
};

export const actionsByAudit = {
  complete: [
    {
      title: "Standardize currency on all revenue events",
      description: "Add a default currency mapping table so that every purchase, refund, and subscription event carries a consistent ISO 4217 currency code. This prevents revenue miscalculations when aggregating across regions.",
      impact: "Eliminates up to 15% revenue reporting variance across multi-currency markets",
      priority: "high",
    },
    {
      title: "Enforce user ID on authenticated sessions",
      description: "Update your tag management setup to ensure that every logged-in session includes the same canonical user_id field. This unifies customer journeys across devices and sessions.",
      impact: "Restores full cross-device journey visibility for 40%+ of your user base",
      priority: "high",
    },
    {
      title: "Unify attribution column naming",
      description: "Create a shared naming standard for source, medium, and campaign columns across web and app data exports. Map existing variant names to the canonical schema.",
      impact: "Makes channel performance reports accurate and consistent across platforms",
      priority: "medium",
    },
  ],
  ml: [
    {
      title: "Implement a universal entity resolution layer",
      description: "Use one shared customer ID across your website, app, and CRM so the same person is not counted multiple times.",
      impact: "Gives you cleaner customer counts and more reliable customer reports",
      priority: "high",
    },
    {
      title: "Set up real-time label freshness monitoring",
      description: "Set alerts when conversion data is delayed, so your team can fix it quickly before reports become outdated.",
      impact: "Keeps dashboards current and helps teams make decisions faster",
      priority: "high",
    },
    {
      title: "Backfill and validate weekend feature data",
      description: "Add a weekend data check to make sure key fields are filled and accurate before Monday reporting.",
      impact: "Prevents misleading weekend trends and unexpected reporting gaps",
      priority: "medium",
    },
    {
      title: "Normalize feature distributions across time periods",
      description: "Review weekday vs weekend patterns and adjust your reporting rules so the same metric means the same thing every day.",
      impact: "Makes comparisons more stable across days and weeks",
      priority: "low",
    },
  ],
  tracking: [
    {
      title: "Set cardinality limits on high-variance dimensions",
      description: "Configure your analytics tool to group values exceeding a threshold (e.g., 100 unique values) into an 'other' bucket. This keeps reports clean and query performance fast.",
      impact: "Reduces report load times by up to 40% and eliminates noisy long-tail segments",
      priority: "high",
    },
    {
      title: "Sunset legacy v1 event names with a migration plan",
      description: "Create a versioned event naming guide. Set up dual-fire detection alerts, then gradually deprecate old event names over a 30-day window with team communication.",
      impact: "Eliminates double-counting and reduces event volume by ~15%",
      priority: "medium",
    },
    {
      title: "Create a weekly quality snapshot dashboard",
      description: "Build an automated weekly report that checks conversion event consistency, parameter fill rates, and session stitching accuracy. Flag any metric that drops below baseline.",
      impact: "Catches tracking regressions within 7 days instead of discovering them months later",
      priority: "medium",
    },
  ],
  governance: [
    {
      title: "Sanitize PII in URL parameters",
      description: "Implement a Google Tag Manager redact rule or cloud proxy layer to strip email, name, and phone parameters from page URLs before they are stored in BigQuery.",
      impact: "Guarantees zero plain-text PII storage, achieving strict CCPA/GDPR compliance",
      priority: "high",
    },
    {
      title: "Implement explicit consent gating",
      description: "Configure your tag manager consent mode listeners to ensure no analytics hits fire before user consent is explicitly recorded.",
      impact: "Eliminates unauthorized data collection, mitigating audit legal risks",
      priority: "high",
    },
    {
      title: "Configure data retention limits",
      description: "Adjust raw event data retention in your analytics interface from infinite to the standard 14-month compliance cycle.",
      impact: "Aligns storage policies with data minimization principles",
      priority: "medium",
    },
  ],
  marketing: [
    {
      title: "Fix duplicate conversion event triggers",
      description: "De-duplicate conversion triggers on confirmation pages using transaction ID hashing or local storage fire-once flags.",
      impact: "Restores CPA metrics accuracy, preventing ad spend attribution bloat",
      priority: "high",
    },
    {
      title: "Enforce unified UTM tags structure",
      description: "Establish a strict lower-case UTM policy and configure URL normalizers to merge variant channel names (e.g. PPC, ppc, GoogleAds).",
      impact: "Reduces 'Direct / None' misattribution in marketing report suites",
      priority: "high",
    },
    {
      title: "Align mobile app UTM parameter mapping",
      description: "Ensure mobile SDK campaign capture maps to the same schema column fields as web tracking packages.",
      impact: "Creates unified ROI reports across web and app platforms",
      priority: "medium",
    },
  ],
};
