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

  
  // Check if the current event is not null
  if (data.eventos.evento_actual !== null) {
    eventoActual.style.display = "block";
    eventoActual.innerHTML = `
      <h2 style="color:#555555c2; margin-bottom: 2rem;">
        Evento Actual:
      </h2>
      <p class="card" style="overflow-x: scroll;">${JSON.stringify(data.eventos.evento_actual)}</p>
    `;
  }

  const operarioCompleto = data.operarios
    .filter((operario) => operario.id == 1)
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

