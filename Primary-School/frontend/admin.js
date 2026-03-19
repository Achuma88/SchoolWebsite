async function loadNews() {
  try {

    const res = await fetch("http://localhost:5000/api/news");
    const news = await res.json();

    const container = document.getElementById("news-container");

    // Clear previous content
    container.innerHTML = "";

    news.forEach(post => {

      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.message}</p>
        <span>${post.date}</span>
      `;

      container.appendChild(card);

    });

  } catch (error) {
    console.error("Error loading news:", error);
  }
}

loadNews();
function addEvent(){

fetch("http://localhost:5000/api/events", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
title: document.getElementById("title").value,
description: document.getElementById("description").value,
date: document.getElementById("date").value
})
})
.then(res => res.json())
.then(data => alert("Event added!"));

}

