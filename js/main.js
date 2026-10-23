/* SERVO — main.js
   hash router, topbar, mobile nav, hero, services peek/accordion,
   reveal, form → WhatsApp */
(function () {
  "use strict";

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* ---------- hash router ---------- */
  var ROUTES = {
    "about": "about.html",
    "join": "join.html",
    "privacy": "privacy.html",
    "warranty": "warranty.html",
    "terms": "terms.html"
  };

  function navigate() {
    var hash = location.hash.replace(/^#\/?/, "");
    var route = hash === "" ? null : hash;
    if (route && ROUTES[route]) {
      window.location.replace(ROUTES[route]);
      return;
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-route]");
    if (!a || !ROUTES[a.getAttribute("data-route")]) return;
    e.preventDefault();
    location.hash = "/" + a.getAttribute("data-route");
  });

  /* ---------- topbar: hide/show + scrolled ---------- */
  var topbar = document.getElementById("topbar");
  var lastY = window.scrollY;
  var heroH = 0;

  function measure() {
    var h = document.getElementById("hero");
    heroH = h ? h.offsetHeight : window.innerHeight * 0.9;
  }

  function onScroll() {
    var y = window.scrollY;
    var isHome = document.body.classList.contains("page-home");
    var pastHero = isHome ? y > heroH * 0.7 : y > 60;
    topbar.classList.toggle("is-scrolled", pastHero);
    if (isHome && pastHero) {
      if (y > lastY && !document.getElementById("mobileNav").classList.contains("is-open")) {
        topbar.classList.add("is-hidden");
      } else {
        topbar.classList.remove("is-hidden");
      }
    } else {
      topbar.classList.remove("is-hidden");
    }
    lastY = y;
  }

  var scrollRaf = null;
  window.addEventListener("scroll", function () {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = null;
      onScroll();
    });
  }, { passive: true });

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mobileNav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("is-open");
      topbar.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      mnav.hidden = false;
      document.body.style.overflow = open ? "hidden" : "";
      setTimeout(function () { if (!open) mnav.hidden = true; }, RM ? 0 : 650);
    });
    mnav.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        mnav.classList.remove("is-open");
        topbar.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        setTimeout(function () { mnav.hidden = true; }, RM ? 0 : 650);
      });
    });
  }

  /* ---------- hero: ready + parallax ---------- */
  var hero = document.getElementById("hero");
  var heroImg = document.querySelector(".hero__img");
  var heroCopy = document.querySelector(".hero__copy");

  window.addEventListener("load", function () {
    measure();
    if (hero) {
      if (!RM && heroImg) {
        /* CSS starts img at scale(1.12); adding is-ready transitions it to scale(1) */
        requestAnimationFrame(function () {
          hero.classList.add("is-ready");
          setTimeout(function () { heroImg.style.willChange = "auto"; }, 2500);
        });
      } else {
        hero.classList.add("is-ready");
      }
    }
  });
  window.addEventListener("resize", measure, { passive: true });

  if (hero && heroImg && !RM) {
    var pRaf = null;
    window.addEventListener("scroll", function () {
      if (pRaf) return;
      pRaf = requestAnimationFrame(function () {
        pRaf = null;
        var y = window.scrollY;
        if (y > heroH * 1.5) return;
        var maxShift = heroH * 0.08;
        var t = Math.min(1, Math.max(0, y / heroH));
        heroImg.style.transform = "scaleX(-1) scale(1.08) translateY(" + (t * maxShift / 1.08).toFixed(2) + "px)";
        if (heroCopy) {
          heroCopy.style.opacity = String(Math.max(0, 1 - t * 1.4)).replace(".00", ".0");
        }
      });
    }, { passive: true });
  }

  /* ---------- services peek + accordion ---------- */
  var list = document.getElementById("servicesList");
  var peek = document.getElementById("svcPeek");

  if (peek && !RM) {
    var pics = peek.querySelectorAll(".svc-peek__pic");
    var grad = peek.querySelector(".svc-peek__grad");

    function setKey(key) {
      pics.forEach(function (p) {
        var active = p.getAttribute("data-key") === key;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
      if (grad) {
        var gActive = key === "painting";
        grad.classList.toggle("is-active", gActive);
        grad.hidden = !gActive;
      }
    }
    setKey("ac");

    if (window.matchMedia("(min-width: 1100px)").matches) {
      document.querySelectorAll(".svc__row").forEach(function (btn) {
        btn.addEventListener("mouseenter", function () {
          setKey(btn.getAttribute("data-service"));
        });
        btn.addEventListener("focus", function () {
          setKey(btn.getAttribute("data-service"));
        });
      });
    }
  }

  /* accordion on mobile */
  document.querySelectorAll(".svc__row").forEach(function (btn) {
    var li = btn.closest(".svc");
    var svc = btn.getAttribute("data-service");
    if (!li) return;

    var panel = li.querySelector(".svc__panel");
    if (!panel) {
      /* build the accordion panel */
      var svcData = null;
      if (window.SITE) svcData = window.SITE.services.find(function (s) { return s.id === svc; });
      var hasImg = svc !== "painting";
      panel = document.createElement("div");
      panel.className = "svc__panel";
      panel.setAttribute("id", "panel-" + svc);
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-label", (svcData ? svcData.name : "تفاصيل الخدمة"));
      panel.innerHTML =
        '<div class="svc__panel-inner">' +
        (hasImg
          ? '<img class="svc__panel-img" src="assets/img/gen/' + svc + '-480.jpg" ' +
            'srcset="assets/img/gen/' + svc + '-480.webp 1x, assets/img/gen/' + svc + '-960.webp 2x" ' +
            'alt="" width="480" height="600" loading="lazy" decoding="async" style="aspect-ratio:4/5;object-fit:cover">'
          : '<div class="svc__panel-grad" style="background:radial-gradient(120% 90% at 85% 10%, rgba(212,180,131,.15), transparent 55%), linear-gradient(150deg, var(--navy) 0%, var(--navy-deep) 55%, var(--char) 100%);aspect-ratio:4/5;max-width:220px" aria-hidden="true">' +
            (window.SERVO_ICONS ? window.SERVO_ICONS.get("painting").replace('width="26" height="26"', 'width="56" height="56"').replace('stroke-width="1.5"', 'stroke-width="1.2"') : '') +
            '</div>') +
        '<p class="svc__panel-text">' + (svcData ? svcData.short : "") + '</p>' +
        '<a class="btn btn--dark" href="#request" data-service="' + svc + '">' +
        'اطلب هذه الخدمة</a>' +
        '</div>';
      li.appendChild(panel);
    }

    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      /* close others */
      document.querySelectorAll(".svc__row[aria-expanded='true']").forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          var p = other.closest(".svc").querySelector(".svc__panel");
          if (p) { p.style.maxHeight = "0px"; }
        }
      });
      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
        var img = panel.querySelector("img");
        if (img) {
          img.addEventListener("load", function () {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }, { once: true });
        }
      }
    });
  });

  /* preselect service from accordion CTA */
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".svc__panel a[data-service]");
    if (!a) return;
    var sel = document.getElementById("f-service");
    if (sel) sel.value = a.getAttribute("data-service");
  });

  /* ---------- reveal: uncover + fade + services stagger ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-inview");
      io.unobserve(en.target);
    });
  }, { threshold: 0.25 }) : null;

  document.querySelectorAll(".uncover, .services__list").forEach(function (el) {
    if (RM) {
      el.classList.add("is-inview");
    } else if (io) {
      el.classList.add("is-animating");
      io.observe(el);
    } else {
      el.classList.add("is-inview");
    }
  });

  /* ---------- floating labels ---------- */
  document.querySelectorAll(".field").forEach(function (f) {
    var input = f.querySelector("input, select, textarea");
    if (!input) return;
    function sync() {
      f.classList.toggle("is-filled", input.value.trim() !== "");
    }
    input.addEventListener("focus", function () { f.classList.add("is-focus"); });
    input.addEventListener("blur", function () {
      f.classList.remove("is-focus");
      sync();
    });
    input.addEventListener("input", sync);
    sync();
  });

  /* ---------- request form → WhatsApp ---------- */
  var form = document.getElementById("requestForm");
  var hint = document.getElementById("reqHint");

  if (form) {
    var tel = (window.SITE && SITE.phone) || "97366661238";
    var svcNames = {};
    if (window.SITE) SITE.services.forEach(function (s) { svcNames[s.id] = s.name; });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var ok = true;
      ["service", "governorate", "area", "date", "slot", "name"].forEach(function (k) {
        var f = form.querySelector('[data-field="' + k + '"]');
        var input = f.querySelector("input, select, textarea");
        var valid = input.value.trim() !== "";
        f.classList.toggle("has-error", !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        hint.textContent = "أكمل الحقول المطلوبة";
        hint.classList.add("is-visible");
        return;
      }

      var data = {
        service: document.getElementById("f-service").value,
        gov: document.getElementById("f-gov").value,
        area: document.getElementById("f-area").value.trim(),
        date: document.getElementById("f-date").value,
        slot: document.getElementById("f-slot").value,
        name: document.getElementById("f-name").value.trim(),
        details: document.getElementById("f-details").value.trim()
      };

      var svcLabel = svcNames[data.service] || data.service;
      var msg =
        "طلب خدمة\n" +
        "الخدمة: " + svcLabel + "\n" +
        "المحافظة: " + data.gov + " — المنطقة: " + data.area + "\n" +
        "التاريخ: " + data.date + " (" + data.slot + ")\n" +
        "الاسم: " + data.name +
        (data.details ? "\nالتفاصيل: " + data.details : "");

      var btn = form.querySelector(".req-foot__btn");
      btn.classList.add("is-loading");
      hint.textContent = "";
      hint.classList.remove("is-visible");

      setTimeout(function () {
        btn.classList.remove("is-loading");
        var url = "https://wa.me/" + tel + "?text=" + encodeURIComponent(msg);
        window.open(url, "_blank", "noopener");
        hint.textContent = "فتحنا واتساب برسلتك الجاهزة — أرسلها لتأكيد الطلب.";
        hint.classList.add("is-visible");
      }, RM ? 100 : 1200);
    });
  }

  /* ---------- join form → WhatsApp (on join.html) ---------- */
  var joinForm = document.getElementById("joinForm");
  if (joinForm) {
    var joinHint = document.getElementById("joinHint");
    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "phone", "governorate", "service", "experience"].forEach(function (k) {
        var f = joinForm.querySelector('[data-field="' + k + '"]');
        if (!f) return;
        var input = f.querySelector("input, select, textarea");
        if (!input) return;
        if (k === "phone") {
          var digits = input.value.replace(/[^0-9]/g, "");
          ok = (digits.length >= 8 && digits.length <= 15) ? ok : false;
        } else {
          ok = (input.value.trim() !== "") ? ok : false;
        }
        f.classList.toggle("has-error", !ok);
      });
      var agree = joinForm.querySelector('input[type="checkbox"]');
      if (agree && !agree.checked) {
        ok = false;
        agree.closest(".check").classList.add("has-error");
      }
      if (!ok) {
        joinHint.textContent = "أكمل الحقول المطلوبة قبل الإرسال";
        joinHint.classList.add("is-visible");
        return;
      }

      var g = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var msg =
        "رغبة في الانضمام لفريق سيرفو\n" +
        "الاسم: " + g("j-name") + "\n" +
        "الجوال: " + g("j-phone") + "\n" +
        "المحافظة: " + g("j-gov") + "\n" +
        "الخدمة: " + g("j-service") + "\n" +
        "الخبرة: " + g("j-exp") +
        (g("j-msg") ? "\nرسالة: " + g("j-msg") : "");

      var jbtn = joinForm.querySelector(".req-foot__btn");
      if (jbtn) jbtn.classList.add("is-loading");
      setTimeout(function () {
        if (jbtn) jbtn.classList.remove("is-loading");
        var tel = (window.SITE && SITE.phone) || "97366661238";
        window.open("https://wa.me/" + tel + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
        joinHint.textContent = "فتحنا واتساب برسالتك الجاهزة — أرسلها لنصل إليك.";
        joinHint.classList.add("is-visible");
      }, RM ? 100 : 1200);
    });
  }

  /* ---------- init ---------- */
  navigate();
  measure();
  onScroll();

  window.addEventListener("hashchange", navigate);
  if (window.SERVO_ICONS) window.SERVO_ICONS.inject();
})();
