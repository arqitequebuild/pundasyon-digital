(function () {
  "use strict";

  // 1. Sticky Header & Mobile Menu
  const menuButton = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");
  const siteHeader = document.querySelector("#site-header");
  const brandLink = document.querySelector(".brand");

  const closeMobileMenu = () => {
    if (!menuButton || !siteNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  };

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  if (brandLink) {
    brandLink.addEventListener("click", (event) => {
      event.preventDefault();
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash === "#top") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  }

  const syncHeaderScroll = () => {
    if (!siteHeader) return;
    const scrolled = window.scrollY > 40;
    siteHeader.classList.toggle("is-scrolled", scrolled);
    if (scrolled && siteNav && siteNav.classList.contains("is-open")) {
      closeMobileMenu();
    }
  };

  window.addEventListener("scroll", syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  // 2. Dynamic Copyright Year
  const yearEl = document.querySelector("#year");
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear > 2026 ? `2026–${currentYear}` : "2026";
  }

  // 3. FAQ Accordion
  const faqButtons = document.querySelectorAll(".faq-btn");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("is-open", !expanded);
    });
  });

  // 4. Case Study Modal
  const caseStudies = {
    resort: {
      kicker: "CASE 01 · COASTAL RESORT & DIRECT BOOKING FLAGSHIP",
      title: "Coastal Resort & Direct Booking Flagship",
      description: "Engineered to balance golden-hour visual storytelling with fast mobile performance and clear reservation pathways so travelers book directly rather than defaulting to OTAs.",
      specs: [
        { label: "Primary Goal", value: "Direct Villa Inquiries" },
        { label: "Key UX Pattern", value: "Suite Matrix + Sticky CTA" },
        { label: "Technical Focus", value: "Image Weight & LCP Speed" }
      ],
      notes: [
        "Structured above-the-fold framing to showcase architectural setting while keeping headline contrast high.",
        "Organized suite tiers, seasonal inclusions, and concierge inquiry prompts with zero clutter.",
        "Configured Open Graph and metadata tags so resort links look refined when shared by guests or travel planners."
      ],
      prefillNiche: "Resort / Destination Villa",
      prefillScope: "Direct Booking / Inquiry Funnel Redesign"
    },
    restaurant: {
      kicker: "CASE 02 · EDITORIAL RESTAURANT & TASTING ROOM",
      title: "Editorial Restaurant & Tasting Room Experience",
      description: "Designed for dining concepts where ambiance, tasting progression, and effortless table or private-room booking drive evening revenue.",
      specs: [
        { label: "Primary Goal", value: "Table & Private Dining" },
        { label: "Key UX Pattern", value: "Scannable Menu + Quick CTA" },
        { label: "Technical Focus", value: "Mobile Ergonomics & SEO" }
      ],
      notes: [
        "Built mobile-friendly menu and experience sections that guests can read comfortably in low-light or on the move.",
        "Separated everyday dining reservations from private event inquiries so staff receive cleaner leads.",
        "Aligned semantic headings and location details for local and destination food discovery."
      ],
      prefillNiche: "Restaurant / Hospitality",
      prefillScope: "Flagship Website & Conversion System"
    },
    founder: {
      kicker: "CASE 03 · FOUNDER & VENTURE PLATFORM",
      title: "Founder & Venture Platform",
      description: "Built for founders and operators scaling products, advisory, or multi-entity portfolios who need immediate credibility and clear partnership intake.",
      specs: [
        { label: "Primary Goal", value: "Authority & Deal Flow" },
        { label: "Key UX Pattern", value: "Thesis + Structured Brief" },
        { label: "Technical Focus", value: "Clarity & Load Velocity" }
      ],
      notes: [
        "Clarified core thesis and capabilities up front so investors, collaborators, and clients grasp value immediately.",
        "Replaced generic contact forms with a structured brief that captures scope, timeline, and context.",
        "Designed for rapid iteration and clean deployment on modern static/edge hosting."
      ],
      prefillNiche: "Founder / Venture Platform",
      prefillScope: "Founder / Product Launch Architecture"
    }
  };

  const modalBackdrop = document.getElementById("case-modal");
  const modalContent = document.getElementById("modal-case-content");
  const modalKicker = document.getElementById("modal-case-kicker");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  let lastFocusedTrigger = null;

  const openCaseModal = (caseKey, triggerEl) => {
    const data = caseStudies[caseKey];
    if (!data || !modalBackdrop || !modalContent) return;
    lastFocusedTrigger = triggerEl || null;
    if (modalKicker) modalKicker.textContent = data.kicker;
    const specsHtml = data.specs.map(s => `<div class="modal-spec-box"><span>${s.label}</span><strong>${s.value}</strong></div>`).join("");
    const notesHtml = data.notes.map(n => `<li>${n}</li>`).join("");
    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p style="font-size: 13.5px; line-height: 1.8; color: #5c5549;">${data.description}</p>
      <div class="modal-specs">${specsHtml}</div>
      <ul class="modal-notes-list">${notesHtml}</ul>
      <button class="button button-dark" type="button" id="modal-use-brief-btn"><span>Start Similar Brief</span><span class="arrow" aria-hidden="true">&#8594;</span></button>
    `;
    modalBackdrop.hidden = false;
    requestAnimationFrame(() => modalBackdrop.classList.add("is-open"));
    if (modalCloseBtn) modalCloseBtn.focus();
    const useBriefBtn = document.getElementById("modal-use-brief-btn");
    if (useBriefBtn) {
      useBriefBtn.addEventListener("click", () => {
        const nicheSelect = document.getElementById("target-niche");
        const scopeSelect = document.getElementById("project-scope");
        if (nicheSelect && data.prefillNiche) nicheSelect.value = data.prefillNiche;
        if (scopeSelect && data.prefillScope) scopeSelect.value = data.prefillScope;
        closeCaseModal();
        const briefSection = document.getElementById("project-brief");
        if (briefSection) briefSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const closeCaseModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.hidden = true;
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") lastFocusedTrigger.focus();
  };

  document.querySelectorAll(".case-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-case");
      openCaseModal(key, btn);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeCaseModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", (event) => { if (event.target === modalBackdrop) closeCaseModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("is-open")) closeCaseModal(); });

  // 5. Project Brief Generator
  const briefForm = document.getElementById("project-brief-form");
  const briefOutput = document.getElementById("brief-output");
  const briefSummaryText = document.getElementById("brief-summary-text");
  const briefStatusLabel = document.getElementById("brief-status-label");
  const copyBriefBtn = document.getElementById("copy-brief-btn");
  const mailtoLink = document.getElementById("direct-mailto-link");

  const buildBriefPayload = () => {
    const name = (document.getElementById("client-name")?.value || "").trim();
    const email = (document.getElementById("client-email")?.value || "").trim();
    const niche = (document.getElementById("target-niche")?.value || "").trim();
    const scope = (document.getElementById("project-scope")?.value || "").trim();
    const tier = (document.getElementById("budget-timeline")?.value || "").trim();
    const tz = (document.getElementById("client-timezone")?.value || "").trim() || "Not specified";
    const notes = (document.getElementById("project-notes")?.value || "").trim();
    const summary = [
      "PUNDASYON DIGITAL — PROJECT BRIEF",
      "----------------------------------------",
      `Client:     ${name} (${email})`,
      `Niche:      ${niche}`,
      `Scope:      ${scope}`,
      `Tier/Time:  ${tier}`,
      `Time Zone:  ${tz}`,
      `Studio TZ:  PHT (UTC+8)`,
      "",
      "Goals & Notes:",
      notes
    ].join("\n");
    return { name, email, niche, scope, tier, summary };
  };

  if (briefForm) {
    briefForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("client-name");
      const emailInput = document.getElementById("client-email");
      const nicheInput = document.getElementById("target-niche");
      const scopeInput = document.getElementById("project-scope");
      const tierInput = document.getElementById("budget-timeline");
      const notesInput = document.getElementById("project-notes");

      const missing = [nameInput, emailInput, nicheInput, scopeInput, tierInput, notesInput].filter(el => !el || !el.value.trim());
      if (missing.length > 0) {
        if (briefOutput && briefSummaryText && briefStatusLabel) {
          briefStatusLabel.textContent = "PLEASE COMPLETE ALL REQUIRED (*) FIELDS";
          briefSummaryText.textContent = "Fill out your name, email, niche, scope, timeline/tier, and project notes to generate your structured brief.";
          briefOutput.classList.add("is-visible");
        }
        missing[0].focus();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        if (briefOutput && briefSummaryText && briefStatusLabel) {
          briefStatusLabel.textContent = "CHECK WORK EMAIL FORMAT";
          briefSummaryText.textContent = "Please enter a valid work email address so we can reply with next steps.";
          briefOutput.classList.add("is-visible");
        }
        emailInput.focus();
        return;
      }

      const payload = buildBriefPayload();
      if (briefOutput && briefSummaryText && briefStatusLabel) {
        briefStatusLabel.textContent = "STRUCTURED BRIEF GENERATED";
        briefSummaryText.textContent = payload.summary;
        briefOutput.classList.add("is-visible");
      }

      if (mailtoLink) {
        const subject = encodeURIComponent(`Project Brief — ${payload.niche} (${payload.name})`);
        const body = encodeURIComponent(payload.summary);
        mailtoLink.href = `mailto:hello@pundasyondigital.vercel.app?subject=${subject}&body=${body}`;
      }
    });
  }

  if (copyBriefBtn && briefSummaryText) {
    copyBriefBtn.addEventListener("click", () => {
      const textToCopy = briefSummaryText.textContent || "";
      if (!textToCopy) return;
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = textToCopy;
      tempTextarea.setAttribute("readonly", "");
      tempTextarea.style.position = "fixed";
      tempTextarea.style.left = "-9999px";
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      let copied = false;
      try { copied = document.execCommand("copy"); } catch (_err) { copied = false; }
      document.body.removeChild(tempTextarea);
      const originalLabel = copyBriefBtn.textContent;
      copyBriefBtn.textContent = copied ? "Copied ✓" : "Select & Copy";
      setTimeout(() => { copyBriefBtn.textContent = originalLabel; }, 2200);
    });
  }

  // 6. Footer Slots & Actions
  const FOOTER_SLOT_REGISTRY = {
    privacy: {
      slotId: "slot-privacy-v1",
      kicker: "LANE 02 · GOVERNANCE SLOT · PRIVACY",
      title: "Privacy Policy — Slot Ready",
      status: "Staging Draft (Ready for Final Legal Copy)",
      targetPath: "docs/privacy-policy.md (or external URL)",
      summary: "Pundasyon Digital respects client confidentiality across all regions. Project brief fields entered on this page stay local in your browser until you copy or email them directly to our studio inbox.",
      nextStepNote: "Step-by-step hook: Replace `summary` or point `targetPath` to your published Privacy Policy route once finalized."
    },
    terms: {
      slotId: "slot-terms-v1",
      kicker: "LANE 02 · GOVERNANCE SLOT · TERMS",
      title: "Terms of Engagement — Slot Ready",
      status: "Staging Draft (Ready for Commercial Terms)",
      targetPath: "docs/terms-of-service.md (or scope agreement link)",
      summary: "Project scopes, milestone schedules, revision rounds, and intellectual property handoff terms are defined in writing prior to kickoff for every global build.",
      nextStepNote: "Step-by-step hook: Attach your standard engagement terms, deposit structure, and IP transfer notes here when ready."
    },
    cookies: {
      slotId: "slot-cookies-v1",
      kicker: "LANE 02 · GOVERNANCE SLOT · COOKIES",
      title: "Cookie & Storage Preferences — Slot Ready",
      status: "Essential Only Default",
      targetPath: "localStorage['pd_cookie_mode']",
      summary: "No third-party ad trackers are loaded by default. Essential interface state (such as your saved preference choice below) is stored locally so the site stays fast and private.",
      nextStepNote: "Step-by-step hook: When you add analytics or booking widgets later, check `pd_cookie_mode` before initializing optional scripts."
    },
    "brand-mark": {
      slotId: "slot-brand-mark-v1",
      kicker: "LANE 03 · IDENTITY ASSET SLOT · BRAND MARK",
      title: "Brand Mark & Visual Assets — Slot Ready",
      status: "Cloudinary Active · Local Pack Slot Ready",
      targetPath: "https://res.cloudinary.com/ltcondbm/image/upload/v1795725819/pundasyon_favicon.png",
      summary: "Primary studio mark is currently served via Cloudinary for header and favicon rendering, with local repository slots ready for high-resolution SVG/PNG marks and press kits.",
      nextStepNote: "Step-by-step hook: Drop your vector SVG or press kit bundle into `assets/brand/` and update `targetPath` in `FOOTER_SLOT_REGISTRY`."
    }
  };

  const footerStartBriefBtn = document.getElementById("footer-start-brief-btn");
  const footerStatusReadout = document.getElementById("footer-status-readout");

  const setFooterReadout = (msg) => { if (footerStatusReadout) footerStatusReadout.textContent = msg; };
  
  const copyTextSafe = (text) => {
    if (!text) return false;
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_e) { ok = false; }
    document.body.removeChild(temp);
    return ok;
  };

  if (footerStartBriefBtn) {
    footerStartBriefBtn.addEventListener("click", () => {
      const briefSection = document.getElementById("project-brief");
      const nameInput = document.getElementById("client-name");
      if (briefSection) briefSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { if (nameInput && typeof nameInput.focus === "function") nameInput.focus({ preventScroll: true }); }, 380);
      setFooterReadout("NAVIGATED TO PROJECT BRIEF · READY TO SCOPE");
    });
  }

  if (footerCopyEmailBtn) {
    footerCopyEmailBtn.addEventListener("click", () => {
      const emailAddr = footerCopyEmailBtn.getAttribute("data-email") || "hello@pundasyondigital.vercel.app";
      const copied = copyTextSafe(emailAddr);
      if (footerCopyEmailLabel) footerCopyEmailLabel.textContent = copied ? "Copied ✓" : emailAddr;
      setFooterReadout(copied ? `COPIED ${emailAddr.toUpperCase()} TO CLIPBOARD` : `STUDIO CONTACT: ${emailAddr.toUpperCase()}`);
      setTimeout(() => { if (footerCopyEmailLabel) footerCopyEmailLabel.textContent = "Copy Email"; }, 2200);
    });
  }

  const slotModalBackdrop = document.getElementById("slot-modal");
  const slotModalKicker = document.getElementById("slot-modal-kicker");
  const slotModalContent = document.getElementById("slot-modal-content");
  const slotModalCloseBtn = document.getElementById("slot-modal-close-btn");
  let lastSlotTrigger = null;

  const getSavedCookieMode = () => {
    try { return window.localStorage.getItem("pd_cookie_mode") || "essential-only"; } catch (_err) { return "essential-only"; }
  };

  const saveCookieMode = (mode) => {
    try { window.localStorage.setItem("pd_cookie_mode", mode); } catch (_err) {}
  };

  const openSlotModal = (slotKey, triggerEl) => {
    const entry = FOOTER_SLOT_REGISTRY[slotKey];
    if (!entry || !slotModalBackdrop || !slotModalContent) return;

    lastSlotTrigger = triggerEl || null;
    if (slotModalKicker) slotModalKicker.textContent = entry.kicker;

    const currentCookieMode = getSavedCookieMode();
    const cookieControlsHtml = slotKey === "cookies" ? `
        <div class="slot-cookie-controls" role="group" aria-label="Cookie preference options">
          <button class="button-secondary-outline" type="button" id="cookie-essential-btn">Essential Only</button>
          <button class="button button-dark" type="button" id="cookie-analytics-btn">
            <span>Allow Analytics Slot</span>
            <span class="arrow" aria-hidden="true">&#8594;</span>
          </button>
        </div>
        <p class="slot-body-copy" id="cookie-mode-indicator" style="font-family: var(--mono); font-size: 11px;">
          Current saved mode: ${currentCookieMode}
        </p>
      ` : "";

    const brandPreviewHtml = slotKey === "brand-mark" ? `
        <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:var(--ink);color:var(--ivory);border-radius:var(--radius-sm);margin-bottom:16px;">
          <img src="https://res.cloudinary.com/ltcondbm/image/upload/v1795725819/pundasyon_favicon.png" alt="Pundasyon Digital registered mark" width="44" height="44" style="object-fit:contain;border-radius:4px;">
          <span style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;">PUNDASYON DIGITAL &middot; PRIMARY MARK PREVIEW</span>
        </div>
      ` : "";

    slotModalContent.innerHTML = `
      <h3 id="slot-modal-title">${entry.title}</h3>
      <div class="slot-meta-grid">
        <div class="slot-meta-box">
          <span>Slot Identifier</span>
          <code>${entry.slotId}</code>
        </div>
        <div class="slot-meta-box">
          <span>Current State</span>
          <strong>${slotKey === "cookies" ? currentCookieMode : entry.status}</strong>
        </div>
        <div class="slot-meta-box" style="grid-column: 1 / -1;">
          <span>Asset / Document Target</span>
          <code>${entry.targetPath}</code>
        </div>
      </div>
      ${brandPreviewHtml}
      <p class="slot-body-copy">${entry.summary}</p>
      ${cookieControlsHtml}
      <div class="slot-checklist">${entry.nextStepNote}</div>
    `;

    slotModalBackdrop.hidden = false;
    requestAnimationFrame(() => slotModalBackdrop.classList.add("is-open"));
    if (slotModalCloseBtn) slotModalCloseBtn.focus();
    setFooterReadout(`OPENED ${entry.slotId.toUpperCase()}`);

    if (slotKey === "cookies") {
      const essentialBtn = document.getElementById("cookie-essential-btn");
      const analyticsBtn = document.getElementById("cookie-analytics-btn");
      const indicator = document.getElementById("cookie-mode-indicator");
      
      if (essentialBtn) essentialBtn.addEventListener("click", () => {
        saveCookieMode("essential-only");
        if (indicator) indicator.textContent = "Current saved mode: essential-only";
        setFooterReadout("COOKIE PREFERENCE SAVED: ESSENTIAL ONLY");
      });
      
      if (analyticsBtn) analyticsBtn.addEventListener("click", () => {
        saveCookieMode("analytics-enabled");
        if (indicator) indicator.textContent = "Current saved mode: analytics-enabled";
        setFooterReadout("COOKIE PREFERENCE SAVED: ANALYTICS ENABLED");
      });
    }
  };

  const closeSlotModal = () => {
    if (!slotModalBackdrop) return;
    slotModalBackdrop.classList.remove("is-open");
    slotModalBackdrop.hidden = true;
    if (lastSlotTrigger && typeof lastSlotTrigger.focus === "function") lastSlotTrigger.focus();
  };

  document.querySelectorAll(".footer-slot-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slotKey = btn.getAttribute("data-slot");
      openSlotModal(slotKey, btn);
    });
  });

  if (slotModalCloseBtn) slotModalCloseBtn.addEventListener("click", closeSlotModal);
  if (slotModalBackdrop) slotModalBackdrop.addEventListener("click", (event) => { if (event.target === slotModalBackdrop) closeSlotModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && slotModalBackdrop && slotModalBackdrop.classList.contains("is-open")) closeSlotModal(); });
})();
