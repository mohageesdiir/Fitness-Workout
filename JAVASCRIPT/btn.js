// section browse form
const formBrowse = document.querySelector("#all-target");
const muscleSelect = document.querySelector("#muscle");
const daySelect = document.querySelector("#day");

// Load DOM for browse
document.addEventListener("DOMContentLoaded", () => {
  const saved = getBrowseData() || {}; // {} if null
  if (saved.muscle && muscleSelect) muscleSelect.value = saved.muscle;
  if (saved.day && daySelect) daySelect.value = saved.day;
});

// 2. Add event listener
formBrowse.addEventListener("change", async () => {
  const selectedMuscle = muscleSelect ? muscleSelect.value : "";
  const selectedDay = daySelect ? daySelect.value : "";

  // Save selected muscle
  saveBrowseData({ muscle: selectedMuscle, day: selectedDay });

  // Fetch API
  const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${selectedMuscle}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6b58370b37msh583979df4caebe2p13c4b2jsn7c46235268fc",
      "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// Populate select options
const muscles = [
  "biceps",
  "chest",
  "back",
  "shoulders",
  "legs",
  "abs",
  "triceps",
];

muscles.forEach((muscle) => {
  const option = document.createElement("option");
  option.value = muscle;
  option.textContent = muscle.charAt(0).toUpperCase() + muscle.slice(1);
  muscleSelect.appendChild(option);
});

// Save to localStorage (store an object)
function saveBrowseData(obj) {
  localStorage.setItem("all-target", JSON.stringify(obj));
}

// Get from localStorage (returns object or null)
function getBrowseData() {
  try {
    return JSON.parse(localStorage.getItem("all-target"));
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const sections = {
    "barbell-btn": "barbell-curl",
    "incline-btn": "incline",
    "tricep-btn": "tricep",
    "shoulder-btn": "shoulder",
    "squat-btn": "squats",
  };

  function showSection(id) {
    Object.values(sections).forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) el.style.display = "none";
    });

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.style.display = "block";
      localStorage.setItem("activeSection", id); // Save to localStorage
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = sections[btn.id];
      showSection(targetId);
    });
  });

  // Load saved section on page reload
  const savedSection = localStorage.getItem("activeSection");
  if (savedSection) {
    showSection(savedSection);
  }
});

// Setup all carousels on the page
function setupCarousel(carouselId, leftBtnId, rightBtnId) {
  const carousel = document.querySelector(carouselId);
  const slides = carousel.querySelectorAll(".slide");

  const btnLeft = document.querySelector(leftBtnId);
  const btnRight = document.querySelector(rightBtnId);

  let index = 0;

  // Move carousel
  function update() {
    carousel.style.transform = `translateX(-${index * 100}%)`;

    btnLeft.disabled = index === 0;
    btnRight.disabled = index === slides.length - 1;
  }

  // Buttons
  btnLeft.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  btnRight.addEventListener("click", () => {
    if (index < slides.length - 1) {
      index++;
      update();
    }
  });

  update(); // initial
}
