/* Trim Dog Pet Centre — header, menu, aisles + shopping list, gallery lightbox, form */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- header shrink + active nav ---------- */
  var head = $('[data-head]');
  var onScroll = function () { head.classList.toggle('is-scrolled', window.scrollY > 24); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var navLinks = $$('.nav-link');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) secIO.observe(s); });
  }

  /* ---------- mobile menu ---------- */
  var mBtn = $('[data-menu-btn]'), menu = $('[data-menu]');
  if (mBtn && menu) {
    var setMenu = function (open) { mBtn.setAttribute('aria-expanded', String(open)); menu.hidden = !open; };
    mBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); mBtn.focus(); } });
  }

  /* ---------- hero: layers drift a touch with the cursor (fine pointers only) ---------- */
  var par = $('[data-parallax]');
  if (par && !reduce && window.matchMedia('(pointer: fine)').matches) {
    var layers = $$('[data-depth]', par), raf = 0, mx = 0, my = 0;
    var apply = function () {
      raf = 0;
      layers.forEach(function (l) { var d = +l.getAttribute('data-depth'); l.style.translate = (mx * d) + 'px ' + (my * d) + 'px'; });
    };
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX / window.innerWidth - .5; my = e.clientY / window.innerHeight - .5;
      if (!raf && window.scrollY < window.innerHeight) raf = requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* ---------- aisles tabs ---------- */
  var tabs = $$('[data-tabs] [role="tab"]');
  var select = function (tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab, p = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      p.hidden = !on; p.classList.toggle('is-on', on);
    });
    if (focus) tab.focus();
    if (tab.scrollIntoView && window.innerWidth < 1024) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });

  /* ---------- the shopping list ---------- */
  var KEY = 'trimdog-list';
  var list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { list = []; }
  var field = $('[data-list-field]');
  var chip = $('[data-chip]');
  var counts = $$('[data-count]');
  var adds = $$('[data-add]');
  var fieldTouched = false;

  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} };
  var render = function () {
    adds.forEach(function (b) {
      var on = list.indexOf(b.getAttribute('data-add')) > -1;
      b.setAttribute('aria-pressed', String(on));
      if (!b.dataset.label) b.dataset.label = b.textContent.trim();
      b.textContent = on ? 'On list' : b.dataset.label;
    });
    counts.forEach(function (c) { c.textContent = list.length; c.hidden = list.length === 0; });
    if (chip) chip.hidden = list.length === 0;
    if (field && !fieldTouched) field.value = list.join('\n');
  };
  adds.forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.getAttribute('data-add'), i = list.indexOf(item);
      if (i > -1) list.splice(i, 1); else list.push(item);
      if (field && fieldTouched) {
        // keep anything typed by hand, just add/remove this line
        var lines = field.value.split('\n').filter(function (l) { return l.trim() && l.trim() !== item; });
        if (i === -1) lines.push(item);
        field.value = lines.join('\n');
      }
      save(); render();
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    });
  });
  if (field) field.addEventListener('input', function () { fieldTouched = true; });
  render();

  /* ---------- reveals (only a few elements) + steps ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .25 });
    $$('[data-reveal], [data-steps]').forEach(function (el) { io.observe(el); });
  } else {
    $$('[data-reveal], [data-steps]').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- gallery lightbox ---------- */
  var pins = $$('[data-gallery] .pin'), lb = $('[data-lb]');
  if (lb && pins.length) {
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb), idx = 0, last = null;
    var show = function (i) {
      idx = (i + pins.length) % pins.length;
      var p = pins[idx];
      img.src = p.getAttribute('data-full');
      img.alt = $('img', p).alt;
      cap.textContent = p.getAttribute('data-cap');
    };
    var open = function (i) { last = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); };
    var close = function () { lb.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); };
    pins.forEach(function (p, i) { p.addEventListener('click', function () { open(i); }); });
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
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); });
  }

  /* ---------- form ---------- */
  var form = $('[data-form]');
  if (form) {
    var status = $('[data-status]', form);
    var check = function (el) {
      var f = el.closest('.field'); if (!f) return true;
      var v = el.value.trim(), ok = true;
      if (el.required && !v) ok = false;
      if (ok && v && el.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (ok && v && el.type === 'tel') ok = /^[0-9 +()\-]{6,}$/.test(v);
      f.classList.toggle('is-bad', !ok);
      f.classList.toggle('is-good', ok && !!v);
      return ok;
    };
    $$('input:not([type=hidden]):not([name=_honey]), textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value.trim() || el.closest('.field').classList.contains('is-bad')) check(el); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('is-bad')) check(el); });
    });
    form.addEventListener('submit', function (e) {
      var bad = $$('input:not([type=hidden]):not([name=_honey]), textarea', form).filter(function (el) { return !check(el); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); status.textContent = 'Please check the highlighted fields.'; return; }
      form.classList.add('is-sending');
      var btn = $('[data-submit]', form); btn.disabled = true; $('.lbl', btn).textContent = 'Sending…';
      status.textContent = 'Sending your list.';
      try { localStorage.removeItem(KEY); } catch (err) {}
      // let the "Packed" stamp land before the browser moves on
      e.preventDefault();
      setTimeout(function () { form.submit(); }, reduce ? 0 : 650);
    });
  }
})();
