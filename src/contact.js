// Contact form: sends messages through FormSubmit (no backend needed).
// The first message ever sent triggers a one-time activation email to CONTACT_EMAIL.
// If the request fails, the form falls back to opening the visitor's mail app.
const CONTACT_EMAIL = 'vismay3175@gmail.com';
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = document.getElementById('contact-submit');
  const buttonLabel = button?.querySelector('.cf-submit-label');
  const status = document.getElementById('contact-status');
  const code = document.getElementById('contact-code');
  const count = document.getElementById('contact-count');
  const success = document.getElementById('contact-success');
  const successName = document.getElementById('contact-success-name');

  // Status line + request badge in the card header.
  const setState = (state, badge, text) => {
    if (code) {
      code.dataset.state = state;
      code.textContent = badge;
    }
    if (status) {
      status.dataset.state = state;
      status.textContent = text;
    }
  };

  const markInvalid = (field, bad) => {
    field.closest('.cf-field')?.toggleAttribute('data-invalid', bad);
  };

  form.elements.message.addEventListener('input', (e) => {
    if (count) count.textContent = e.target.value.length;
  });
  form.addEventListener('input', (e) => {
    if (e.target.closest('.cf-field')) markInvalid(e.target, false);
  });

  initCopyEmail();
  initClock();

  document.getElementById('contact-reset')?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    setState('idle', 'READY', '// fill the form and hit send');
    form.elements.name.focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { name: nameEl, email: emailEl, message: messageEl } = form.elements;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    const intent = form.elements.intent.value || 'General';

    const invalid = [
      [nameEl, !name],
      [emailEl, !EMAIL_RE.test(email)],
      [messageEl, !message],
    ];
    invalid.forEach(([el, bad]) => markInvalid(el, bad));
    const firstBad = invalid.find(([, bad]) => bad);
    if (firstBad) {
      setState('error', '422', '422 Unprocessable: add your name, a valid email and a message.');
      firstBad[0].focus();
      return;
    }

    if (button) button.disabled = true;
    if (buttonLabel) buttonLabel.textContent = 'Sending...';
    setState('sending', '202', '202 Accepted: delivering your message...');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          intent,
          message,
          _subject: `[${intent}] Portfolio message from ${name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false || data.success === 'false') {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      form.reset();
      if (count) count.textContent = '0';
      setState('ok', '201', '');
      if (successName) successName.textContent = name.split(' ')[0];
      form.hidden = true;
      if (success) success.hidden = false;
    } catch (err) {
      const subject = encodeURIComponent(`[${intent}] Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      setState('error', '503', '503: could not send automatically. Opening your email app instead.');
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    } finally {
      if (button) button.disabled = false;
      if (buttonLabel) buttonLabel.textContent = 'Send message';
    }
  });
}

function initCopyEmail() {
  const btn = document.getElementById('contact-copy');
  if (!btn) return;
  const label = btn.querySelector('span');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      btn.setAttribute('data-copied', '');
      if (label) label.textContent = 'Copied';
      setTimeout(() => {
        btn.removeAttribute('data-copied');
        if (label) label.textContent = 'Copy';
      }, 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  });
}

function initClock() {
  const el = document.getElementById('contact-clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
  });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 30000);
}
