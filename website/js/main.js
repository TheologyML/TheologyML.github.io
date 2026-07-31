/*
  TML official website behavior
  -----------------------------
  The page is usable without JavaScript. This file adds the mobile menu,
  subtle reveal effects, current copyright year, and click-to-load videos.
*/

(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNavigation = document.querySelector("[data-site-nav]");
  const navigationLinks = document.querySelectorAll("[data-site-nav] a");

  /** Keep the header distinct from the page once visitors scroll. */
  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /** Open or close the mobile navigation and expose its state to assistive technology. */
  const setMenuState = (isOpen) => {
    if (!menuToggle || !siteNavigation) return;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    siteNavigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  menuToggle?.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  /** Apply entrance animation only for visitors who have not disabled motion. */
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /** Keep the copyright year current without needing an annual content update. */
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /*
    Lazy-load YouTube embeds only after visitors choose to play one. This avoids
    third-party requests on initial page load. Replace the placeholder IDs in
    index.html with real YouTube IDs to activate each video.
  */
  const videoButtons = document.querySelectorAll("[data-youtube-id]");

  videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const youtubeId = button.dataset.youtubeId?.trim();
      const videoTitle = button.dataset.videoTitle || "TML video";

      if (!youtubeId || youtubeId.startsWith("REPLACE_")) {
        const helperText = button.querySelector(".video-placeholder-text");
        if (helperText) helperText.textContent = "Add a YouTube video ID in index.html";
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.className = "video-embed";
      iframe.title = videoTitle;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`;

      button.replaceWith(iframe);
    });
  });
})();
