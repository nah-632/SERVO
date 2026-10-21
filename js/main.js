
// ===== SERVO Main JS =====

// Mobile nav toggle
(function() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', function() {
    const isOpen = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Header scroll effect
(function() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Language toggle
(function() {
  const btn = document.getElementById('arEnToggle');
  if (!btn) return;
  const isEn = document.body.classList.contains('page-en');
  btn.addEventListener('click', function() {
    location.href = isEn ? 'index.html' : 'en.html';
  });
})();

// Service card -> pre-fill booking form
(function() {
  const svcSelect = document.getElementById('bkService');
  const cards = document.querySelectorAll('.svc-card');

  cards.forEach(function(card) {
    const link = card.querySelector('.svc-link');
    if (!link) return;

    link.addEventListener('click', function(e) {
      const svc = card.dataset.svc;
      if (svcSelect) {
        svcSelect.value = svc;
        // scroll to booking
        const booking = document.getElementById('booking');
        if (booking) {
          booking.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
})();

// Booking form
(function() {
  const form = document.getElementById('heroBookingForm');
  if (!form) return;

  const svcSel = document.getElementById('bkService');
  const areaSel = document.getElementById('bkArea');
  const dateInp = document.getElementById('bkDate');
  const phoneInp = document.getElementById('bkPhone');
  const notesInp = document.getElementById('bkNotes');

  // Set min date to today
  if (dateInp) {
    dateInp.min = new Date().toISOString().split('T')[0];
  }

  // Phone: digits only
  if (phoneInp) {
    phoneInp.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 8);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    if (!svcSel.value) {
      alert(document.body.classList.contains('page-en') ? 'Please select a service.' : 'الرجاء اختيار خدمة.');
      svcSel.focus();
      return;
    }
    if (!areaSel.value) {
      alert(document.body.classList.contains('page-en') ? 'Please select a governorate.' : 'الرجاء اختيار المحافظة.');
      areaSel.focus();
      return;
    }
    if (!dateInp.value) {
      alert(document.body.classList.contains('page-en') ? 'Please select a date.' : 'الرجاء اختيار التاريخ.');
      dateInp.focus();
      return;
    }
    const phoneVal = phoneInp.value;
    if (phoneVal.length !== 8) {
      alert(document.body.classList.contains('page-en')
        ? 'Please enter a valid 8-digit Bahraini phone number.'
        : 'الرجاء إدخال رقم جوال بحريني صحيح من 8 أرقام.');
      phoneInp.focus();
      return;
    }

    // Generate booking reference
    const ref = generateBookingRef();

    // Build success display
    const isEn = document.body.classList.contains('page-en');
    const svcLabel = svcSel.options[svcSel.selectedIndex].text;
    const areaLabel = areaSel.options[areaSel.selectedIndex].text;
    const dateLabel = new Date(dateInp.value).toLocaleDateString(
      isEn ? 'en-BH' : 'ar-BH',
      { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    );
    const phone = '+973 ' + phoneVal.slice(0,4) + ' ' + phoneVal.slice(4);

    const successHTML =
      '<div class="form-success">' +
        '<strong>' + (isEn ? 'Request Received' : 'تم استلام طلبك') + '</strong>' +
        '<p class="ref">' + ref + '</p>' +
        '<p>' + svcLabel + ' · ' + areaLabel + '</p>' +
        '<p>' + dateLabel + '</p>' +
        '<p dir="ltr" style="font-family:monospace">' + phone + '</p>' +
        '<p style="margin-top:10px;font-size:12.5px">' +
          (isEn
            ? 'We will contact you shortly to confirm your appointment. Keep your reference for tracking.'
            : 'سنتواصل معك قريباً لتأكيد موعدك. احتفظ برقم المرجع للمتابعة.') +
        '</p>' +
      '</div>';

    form.innerHTML = successHTML;
  });

  function generateBookingRef() {
    const charset = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let ref = 'SRV-';
    for (let i = 0; i < 8; i++) {
      ref += charset.charAt(Math.floor(Math.random() * charset.length));
      if (i === 3) ref += '-';
    }
    return ref;
  }
})();

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
