// Contact form: sends messages through FormSubmit (no backend needed).
// The first message ever sent triggers a one-time activation email to CONTACT_EMAIL.
// If the request fails, the form falls back to opening the visitor's mail app.
const CONTACT_EMAIL = 'vismay3175@gmail.com';
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = document.getElementById('contact-submit');
  const status = document.getElementById('contact-status');

  const setStatus = (text, ok) => {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('text-emerald-600', ok === true);
    status.classList.toggle('text-rose-500', ok === false);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter your name, a valid email and a message.', false);
      return;
    }

    if (button) button.disabled = true;
    setStatus('Sending...', null);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
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
      setStatus('Thanks! Your message was sent. I will reply soon.', true);
    } catch (err) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      setStatus('Could not send automatically. Opening your email app instead.', false);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    } finally {
      if (button) button.disabled = false;
    }
  });
}
