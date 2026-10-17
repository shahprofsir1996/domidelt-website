/* DOMIDELT booking pop-up v3 (glass card, self-contained). Sends to the owner inbox via Web3Forms. */
window.DMD_BOOKING = "v3";
(function () {
  var KEY = 'a2576149-d030-4f48-98d2-29669c868c3c';
  var PROBLEMS = [
    'Sales are up, but profit isn’t',
    'Profit on paper, but cash is always tight',
    'Not sure what jobs cost or what to charge',
    'Busy, but no clear direction',
    'Leads come in, but few become customers',
    'Good people, but results fall short',
    'Other'
  ];
  var PRESET = { 'project-profit': 0, 'project-360': 3, 'project-next': 2, 'project-edge': 5 };
  var store = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
                set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  if (store.get('dmd-popup') === 'done') return;

  var css = '' +
  '.dmd-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(10,10,10,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .35s ease,visibility 0s .35s}' +
  '.dmd-ov.in{opacity:1;visibility:visible;transition:opacity .35s ease}' +
  '.dmd-card{position:relative;width:100%;max-width:400px;max-height:calc(100vh - 32px);overflow:auto;box-sizing:border-box;padding:30px 28px 26px;border-radius:20px;color:#111;font-family:Montserrat,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;' +
    'background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,255,255,.52));border:1px solid rgba(255,255,255,.7);box-shadow:0 24px 70px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.8);-webkit-backdrop-filter:blur(22px) saturate(160%);backdrop-filter:blur(22px) saturate(160%);transform:translateY(18px) scale(.97);transition:transform .4s cubic-bezier(.2,.8,.2,1)}' +
  '.dmd-ov.in .dmd-card{transform:none}' +
  '.dmd-card *{box-sizing:border-box;font-family:inherit}' +
  '.dmd-x{position:absolute;top:12px;right:12px;width:34px;height:34px;border:0;border-radius:50%;background:rgba(0,0,0,.07);color:#111;font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:background .2s}' +
  '.dmd-x:hover{background:rgba(0,0,0,.16)}' +
  '.dmd-eyebrow{margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#6b6b6b}' +
  '.dmd-title{margin:0;font-size:22px;font-weight:700;letter-spacing:-.01em;color:#111}' +
  '.dmd-sub{margin:6px 0 20px;font-size:13.5px;color:#555}' +
  '.dmd-card form{display:flex;flex-direction:column;gap:14px;margin:0}' +
  '.dmd-card label{display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#555}' +
  '.dmd-card input[type=text],.dmd-card select{width:100%;height:44px;padding:0 14px;font-size:14px;font-weight:500;letter-spacing:0;text-transform:none;color:#111;background:rgba(255,255,255,.6);border:1px solid rgba(0,0,0,.12);border-radius:10px;outline:none;-webkit-appearance:none;appearance:none;transition:border-color .2s,box-shadow .2s,background .2s}' +
  '.dmd-card select{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' fill=\'none\' stroke=\'%23111\' stroke-width=\'1.8\' stroke-linecap=\'round\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}' +
  '.dmd-card input:focus,.dmd-card select:focus{background-color:rgba(255,255,255,.9);border-color:#111;box-shadow:0 0 0 3px rgba(0,0,0,.08)}' +
  '.dmd-btn{height:46px;margin-top:4px;border:0;border-radius:10px;background:#111;color:#fff;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:transform .15s,background .2s}' +
  '.dmd-btn:hover{background:#000;transform:translateY(-1px)}.dmd-btn:disabled{opacity:.6;cursor:default;transform:none}' +
  '.dmd-msg{margin:0;font-size:12.5px;color:#c0392b;min-height:0}' +
  '.dmd-msg:empty{display:none}' +
  '.dmd-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}' +
  '.dmd-thanks{margin:6px 0 2px;font-size:15px;color:#111}.dmd-thanks span{display:block;margin-top:6px;font-size:13.5px;color:#555}' +
  '@media (prefers-color-scheme:dark){' +
    '.dmd-ov{background:rgba(0,0,0,.5)}' +
    '.dmd-card{color:#f4f4f2;background:linear-gradient(145deg,rgba(40,40,40,.72),rgba(18,18,18,.55));border-color:rgba(255,255,255,.14);box-shadow:0 24px 70px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.1)}' +
    '.dmd-title,.dmd-thanks{color:#f4f4f2}.dmd-sub,.dmd-thanks span,.dmd-card label{color:#b5b5b5}.dmd-eyebrow{color:#9b9b9b}' +
    '.dmd-x{background:rgba(255,255,255,.12);color:#f4f4f2}.dmd-x:hover{background:rgba(255,255,255,.22)}' +
    '.dmd-card input[type=text],.dmd-card select{color:#f4f4f2;background-color:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18)}' +
    '.dmd-card select{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' fill=\'none\' stroke=\'%23f4f4f2\' stroke-width=\'1.8\' stroke-linecap=\'round\'/%3E%3C/svg%3E")}' +
    '.dmd-card select option{color:#111}' +
    '.dmd-card input:focus,.dmd-card select:focus{background-color:rgba(255,255,255,.14);border-color:#f4f4f2;box-shadow:0 0 0 3px rgba(255,255,255,.12)}' +
    '.dmd-btn{background:#f4f4f2;color:#111}.dmd-btn:hover{background:#fff}.dmd-msg{color:#ff8a7a}' +
  '}' +
  '@media (max-width:480px){.dmd-card{padding:26px 20px 20px;border-radius:18px}.dmd-title{font-size:20px}}' +
  '@media (prefers-reduced-motion:reduce){.dmd-ov,.dmd-card{transition:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var opts = '<option value="" disabled selected>Choose your problem</option>' +
    PROBLEMS.map(function (p) { return '<option>' + p + '</option>'; }).join('');
  var ov = document.createElement('div');
  ov.className = 'dmd-ov';
  ov.innerHTML =
    '<div class="dmd-card" role="dialog" aria-modal="true" aria-label="Book an appointment">' +
      '<button type="button" class="dmd-x" aria-label="Close">×</button>' +
      '<p class="dmd-eyebrow">DOMIDELT</p>' +
      '<h2 class="dmd-title">Book an appointment</h2>' +
      '<p class="dmd-sub">Tell us what needs to change. We’ll get back to you.</p>' +
      '<form novalidate autocomplete="on">' +
        '<input type="text" name="website" class="dmd-hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<label>Name / company name<input type="text" name="name" autocomplete="organization"></label>' +
        '<label>Your problem<select name="problem">' + opts + '</select></label>' +
        '<label>Phone or email<input type="text" name="contact" autocomplete="email"></label>' +
        '<p class="dmd-msg" role="status"></p>' +
        '<button type="submit" class="dmd-btn">Book appointment</button>' +
      '</form>' +
    '</div>';
  document.body.appendChild(ov);

  var form = ov.querySelector('form'), msg = ov.querySelector('.dmd-msg'), shown = false;
  var slug = (location.pathname.match(/(project-[a-z0-9]+)/) || [])[1];
  if (slug && PRESET.hasOwnProperty(slug)) form.problem.selectedIndex = PRESET[slug] + 1;

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (!shown && h > 0 && window.scrollY / h > 0.35) { shown = true; ov.classList.add('in'); }
  }
  function close() { ov.classList.remove('in'); shown = true; store.set('dmd-popup', 'done'); window.removeEventListener('scroll', onScroll); }
  window.addEventListener('scroll', onScroll, { passive: true });
  ov.querySelector('.dmd-x').onclick = close;
  ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('in')) close(); });

  function thanks() {
    ov.querySelector('.dmd-card form').outerHTML = '<p class="dmd-thanks"><strong>Thank you.</strong><span>Your request is in. We’ll contact you shortly.</span></p>';
    store.set('dmd-popup', 'done'); setTimeout(close, 4500);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), problem = form.problem.value, contact = form.contact.value.trim();
    if (!name || !problem || !contact) { msg.textContent = 'Please fill in all three fields.'; return; }
    msg.textContent = '';
    if (form.website.value) { thanks(); return; }               // spam trap filled: pretend success, send nothing
    var btn = form.querySelector('.dmd-btn'); btn.disabled = true; btn.textContent = 'Sending…';
    var data = { access_key: KEY, subject: 'New appointment request: DOMIDELT website', from_name: 'DOMIDELT website',
      name: name, problem: problem, contact: contact, page: location.href };
    if (contact.indexOf('@') > 0) data.email = contact;
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { success: false, message: 'Unexpected reply' }; }); })
      .then(function (j) { if (!j.success) throw new Error(j.message || 'Not accepted'); thanks(); })
      .catch(function (err) {
        console.error('DOMIDELT form:', err);
        btn.disabled = false; btn.textContent = 'Book appointment';
        msg.textContent = 'Could not send (' + (err && err.message ? err.message : 'network') + '). Please email hello@domidelt.com.';
      });
  });
})();
