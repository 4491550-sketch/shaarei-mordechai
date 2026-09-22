/* פס "תשלום מאובטח" מתחת לכל כפתור תרומה ראשי באתר */
(function () {
  var css = '.secure-pay{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:5px;margin:10px auto 12px;font-size:.8rem;line-height:1;}' +
    '.secure-pay .sp-lbl{font-weight:700;opacity:.85;display:inline-flex;align-items:center;gap:4px}' +
    '.secure-pay .sp-b{display:inline-block;padding:5px 9px;border-radius:6px;border:1px solid rgba(160,130,60,.45);background:#fff;color:#1c2340;font-weight:800;letter-spacing:.02em;font-family:Arial,Helvetica,sans-serif;direction:ltr}' +
    '@media (max-width:520px){.secure-pay{font-size:.72rem;gap:4px}.secure-pay .sp-b{padding:4px 6px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var lock = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor"><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z"/></svg>';
  var lang = (location.pathname.match(/^\/(en|fr|es)(\/|$)/) || [])[1] || 'he';
  var label = {he: 'תשלום מאובטח:', en: 'Secure payment:', fr: 'Paiement sécurisé :', es: 'Pago seguro:'}[lang];
  var methods = ['VISA', 'Mastercard', 'Isracard', 'Bit'];
  function strip() {
    var d = document.createElement('div');
    d.className = 'secure-pay';
    d.setAttribute('role', 'note');
    d.setAttribute('aria-label', label + ' ' + methods.join(', '));
    d.innerHTML = '<span class="sp-lbl" aria-hidden="true">' + lock + label + '</span>' +
      methods.map(function (m) { return '<span class="sp-b" aria-hidden="true">' + m + '</span>'; }).join('');
    return d;
  }
  function run() {
    var links = document.querySelectorAll('a[href*="nedarimplus"], a[href*="nedar.im"], a#donate-btn');
    var done = [];
    links.forEach(function (a) {
      if (!(a.classList.contains('btn') || a.classList.contains('don'))) return;
      if (a.classList.contains('btn-sm')) return;
      if (a.closest('header, nav, .hero-actions, .sticky, .modal, dialog, [role="dialog"], .contact')) return;
      var par = a.parentElement, anchor = a;
      if (par && par.tagName === 'P') anchor = par;
      else if (par && par.querySelectorAll(':scope > a.btn, :scope > a.don').length > 1) anchor = par;
      if (done.indexOf(anchor) > -1) return;
      done.push(anchor);
      var s = strip();
      if (lang !== 'he') s.style.direction = 'ltr';
      if (anchor === a && /flex|grid/.test(getComputedStyle(a.parentElement).display)) {
        s.style.flexBasis = '100%';
      }
      anchor.insertAdjacentElement('afterend', s);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
