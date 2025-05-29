import { navegation } from "./src/components/navbar/navbar.js";
import { connect } from "./src/db/connect.js";
/*
  Initial code for a simple event management system.
*/

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the event management system
  Initialize();
});

async function Initialize() {
  // Initialize the event management system
  // Connect to the database
  const data = await connect();
  const links = document.querySelectorAll("a.navegation");
  const eventoActual = document.querySelector("#evento_actual");
  const containerBanner = document.querySelector("#containerBanner")

  // Check if the data is loaded
  data.eventos.eventos.forEach((evento) => {
    const card = document.createElement("div");

    card.style.position = "relative";
    card.style.marginBottom = "3rem";
    card.innerHTML = `
      <img src="${evento.imagen}" alt="${evento.nombre}" style="width: 100%; height: 300px; object-fit: cover;"/>
      <div class="card" style="background-color: white; position: absolute; left: 5%; right: 5%; bottom: -30px; background-color:  color: white; padding: 1rem;">
        <h3>${evento.nombre}</h3>
        <p>
          <i class="fa-solid fa-calendar-days"></i> ${evento.fecha} - ${evento.hora}
        </p>
        <span>
          <i class="fa-solid fa-location-dot"></i> ${evento.lugar}
        </span>
        <a href="./src/pages/evento/evento.html" class="navegation">Ver Evento</a>
      </div>
    `;
    containerBanner.appendChild(card);
  });


  // Check if the current event is not null
  if (data.eventos.evento_actual !== null) {
    eventoActual.style.display = "block";
    eventoActual.innerHTML = `
      <h2 style="color:#555555c2; margin-bottom: 2rem;">
        Evento Actual:
      </h2>
      <p class="card live_event" style="width: fit-content">
        <a style="display: initial;" href="./src/pages/evento/evento.html" class="navegation">${
          "<i class='fa-solid fa-circle' style='color: yellowgreen;'></i> " +
          data.eventos.evento_actual.name
        }</a>
      </p>
    `;
  }

  const operarioCompleto = data.operarios.filter((operario) => operario.id == 1)
    .map((operario) => {
      const maquinas = data.maquinas.filter(
        (maquina) => maquina.operarioId == operario.id
      );
      return {
        ...operario,
        maquina: maquinas.map((maquina) => ({
          id: maquina.id,
          nombre: maquina.nombre,
          createdAt: maquina.createdAt,
          updatedAt: maquina.updatedAt,
        })),
      };
    });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const path = event.target.getAttribute("href");
      navegation(path);
    });
  });

  console.log("Event Management System Initialized");
}
