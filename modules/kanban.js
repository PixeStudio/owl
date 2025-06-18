let draggedCard = null;
let editTargetCard = null;
let kanbanData = {};

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  renderBoard();
  twemoji.parse(document.body);
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedCard = ev.target;
}

function drop(ev) {
  ev.preventDefault();
  const column = ev.currentTarget;
  column.appendChild(draggedCard);
  saveToStorage();
}

function createNewCard(columnId) {
  // nie tworzymy jeszcze karty – otwieramy modal
  editTargetCard = null;
  document.getElementById("task-title").value = "";
  document.getElementById("task-details").value = "";
  document.getElementById("task-modal").dataset.column = columnId;
  document.getElementById("task-modal").classList.remove("hidden");
}

function openModal(card) {
  editTargetCard = card;
  document.getElementById("task-title").value = card.textContent;
  document.getElementById("task-details").value = card.dataset.details || "";
  document.getElementById("task-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("task-modal").classList.add("hidden");
  editTargetCard = null;
}

function saveTask() {
  const title = document.getElementById("task-title").value;
  const details = document.getElementById("task-details").value;

  if (!title.trim()) return;

  if (editTargetCard) {
    editTargetCard.textContent = title;
    editTargetCard.dataset.details = details;
  } else {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = title;
    card.dataset.details = details;
    card.draggable = true;
    card.addEventListener("dragstart", drag);
    card.addEventListener("click", () => openModal(card));

    const columnId = document.getElementById("task-modal").dataset.column;
    const container = document.querySelector(`#${columnId} .card-container`);
    container.appendChild(card);
  }

  closeModal();
  saveToStorage();
  twemoji.parse(document.body);
}

function goBack() {
  window.location.href = "dashboard.html";
}

// ------------------ Local Storage -------------------

function saveToStorage() {
  kanbanData = {};
  document.querySelectorAll(".column").forEach(col => {
    const id = col.id;
    const cards = Array.from(col.querySelectorAll(".card")).map(card => ({
      text: card.textContent,
      details: card.dataset.details || ""
    }));
    kanbanData[id] = cards;
  });
  localStorage.setItem("owl-kanban", JSON.stringify(kanbanData));
}

function loadFromStorage() {
  const raw = localStorage.getItem("owl-kanban");
  if (raw) kanbanData = JSON.parse(raw);
}

function renderBoard() {
  for (const colId of ["todo", "inprogress", "done"]) {
    const container = document.querySelector(`#${colId} .card-container`);
    container.innerHTML = "";
    const cards = kanbanData[colId] || [];
    cards.forEach(data => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = data.text;
      card.dataset.details = data.details || "";
      card.draggable = true;
      card.addEventListener("dragstart", drag);
      card.addEventListener("click", () => openModal(card));
      container.appendChild(card);
    });
  }
}
