// List of pastes you’ll add in the "pastes" folder
const pastes = [
  { title: "Drummond", file: "pastes/drummond.txt" },
  { title: "Harbottle", file: "pastes/harbottle.txt" },
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
      a.textContent = p.title;
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

// Init
renderList();
