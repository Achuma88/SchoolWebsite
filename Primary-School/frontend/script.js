document.addEventListener("DOMContentLoaded", () => {
  loadGrades();
  showList();
});

/* ===============================
   GRADES & PHASES
================================ */

function loadGrades() {
  fetch("http://localhost:5000/api/classes")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(classes => renderGrades(classes))
    .catch(error => {
      console.error("Error fetching classes:", error);
    });
}

function renderGrades(classes) {
  const list = document.getElementById("classes");
  list.innerHTML = "";

  const phases = {};

  // Group by phase
  classes.forEach(grade => {
    if (!phases[grade.phase]) {
      phases[grade.phase] = [];
    }
    phases[grade.phase].push(grade);
  });

  Object.keys(phases).forEach(phaseName => {
    const phaseItem = document.createElement("li");
    phaseItem.className = "phase-block";

    const heading = document.createElement("h3");
    heading.className = "phase-title";
    heading.textContent = phaseName;

    phaseItem.appendChild(heading);

    phases[phaseName].forEach(grade => {
      const gradeCard = document.createElement("div");
      gradeCard.className = "grade-card";

      gradeCard.innerHTML = `
        <h4 class="grade-title">${grade.name}</h4>
        <ul class="teachers">
          ${grade.teachers.map(t => `<li>${t}</li>`).join("")}
        </ul>
      `;

      phaseItem.appendChild(gradeCard);
    });

    list.appendChild(phaseItem);
  });
}

/* ===============================
   EVENTS
================================ */

const events = [
  {
    date: "2026-01-15",
    title: "School Reopens",
    description: "First day of the 2026 academic year"
  },
  {
    date: "2026-03-20",
    title: "Athletics Day",
    description: "Inter-house athletics competition"
  },
  {
    date: "2026-06-16",
    title: "Youth Day Celebration",
    description: "Cultural and sports activities"
  }
];

const eventList = document.getElementById("eventList");
const calendar = document.getElementById("calendar");

function showList() {
  calendar.classList.add("hidden");
  eventList.classList.remove("hidden");
  renderList();
}

function showCalendar() {
  eventList.classList.add("hidden");
  calendar.classList.remove("hidden");
  renderCalendar();
}

function renderList() {
  eventList.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-date">${event.date}</div>
      <strong>${event.title}</strong>
      <p>${event.description}</p>
    `;

    eventList.appendChild(card);
  });
}

function renderCalendar() {
  calendar.innerHTML = `<div class="calendar-grid"></div>`;
  const grid = calendar.querySelector(".calendar-grid");

  for (let day = 1; day <= 30; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.innerHTML = `<strong>${day}</strong>`;

    events.forEach(event => {
      if (new Date(event.date).getDate() === day) {
        cell.classList.add("event");
        cell.innerHTML += `<div>${event.title}</div>`;
      }
    });

    grid.appendChild(cell);
  }
}

/* ===============================
   IMAGE SLIDER LOOP
================================ */

document.querySelectorAll(".image-slider").forEach(slider => {
  const slides = slider.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000); // Change every 3 seconds
});
