// script.js – wersja z 2025-06-21 (pełna, sprawdzona)

let currentLang = localStorage.getItem('owl_lang') || 'en';
let registerMode = false;

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('owl_lang', lang);

  fetch(`languages/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("lbl_today").textContent = data.lbl_today;
      document.getElementById("desc_today").textContent = data.desc_today;
      document.getElementById("lbl_lesson").textContent = data.lbl_lesson;
      document.getElementById("desc_lesson").textContent = data.desc_lesson;
      document.getElementById("lbl_kanban").textContent = data.lbl_kanban;
      document.getElementById("desc_kanban").textContent = data.desc_kanban;
      document.getElementById("lbl_tracker").textContent = data.lbl_tracker;
      document.getElementById("desc_tracker").textContent = data.desc_tracker;
      document.getElementById("startBtn").textContent = data.btn_start;
      document.getElementById("loginBtn").textContent = registerMode ? data.register : data.login;
      document.getElementById("switchMode").textContent = registerMode ? data.login : data.register;
    })
    .catch((error) => console.error("Błąd ładowania pliku językowego:", error));
}

function toggleRegister() {
  registerMode = !registerMode;
  setLanguage(currentLang); // przeładuj przyciski zgodnie z trybem
}

function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  if (email && pass) {
    document.getElementById('login').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('login').style.display = 'none';
      const dash = document.getElementById('dashboard');
      dash.classList.remove('hidden');
      dash.classList.add('show');
    }, 800);
  } else {
    alert('Enter credentials');
  }
}

function loginGoogle() {
  alert('Google login placeholder');
}

function startDay() {
  const today = new Date().toLocaleDateString(currentLang);
  alert(`Starting your day: ${today}`);
  localStorage.setItem('owl_last_started', today);
}

document.addEventListener("DOMContentLoaded", function () {
  setLanguage(currentLang);

  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    const loginPanel = document.getElementById('login');
    loginPanel.classList.remove('hidden');
    setTimeout(() => loginPanel.classList.add('show'), 50);
  }, 3000);
});
