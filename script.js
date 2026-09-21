// Scroll fluido per i link della nav
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Consenso cookie contestuale, dentro il riquadro del player ---
const CONSENT_KEY = 'kov-cookie-consent'; // valori: 'accepted' | 'declined'
const embedContainer = document.getElementById('player-embed');

function renderGate() {
  embedContainer.innerHTML = `
    <div class="cookie-gate">
      <p class="cookie-gate__text">
        Per ascoltare i brani è necessario accettare i cookie di terze parti impostati da SoundCloud.
        <a href="privacy.html">Scopri di più</a>.
      </p>
      <div class="cookie-gate__actions">
        <button id="cookie-decline" class="cookie-btn cookie-btn--ghost">Rifiuta</button>
        <button id="cookie-accept" class="cookie-btn">Accetta e ascolta</button>
      </div>
    </div>`;

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    renderPlayer();
  });
  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    renderDeclined();
  });
}

function renderPlayer() {
  // PLACEHOLDER: sostituire l'url con quello reale della playlist SoundCloud
  embedContainer.innerHTML = `
    <iframe
      title="Playlist SoundCloud"
      width="100%"
      height="400"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2FPLACEHOLDER%2Fsets%2Fplaylist-placeholder&color=%23ff3d81&auto_play=false&show_user=true">
    </iframe>`;
}

function renderDeclined() {
  embedContainer.innerHTML = `
    <div class="cookie-gate">
      <p class="cookie-gate__text">
        Player disattivato: per l'ascolto è necessario accettare i cookie.
      </p>
      <div class="cookie-gate__actions">
        <button id="cookie-rethink" class="cookie-btn">Cambia idea</button>
      </div>
    </div>`;

  document.getElementById('cookie-rethink').addEventListener('click', renderGate);
}

function renderPlayerState() {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'accepted') renderPlayer();
  else if (consent === 'declined') renderDeclined();
  else renderGate();
}

renderPlayerState();
