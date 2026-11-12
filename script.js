const list = document.getElementById("extensions-List");
const filterButtons = document.querySelectorAll(".filter-btn");

let extensions = [];

async function loadExtensions() {
  const savedExtensions = localStorage.getItem("extensions");

  if (savedExtensions) {
    extensions = JSON.parse(savedExtensions);
  } else {
    const response = await fetch("./data.json");
    extensions = await response.json();
  }

  render();
}

function saveExtensions() {
  localStorage.setItem("extensions", JSON.stringify(extensions));
}

let currentFilter = "all";

function render() {
  const visibleExtensions = extensions
    .map((extension, index) => ({
      extension,
      index,
    }))
    .filter(({ extension }) => {
      if (currentFilter === "all") return true;

      return String(extension.isActive) === currentFilter;
    });

  list.innerHTML = visibleExtensions
    .map(
      ({ extension, index }) => `
<li class="flex flex-col justify-between gap-6 rounded-xl border border-gray-300 bg-white p-5 shadow-sm transition 
hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-[#1f2535]">
<div class="flex items-start gap-4">
            <img
              src="${extension.logo}"
              alt=""
              class="h-12 w-12 shrink-0 object-contain"
            />

            <div class="min-w-0">
             <h2 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            ${extension.name}
              </h2>
              <p class="text-sm leading-relaxed text-gray-500 dark:text-slate-300">
              ${extension.description}
               </p>
            </div>
          </div>

          <div class="flex items-center justify-between">

           
<button
  class="remove-btn rounded-full border border-gray-400 px-4 py-2
  text-sm font-medium text-gray-900
  transition-all duration-200
  hover:border-[#f25c54]
  hover:bg-[#f25c54]
  hover:text-white
  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-[#f25c54]
  dark:border-slate-600
  dark:text-white"
  data-index="${index}"
>
  Remove
</button>


            <label class="relative inline-flex cursor-pointer items-center">

              <input
                type="checkbox"
                class="peer sr-only toggle-btn"
                data-index="${index}"
                ${extension.isActive ? "checked" : ""}
              />

              <span class="h-6 w-11 rounded-full bg-gray-300 
              transition peer-checked:bg-red-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500"></span>

              <span class="absolute left-1 top-1 h-4 w-4
               rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>

            </label>

          </div>
        </li>
      `,
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.active;

    filterButtons.forEach((btn) => {
      const isSelected = btn === button;

      btn.classList.toggle("bg-red-600", isSelected);
      btn.classList.toggle("dark:bg-red-600", isSelected);

      btn.classList.toggle("text-white", isSelected);

      btn.classList.toggle("bg-white", !isSelected);
      btn.classList.toggle("dark:bg-slate-800", !isSelected);

      btn.classList.toggle("dark:text-white", !isSelected);
    });

    render();
  });
});

list.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-btn");

  if (!removeButton) return;

  const index = Number(removeButton.dataset.index);

  extensions.splice(index, 1);
  saveExtensions();

  render();
});

list.addEventListener("change", (event) => {
  const toggleButton = event.target;

  if (!toggleButton.matches(".toggle-btn")) return;

  const index = Number(toggleButton.dataset.index);

  extensions[index].isActive = toggleButton.checked;
  saveExtensions();

  render();
});

const themeToggle = document.getElementById("theme-toggle");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

let isDark = localStorage.getItem("theme") === "dark";

function applyTheme() {
  document.documentElement.classList.toggle("dark", isDark);

  moonIcon.classList.toggle("hidden", isDark);
  sunIcon.classList.toggle("hidden", !isDark);

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  applyTheme();
});

applyTheme();
loadExtensions();
