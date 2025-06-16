 const translations = {
      en: {
        login: "Login",
        register: "Register",
        start_day: "Start your day",
        today: "Today",
        goal_desc: "Your goals and rituals",
        language_lesson: "Language Lesson",
        lesson_desc: "Polish ⇄ German",
        kanban: "Kanban",
        kanban_desc: "Tasks progress overview",
        habit_tracker: "Habit Tracker",
        tracker_desc: "Track your routines"
      },
      pl: {
        login: "Zaloguj się",
        register: "Zarejestruj się",
        start_day: "Rozpocznij dzień",
        today: "Dzień dzisiejszy",
        goal_desc: "Twoje cele i rytuały",
        language_lesson: "Lekcja językowa",
        lesson_desc: "Polski ⇄ Niemiecki",
        kanban: "Kanban: Twoje zadania",
        kanban_desc: "Postęp zadań",
        habit_tracker: "Tracker nawyków",
        tracker_desc: "Śledź swoje nawyki"
      },
      de: {
        login: "Anmelden",
        register: "Registrieren",
        start_day: "Tag starten",
        today: "Heute",
        goal_desc: "Deine Ziele und Rituale",
        language_lesson: "Sprachlektion",
        lesson_desc: "Polnisch ⇄ Deutsch",
        kanban: "Kanban-Board",
        kanban_desc: "Aufgabenfortschritt",
        habit_tracker: "Gewohnheitstracker",
        tracker_desc: "Verfolge deine Routinen"
      }
    };

    let currentLang = localStorage.getItem('owl_lang') || 'en';
    let registerMode = false;

    function setLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('owl_lang', lang);
      const t = translations[lang];
      document.getElementById('loginBtn').textContent = t.login;
      document.getElementById('switchMode').textContent = t.register;
      document.getElementById('startBtn').textContent = t.start_day;
      document.getElementById('lbl_today').textContent = t.today;
      document.getElementById('lbl_lesson').textContent = t.language_lesson;
      document.getElementById('lbl_kanban').textContent = t.kanban;
      document.getElementById('lbl_tracker').textContent = t.habit_tracker;
      document.getElementById('desc_today').textContent = t.goal_desc;
      document.getElementById('desc_lesson').textContent = t.lesson_desc;
      document.getElementById('desc_kanban').textContent = t.kanban_desc;
      document.getElementById('desc_tracker').textContent = t.tracker_desc;
    }

    function toggleRegister() {
      registerMode = !registerMode;
      const btn = document.getElementById('switchMode');
      btn.textContent = registerMode ? translations[currentLang].login : translations[currentLang].register;
      document.getElementById('loginBtn').textContent = registerMode ? translations[currentLang].register : translations[currentLang].login;
    }

    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      const loginPanel = document.getElementById('login');
      loginPanel.classList.remove('hidden');
      setTimeout(() => loginPanel.classList.add('show'), 50);
      setLanguage(currentLang);
    }, 3000);

    function login() {
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      if (email && pass) {
        document.getElementById('login').classList.add('fade-out');
        setTimeout(() => {
          document.getElementById('login').style.display = 'none';
          const dash = document.getElementById('dashboard');
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