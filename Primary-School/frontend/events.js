fetch("http://localhost:5000/api/events")
  .then(res => res.json())
  .then(events => {

    console.log("EVENTS:", events); // 🔍 debug

    const container = document.getElementById("eventsContainer");

    if (!container) {
      console.error("Container not found!");
      return;
    }

    container.innerHTML = "";

    events.forEach(event => {

      container.innerHTML += `
        <div class="event-card">

          <img src="http://localhost:5000${event.image}" class="event-img">

          <h3>${event.title}</h3>
          <p>📅 ${event.date}</p>
          <p>${event.description}</p>

        </div>
      `;
    });

  })
  .catch(err => console.error("ERROR:", err));