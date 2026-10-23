/* SERVO — أيقونات SVG موحّدة */
(function () {
  "use strict";

  var ICONS = {
    ac: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="8" rx="1"/><path d="M7 8h10"/><path d="M6 12v2a6 6 0 0 0 12 0v-2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg>',
    plumbing: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3v5a3 3 0 0 0 3 3h10a3 3 0 0 1 3 3v0"/><path d="M20 11v6a3 3 0 0 1-3 3H7"/><path d="M4 3h4M16 20h4M12 20v-3"/><circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none"/></svg>',
    electrical: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 2.5 5.5 13H11l-1 8.5L18.5 10.5H13L13.5 2.5Z"/></svg>',
    cleaning: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4 21 10.5 11 20.5 4.5 14 14.5 4Z"/><path d="m7 14 3 3"/><path d="M3 17l-1.5 3.5h4L4 17Z"/></svg>',
    pest: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M12 11v4"/><path d="M8.5 17.5 12 15l3.5 2.5M12 2.5V5M5.5 6l2.5 1.5M18.5 6 16 7.5M5 12h2M17 12h2M6.5 15.5 9 14M17.5 15.5 15 14"/></svg>',
    carpentry: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20 13.5 10.5"/><path d="M4 20h5M4 20v-5"/><path d="M13.5 10.5 17.5 4 21 7.5 15.5 13.5"/><path d="M15.5 13.5 17 15"/><circle cx="17.5" cy="4" r="0.8" fill="currentColor" stroke="none"/></svg>',
    painting: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5c4.7 0 8.5 3.3 8.5 7.5H3.5c0-4.2 3.8-7.5 8.5-7.5Z"/><path d="M12 11v4.5M12 15.5a1.5 1.5 0 1 0 1.5 1.5"/><path d="M3.5 11h17" opacity=".35"/></svg>',
    moving: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 7 5l4 3.5L15 5l4 3.5-4 3.5-4-3.5L7 12 3 8.5Z"/><path d="M7 12v5.5h10V12M12 12v5.5"/></svg>',
    specialized: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5 4.5 7.5v9L12 20.5l7.5-4v-9L12 3.5Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/><path d="M4.5 7.5 12 11.5l7.5-4"/></svg>',
  };

  function inject() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var key = el.getAttribute("data-icon");
      var svg = ICONS[key];
      if (svg) {
        el.innerHTML = svg;
      }
    });
  }

  window.SERVO_ICONS = {
    inject: inject,
    get: function (k) {
      if (!ICONS[k]) return "";
      return ICONS[k].replace('width="26" height="26"', 'width="56" height="56"').replace('stroke-width="1.4"', 'stroke-width="1"');
    }
  };
  if (document.readyState !== "loading") inject();
  else document.addEventListener("DOMContentLoaded", inject);
})();
