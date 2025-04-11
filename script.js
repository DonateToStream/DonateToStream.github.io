// List of pastes you’ll add in the "pastes" folder
const pastes = [
  { title: "Drummond", file: "pastes/drummond.txt", date: "2025-04-10" },
  { title: "Harbottle", file: "pastes/harbottle.txt", date: "2025-04-10" },
  { title: "Anderson", file: "pastes/anderson.txt", date: "2025-04-11" },
];

const listEl = document.getElementById("paste-list");
const viewEl = document.getElementById("paste-view");
const titleEl = document.getElementById("paste-title");
const contentEl = document.getElementById("paste-content");
const searchInput = document.getElementById("search");

function renderList(filter = "") {
  listEl.innerHTML = "";
  pastes
    .filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(p => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = `${p.title} (${p.date})`;
      a.onclick = (e) => {
        e.preventDefault();
        loadPaste(p.title, p.file);
      };
      li.appendChild(a);
      listEl.appendChild(li);
    });
}

function loadPaste(title, file) {
  fetch(file)
    .then(res => res.text())
    .then(text => {
      listEl.style.display = "none";
      viewEl.classList.remove("hidden");
      titleEl.textContent = title;
      contentEl.textContent = text;
    });
}

function goBack() {
  viewEl.classList.add("hidden");
  listEl.style.display = "block";
  renderList(searchInput.value);
}

searchInput.addEventListener("input", () => {
  renderList(searchInput.value);
});


const music = document.getElementById("bg-music");
const popup = document.getElementById("music-popup");

function playMusic() {
  music.play();
  popup.style.display = "none";
}

function hidePopup() {
  popup.style.display = "none";
}

// Init
renderList();
