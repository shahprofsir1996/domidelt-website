/* DOMIDELT: slide-in "Book appointment" form. Submissions go to the owner's inbox via Web3Forms. */
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

  var opts = '<option value="" disabled selected>Choose your problem</option>' +
    PROBLEMS.map(function (p) { return '<option>' + p + '</option>'; }).join('');
  var box = document.createElement('aside');
  box.className = 'popup'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Book an appointment');
  box.innerHTML =
    '<button type="button" class="popup-x" aria-label="Close">×</button>' +
    '<p class="popup-title">Book an appointment</p>' +
    '<p class="popup-sub">Tell us what needs to change. We’ll get back to you.</p>' +
    '<form novalidate>' +
      '<input type="checkbox" name="botcheck" class="popup-hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label>Name / company name<input type="text" name="name" required autocomplete="organization"></label>' +
      '<label>Your problem<select name="problem" required>' + opts + '</select></label>' +
      '<label>Phone or email<input type="text" name="contact" required autocomplete="email"></label>' +
      '<p class="popup-msg" role="status"></p>' +
      '<button type="submit" class="btn btn-small">Book appointment</button>' +
    '</form>';
  document.body.appendChild(box);

  var form = box.querySelector('form'), msg = box.querySelector('.popup-msg'), shown = false;
  var slug = (location.pathname.match(/(project-[a-z0-9]+)/) || [])[1];
  if (slug in PRESET) form.problem.selectedIndex = PRESET[slug] + 1;

  function show() { if (shown) return; shown = true; box.classList.add('in'); }
  function close(final) { box.classList.remove('in'); shown = true; store.set('dmd-popup', 'done'); window.removeEventListener('scroll', onScroll); }
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0 && window.scrollY / h > 0.35) show();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  box.querySelector('.popup-x').onclick = close;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('in')) close(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), problem = form.problem.value, contact = form.contact.value.trim();
    if (!name || !problem || !contact) { msg.className = 'popup-msg err'; msg.textContent = 'Please fill in all three fields.'; return; }
    var btn = form.querySelector('button[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
    var data = { access_key: KEY, subject: 'New appointment request: DOMIDELT website', from_name: 'DOMIDELT website',
      name: name, problem: problem, contact: contact, page: location.href, botcheck: form.botcheck.checked ? 'yes' : '' };
    if (contact.indexOf('@') > 0) data.email = contact;
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.success) throw new Error(j.message || 'failed');
        form.innerHTML = '<p class="popup-thanks"><strong>Thank you.</strong> Your request is in. We’ll contact you shortly.</p>';
        store.set('dmd-popup', 'done'); setTimeout(function () { box.classList.remove('in'); }, 5000);
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Book appointment';
        msg.className = 'popup-msg err'; msg.textContent = 'Could not send. Please email hello@domidelt.com or WhatsApp us.';
      });
  });
})();
