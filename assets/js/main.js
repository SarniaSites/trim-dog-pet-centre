/* Trim Dog Pet Centre – vanilla JS
   header · menu · hero tag swing · aisle tabs · gallery lightbox · tag engraver · form */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- header shrink, active nav, mobile bar ---------- */
  var header = $('[data-header]');
  var bar = $('[data-mobile-bar]');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (bar) bar.classList.toggle('is-on', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navLinks = $$('.navlink');
  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id); if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['aisles', 'shop', 'tags', 'order', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = $('[data-menu-btn]'), menu = $('[data-menu]');
  if (menuBtn && menu) {
    var setMenu = function (open) { menuBtn.setAttribute('aria-expanded', String(open)); menu.hidden = !open; };
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  /* ---------- hero: the bone tag swings in on its ring, then answers the pointer ---------- */
  var tag = $('[data-swing]');
  if (tag && !reduced) {
    var angle = -16, vel = 0, running = true, last = performance.now();
    var K = 26, D = 2.6; // spring stiffness + damping
    var idleT = 0;
    var step = function (now) {
      var dt = Math.min(0.033, (now - last) / 1000); last = now;
      idleT += dt;
      var target = Math.sin(idleT * 0.9) * 0.6; // a breath of sway
      var acc = -K * (angle - target) - D * vel;
      vel += acc * dt; angle += vel * dt;
      tag.style.transform = 'rotate(' + angle.toFixed(3) + 'deg)';
      if (running) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    var nudge = function (amount) { vel += amount; };
    if (fine) {
      var lastX = null;
      tag.parentElement.addEventListener('pointermove', function (e) {
        if (lastX !== null) nudge(Math.max(-30, Math.min(30, (e.clientX - lastX) * 0.9)));
        lastX = e.clientX;
      });
      tag.parentElement.addEventListener('pointerleave', function () { lastX = null; });
    }
    tag.addEventListener('pointerdown', function (e) {
      var r = tag.getBoundingClientRect();
      nudge(((e.clientX - r.left) / r.width - 0.5) * -90);
    });
    // pause when the hero is off screen
    if ('IntersectionObserver' in window) {
      var hero = $('.hero');
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        hero.classList.toggle('is-paused', !vis);
        if (vis && !running) { running = true; last = performance.now(); requestAnimationFrame(step); }
        else if (!vis) running = false;
      }).observe(hero);
    }
  }

  /* ---------- aisle tabs (tags on a ring) ---------- */
  var tablist = $('[data-tabs]');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  /* ---------- gallery lightbox ---------- */
  var tiles = $$('[data-gallery] .tile');
  var lb = $('[data-lightbox]');
  if (tiles.length && lb) {
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb), idx = 0, opener = null;
    var show = function (i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx];
      img.src = t.dataset.full; img.alt = $('img', t).alt; cap.textContent = t.dataset.cap;
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    };
    var open = function (i) { opener = tiles[i]; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); };
    var close = function () { lb.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); };
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb), first = f[0], lastB = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastB.focus(); }
        else if (!e.shiftKey && document.activeElement === lastB) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- tag engraver ---------- */
  var eng = $('[data-engraver]');
  if (eng) {
    var svg = $('[data-eng-svg]', eng), swing = $('.eng-swing', svg);
    var nameOut = $('[data-eng-name]', svg), lineOut = $('[data-eng-line]', svg);
    var nameIn = $('[data-eng-name-in]', eng), lineIn = $('[data-eng-line-in]', eng);
    var shape = 'bone';
    var layout = { bone: [141, 160, 36, 76], heart: [182, 208, 36, 108], round: [184, 212, 38, 76] };
    var ring = $('[data-eng-ring]', svg);
    var jiggle = function () {
      if (reduced) return;
      swing.classList.remove('is-swinging'); void swing.getBoundingClientRect(); swing.classList.add('is-swinging');
    };
    var fit = function () {
      var name = (nameIn.value || nameIn.placeholder).trim();
      nameOut.textContent = name;
      lineOut.textContent = (lineIn.value || '01481 000000').trim();
      var L = layout[shape], size = L[2];
      var max = shape === 'round' ? 165 : shape === 'heart' ? 170 : 240;
      nameOut.setAttribute('y', L[0]); lineOut.setAttribute('y', L[1]); ring.setAttribute('cy', L[3]);
      nameOut.style.fontSize = size + 'px';
      try { var w = nameOut.getComputedTextLength(); if (w > max) nameOut.style.fontSize = (size * max / w).toFixed(1) + 'px'; } catch (err) {}
    };
    var tmr;
    [nameIn, lineIn].forEach(function (inp) {
      inp.addEventListener('input', function () { fit(); clearTimeout(tmr); tmr = setTimeout(jiggle, 350); });
    });
    $$('input[name="shape"]', eng).forEach(function (r) {
      r.addEventListener('change', function () {
        shape = r.value;
        $$('[data-shape]', svg).forEach(function (g) { g.toggleAttribute('hidden', g.getAttribute('data-shape') !== shape); });
        fit(); jiggle();
      });
    });
    $$('input[name="colour"]', eng).forEach(function (r) {
      r.addEventListener('change', function () {
        var c = r.value.split('|');
        svg.style.setProperty('--tagc', c[0]); svg.style.setProperty('--engc', c[1]);
        jiggle();
      });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); else fit();
  }

  /* ---------- order form: inline validation, sending state ---------- */
  var form = $('[data-form]');
  if (form) {
    var msgs = { name: 'Please add your name.', phone: 'Please add a phone number we can ring.', email: 'That email doesn’t look right.', service: 'Please choose one.', message: 'Tell us what you need.' };
    var check = function (el) {
      var f = el.closest('.field'); if (!f) return true;
      var ok = el.checkValidity() && (!el.required || el.value.trim() !== '');
      f.classList.toggle('is-invalid', !ok);
      f.classList.toggle('is-valid', ok && el.value.trim() !== '');
      $('.err', f).textContent = ok ? '' : (msgs[el.name] || 'Please check this.');
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    var fields = $$('.field input, .field select, .field textarea', form);
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value.trim() !== '' || el.closest('.field').classList.contains('is-invalid')) check(el); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('is-invalid')) check(el); });
    });
    form.addEventListener('submit', function (e) {
      var allOk = fields.map(check).every(Boolean);
      if (!allOk) { e.preventDefault(); var bad = $('.is-invalid input, .is-invalid select, .is-invalid textarea', form); if (bad) bad.focus(); return; }
      form.classList.add('is-sending');
      var done = $('[data-done]', form);
      setTimeout(function () { done.hidden = false; }, 250);
    });
  }

  var yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();
})();
