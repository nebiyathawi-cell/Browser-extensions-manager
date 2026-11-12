# Front-end Style Guide

## Layout

The designs were created to the following widths:

- **Mobile**: 375px
- **Desktop**: 1440px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Colors

### Neutral

- **Neutral 900**: `hsl(227, 75%, 14%)`
- **Neutral 800**: `hsl(226, 25%, 17%)`
- **Neutral 700**: `hsl(225, 23%, 24%)`
- **Neutral 600**: `hsl(226, 11%, 37%)`
- **Neutral 300**: `hsl(0, 0%, 78%)`
- **Neutral 200**: `hsl(217, 61%, 90%)`
- **Neutral 100**: `hsl(0, 0%, 93%)`
- **Neutral 0**: `hsl(200, 60%, 99%)`

### Red

- **Red 400**: `hsl(3, 86%, 64%)`
- **Red 500**: `hsl(3, 71%, 56%)`
- **Red 700**: `hsl(3, 77%, 44%)`

### Gradient

- **Light Gradient**: `linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)`
- **Dark Gradient**: `linear-gradient(180deg, #040918 0%, #091540 100%)`

## Typography

### Body Copy

- **Font size (paragraph)**: 16px

### Font

- **Family**: [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans)
- **Weights**: 400, 500, 700

> 💎 [Upgrade to Pro](https://www.frontendmentor.io/pro?ref=style-guide) for design file access to see all design details and get hands-on experience using a professional workflow with tools like Figma. The design file for this challenge also includes a design system and tablet layout to help you build a more accurate solution faster.

const extensions = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

const list = document.getElementById("extensions-List");
const filterButtons = document.querySelectorAll(".filter-btn");


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

              <span class="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-red-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500"></span>

              <span class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>

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

  render();
});


list.addEventListener("change", (event) => {
  const toggleButton = event.target;

  if (!toggleButton.matches(".toggle-btn")) return;

  const index = Number(toggleButton.dataset.index);

  extensions[index].isActive = toggleButton.checked;

  render();
});


render();

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
