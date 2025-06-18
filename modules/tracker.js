let habits = [];

document.addEventListener("DOMContentLoaded", () => {
  loadHabits();
  renderHabits();
  twemoji.parse(document.body);
});

function loadHabits() {
  const stored = localStorage.getItem("owl-habits");
  habits = stored ? JSON.parse(stored) : [];
}

function saveHabits() {
  localStorage.setItem("owl-habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;
    checkbox.addEventListener("change", () => {
      habits[index].done = checkbox.checked;
      saveHabits();
    });

    const label = document.createElement("span");
    label.innerText = habit.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.style.background = "none";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "white";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  twemoji.parse(document.body);
}

function addHabit() {
  const input = document.getElementById("new-habit");
  const text = input.value.trim();
  if (text) {
    habits.push({ text, done: false });
    saveHabits();
    renderHabits();
    input.value = "";
  }
}

function goBack() {
  window.location.href = "dashboard.html";
}
