export const msldPillars = [
  "PII capture inspection",
  "Custom dictionary mapping",
  "Ecommerce dictionary check",
  "GA4 vs CRM verification",
  "Spend impact calculation"
];

export const msldStatusCycle = [
  "Connecting marketing APIs...",
  "Querying campaign parameter metadata...",
  "Matching raw click records with GA4 sessions...",
  "Computing conversion coverage maps..."
];

export const msldV2Data = {
  // SUMMARY TAB
  summary: {
    banner: "2 active anomalies — purchase events -84% on Dec 18 (Google Ads) · UTM coverage -58% on Meta paid social (Dec 14)",
    kpis: [
      { id: "score", title: "OVERALL SCORE", val: "7.5", unit: "/10", subtitle: "Low attention needed", tag: "warning" },
      { id: "revenue", title: "REVENUE AT RISK", val: "₹310K", unit: "", subtitle: "Consent + tag gaps", badge: "NEW", tag: "critical" },
      { id: "roas", title: "TRUE VS REPORTED ROAS", val: "6.7x vs 2.8x", unit: "", subtitle: "GA4 underreporting -58%", badge: "NEW", tag: "critical" },
      { id: "purchases", title: "PURCHASES IN GA4", val: "26 / 58", unit: "", subtitle: "310.7K revenue invisible", tag: "info" }
    ],
    moduleScores: [
      { name: "P0 · PII capture", score: 4.5, max: 10, color: "amber" },
      { name: "P0 · Custom dict", score: 7.7, max: 10, color: "blue" },
      { name: "P1 · Ecomm dict", score: 7.9, max: 10, color: "blue" },
      { name: "P2 · GA4 vs CRM", score: 9.9, max: 10, color: "green" },
      { name: "Spend impact", score: 4.2, max: 10, color: "amber", badge: "NEW" }
    ],
    anomalies: [
      { text: "purchase events -84% · Dec 18 · Google Ads", status: "Critical", color: "red" },
      { text: "UTM coverage -58% · Dec 14 · Meta paid", status: "Warning", color: "amber" },
      { text: "visa_fees param 100% null · all paid channels", status: "Info", color: "blue" }
    ],
    channelQuality: [
      { channel: "Google Ads", utm: "94%", conv: "72%", status: "REVIEW", badgeClass: "review" },
      { channel: "Meta paid", utm: "34%", conv: "44%", status: "CRITICAL", badgeClass: "critical" },
      { channel: "Google UAC", utm: "81%", conv: "66%", status: "REVIEW", badgeClass: "review" }
    ]
  },

  // ECOMMERCE DATA TAB
  ecommerce: {
    kpis: [
      { id: "score", title: "SCORE", val: "7.9", unit: "/10", subtitle: "2 events with wrong data" },
      { id: "wrong_data", title: "TOTAL % WRONG DATA", val: "23.11%", unit: "", subtitle: "4 wrong parameters" },
      { id: "paid_sessions", title: "WRONG DATA — PAID SESSIONS", val: "18.4%", unit: "", subtitle: "select_item worst offender", badge: "NEW" }
    ],
    events: [
      { name: "view_item", score: "10", wrongCount: "0", eventCount: "10,030", pctWrong: "0%", inPaid: "—", scoreClass: "badge-green" },
      { name: "add_to_cart", score: "9.98", wrongCount: "0", eventCount: "—", pctWrong: "~0%", inPaid: "—", scoreClass: "badge-green" },
      { name: "begin_checkout", score: "10", wrongCount: "0", eventCount: "—", pctWrong: "0%", inPaid: "—", scoreClass: "badge-green" },
      { name: "purchase", score: "10", wrongCount: "0", eventCount: "—", pctWrong: "0%", inPaid: "—", scoreClass: "badge-green" },
      { name: "select_item · visa_fees", score: "5.62", wrongCount: "16,221", eventCount: "16,221", pctWrong: "100%", inPaid: "100%", scoreClass: "badge-amber", alert: true }
    ],
    spendImpact: {
      title: "SPEND IMPACT — SELECT_ITEM ERROR",
      badge: "NEW",
      boxes: [
        { title: "AFFECTED PAID SESSIONS", val: "16,221", subtitle: "select_item mis-fires" },
        { title: "SMART BID SIGNAL LOST", val: "100%", subtitle: "visa_fees always null" },
        { title: "ROAS UNDERREPORT EST.", val: "-18%", subtitle: "Google Ads campaigns" }
      ]
    }
  },

  // CUSTOM EVENTS TAB
  customEvents: {
    kpis: [
      { id: "score", title: "SCORE", val: "7.7", unit: "/10", subtitle: "17 events wrong", tag: "warning" },
      { id: "wrong_data", title: "TOTAL % WRONG DATA", val: "20.76%", unit: "", subtitle: "18 wrong parameters", tag: "critical" },
      { id: "paid_sessions", title: "WRONG DATA — PAID ONLY", val: "22.4%", unit: "", subtitle: "select_item dominant", badge: "NEW", tag: "critical" }
    ],
    events: [
      { name: "view_item", score: "7.54", wrongCount: "13,486", eventCount: "78,543", pctWrong: "17.2%", inPaid: "17.2%", scoreClass: "badge-blue" },
      { name: "search_visa", score: "8.19", wrongCount: "6,605", eventCount: "36,462", pctWrong: "18.1%", inPaid: "18.1%", scoreClass: "badge-blue" },
      { name: "login", score: "9.2", wrongCount: "441", eventCount: "5,485", pctWrong: "8.0%", inPaid: "8.0%", scoreClass: "badge-green" },
      { name: "add_to_cart", score: "8.65", wrongCount: "876", eventCount: "6,480", pctWrong: "13.5%", inPaid: "16.2%", scoreClass: "badge-blue" },
      { name: "begin_checkout", score: "8.76", wrongCount: "200", eventCount: "1,611", pctWrong: "12.4%", inPaid: "14.8%", scoreClass: "badge-blue" },
      { name: "select_item", score: "—", wrongCount: "27,895", eventCount: "124,362", pctWrong: "22.4%", inPaid: "22.4%", scoreClass: "", alert: true },
      { name: "form_submit", score: "—", wrongCount: "9,547", eventCount: "13,865", pctWrong: "68.9%", inPaid: "71.2%", scoreClass: "", alert: true },
      { name: "purchase", score: "9.31", wrongCount: "36", eventCount: "522", pctWrong: "6.9%", inPaid: "6.9%", scoreClass: "badge-green" }
    ]
  },

  // GA4 VS CRM TAB
  ga4VsCrm: {
    kpis: [
      { id: "purchases", title: "PURCHASES IN GA4", val: "26/58", unit: "", subtitle: "44.8% capture rate", tag: "warning" },
      { id: "blind_spot", title: "REVENUE BLIND SPOT", val: "₹310.7K", unit: "", subtitle: "Consent declined", tag: "critical" },
      { id: "google_gap", title: "GOOGLE ADS GAP", val: "₹180K", unit: "", subtitle: "58% of blind spot", badge: "NEW", tag: "critical" },
      { id: "meta_gap", title: "META PAID GAP", val: "₹90K", unit: "", subtitle: "29% of blind spot", badge: "NEW", tag: "critical" }
    ],
    discrepancies: [
      { id: "113050959658", ga4: "MISSING", value: "₹48,198", channel: "Google Ads", cause: "Consent declined", statusClass: "badge-red" },
      { id: "113156860050", ga4: "MISSING", value: "₹31,430", channel: "Meta paid", cause: "Tag mis-fire", statusClass: "badge-red" },
      { id: "113058390288", ga4: "CAPTURED", value: "₹21,606", channel: "Google Ads", cause: "—", statusClass: "badge-green" },
      { id: "113465608828", ga4: "MISSING", value: "₹18,030", channel: "Google Ads", cause: "Consent declined", statusClass: "badge-red" },
      { id: "113058743979", ga4: "CAPTURED", value: "₹16,205", channel: "Direct", cause: "—", statusClass: "badge-green" },
      { id: "113394106908", ga4: "MISSING", value: "₹13,472", channel: "Meta paid", cause: "Tag mis-fire", statusClass: "badge-red" }
    ],
    grandTotal: {
      id: "Grand total",
      ga4: "26 / 58",
      value: "₹540,588",
      channel: "—",
      cause: "—"
    }
  },

  // PII COMPLIANCE TAB
  piiCompliance: {
    kpis: [
      { id: "pages", title: "UNIQUE PAGES WITH PII", val: "3K", unit: "", subtitle: "URLs containing PII", tag: "warning" },
      { id: "records", title: "TOTAL PII RECORDS", val: "12,974", unit: "", subtitle: "Grand total", tag: "critical" },
      { id: "common", title: "MOST COMMON TYPE", val: "Sensitive", unit: "", subtitle: "~12K occurrences", tag: "warning" }
    ],
    types: [
      { name: "Sensitive param", count: "~12K", pct: 90, barClass: "bg-red" },
      { name: "Name param", count: "~2.4K", pct: 18, barClass: "bg-blue" },
      { name: "Aadhaar", count: "~300", pct: 4, barClass: "bg-amber" },
      { name: "Email", count: "~150", pct: 2, barClass: "bg-amber" },
      { name: "Address / Phone", count: "~80", pct: 1, barClass: "bg-amber" }
    ],
    topPages: [
      { url: "/blog/transportation-guide/...singapore...", piiType: "ADDRESS", count: 31, badgeClass: "badge-blue" },
      { url: "/blog/show_image_NpAdvCaLPG.php...", piiType: "NAME PARAM", count: 29, badgeClass: "badge-blue" },
      { url: "/ind/en/visa/payment-confirmation...", piiType: "SENSITIVE", count: 19, badgeClass: "badge-red" },
      { url: "/wego/?wego_click_id=0A8C7F8A...", piiType: "AADHAAR", count: 15, badgeClass: "badge-amber" },
      { url: "/blog/beaches/portugal?name=xsstest", piiType: "NAME PARAM", count: 14, badgeClass: "badge-blue" }
    ]
  },

  // TAG DIRECTORY TAB
  tagDirectory: {
    kpis: [
      { id: "tags", title: "GA4 TOTAL TAGS", val: "43", unit: "", subtitle: "45 pixel tags", tag: "info" },
      { id: "params", title: "EVENT PARAMS", val: "34", unit: "", subtitle: "Across all tags", tag: "info" },
      { id: "triggers", title: "UNUSED TRIGGERS", val: "38", unit: "", subtitle: "Action required", tag: "warning", alert: true },
      { id: "templates", title: "UNUSED TAGS / TEMPLATES", val: "0/0", unit: "", subtitle: "All clean", tag: "info" }
    ],
    subTabs: [
      { id: "ga4", label: "GA4 tag info" },
      { id: "pixel", label: "Pixel info" },
      { id: "unused", label: "Unused content" },
      { id: "triggers", label: "38 TRIGGERS", badge: true }
    ],
    tags: [
      { name: "OV_BRA_TagGoogleAds", type: "GOOGTAG", typeClass: "badge-blue", event: "—", triggerType: "PAGEVIEW", trigger: "OV_BRA_TrgOnlyPagesbrasil", paused: "NO", lastUpdated: "Jul 9, 2025" },
      { name: "LS_view_more", type: "GAAWE", typeClass: "badge-blue", event: "view_more", triggerType: "CUSTOM_E", trigger: "LS_view_more", paused: "NO", lastUpdated: "Dec 20, 2024" },
      { name: "LS_talk_to_visa_expert", type: "GAAWE", typeClass: "badge-blue", event: "talk_to_visa_e...", triggerType: "HISTORY_C", trigger: "LS_talk_to_expert_trigger", paused: "NO", lastUpdated: "Dec 20, 2024" },
      { name: "LS_send_otp", type: "GAAWE", typeClass: "badge-blue", event: "send_otp", triggerType: "CLICK", trigger: "LS_send_otp_trigger", paused: "NO", lastUpdated: "Oct 29, 2025" },
      { name: "LS_navigation_interaction", type: "GAAWE", typeClass: "badge-blue", event: "navigation_inte...", triggerType: "CUSTOM_E", trigger: "LS_navigation_interaction_trig...", paused: "NO", lastUpdated: "Jul 4, 2025" },
      { name: "LS_get_my_visa", type: "GAAWE", typeClass: "badge-blue", event: "get_my_visa", triggerType: "CUSTOM_E", trigger: "LS_get_my_visa_trigger", paused: "NO", lastUpdated: "Dec 20, 2024" }
    ],
    footer: "Showing 6 of 45 · No unused tags — delete not applicable"
  },

  // SPEND IMPACT TAB
  spendImpact: {
    kpis: [
      { id: "reported", title: "REPORTED ROAS", val: "2.8x", unit: "", subtitle: "What GA4 shows", tag: "info" },
      { id: "true_roas", title: "TRUE ROAS (EST.)", val: "6.7x", unit: "", subtitle: "CRM-backed estimate", tag: "info" },
      { id: "underreport", title: "ROAS UNDERREPORT", val: "-58%", unit: "", subtitle: "Smart bid underfed", tag: "critical" },
      { id: "loss", title: "BIDDING SIGNAL LOSS", val: "38%", unit: "", subtitle: "Events w/ null params", tag: "critical" }
    ],
    campaigns: [
      { name: "Visa — India EN", spend: "₹82K", reportedRoas: "2.1x", trueRoas: "5.8x", underreport: "-64%", score: "4.2", scoreClass: "badge-red" },
      { name: "Visa — UAE EN", spend: "₹61K", reportedRoas: "3.2x", trueRoas: "5.1x", underreport: "-37%", score: "6.8", scoreClass: "badge-amber" },
      { name: "Visa — Wego", spend: "₹44K", reportedRoas: "3.5x", trueRoas: "4.4x", underreport: "-20%", score: "8.1", scoreClass: "badge-blue" },
      { name: "Brand — Global", spend: "₹38K", reportedRoas: "5.6x", trueRoas: "5.9x", underreport: "-5%", score: "9.2", scoreClass: "badge-green" }
    ],
    channels: [
      { name: "Google Ads", pct: 72, color: "var(--blue)" },
      { name: "Meta paid", pct: 38, color: "var(--red)" },
      { name: "Google UAC", pct: 59, color: "var(--blue)" }
    ],
    trend: {
      actual: "₹310K confirmed",
      projected: "₹480K projected",
      bars: [
        { label: "1", val: 50, type: "actual" },
        { label: "2", val: 55, type: "actual" },
        { label: "3", val: 53, type: "actual" },
        { label: "4", val: 58, type: "actual" },
        { label: "5", val: 60, type: "actual" },
        { label: "6", val: 62, type: "actual" },
        { label: "7", val: 62, type: "forecast" },
        { label: "8", val: 64, type: "forecast" },
        { label: "9", val: 66, type: "forecast" },
        { label: "10", val: 70, type: "forecast" }
      ]
    }
  }
};
