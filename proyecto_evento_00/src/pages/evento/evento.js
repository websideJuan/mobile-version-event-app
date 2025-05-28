import { connect } from "../../db/connect.js";

// This function is called when the DOM is fully loaded
async function main() {
  const res = await connect();
  const div = document.createElement("div");

  if (res.eventos.evento_actual === null) {
    div.innerHTML = `
      <div class="container" style="mrgin-top: 2rem;">
        <div class="card">
          <h2 style="color: #555555c2; margin-bottom: 2rem">
            No hay eventos creados
          </h2>

          <a class="btn" style="color: white; font-weight: 600;" href="/proyecto_evento_00/src/pages/crear_evento/crear_evento.html" >
            Crear Evento
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    return;
  }
  view({ div, res });

  document.body.appendChild(div);
}

// This function generates the HTML content for the event view
function view({ div, res }) {
  const diaInicio = res.eventos.evento_actual.startDate.split("-")[2];
  const diaTermino = res.eventos.evento_actual.endTimeDate.split("-")[2];
  const totalDias = diaTermino - diaInicio;
  const diaActual = new Date().getDate().toString();

  const dias = {};

  document.head.querySelector("title").textContent =
    document.head.querySelector("title").textContent.split(":")[0] +
    " : " +
    res.eventos.evento_actual.name;

  for (let i = 0; i <= totalDias; i++) {
    dias[parseInt(diaInicio) + i] = {
      dia: parseInt(diaInicio) + i,
      montaje: 23 - diaInicio,
      desmontaje: diaTermino - 23,
    };
  }

  div.innerHTML += `
    <div style="background-color: white; padding: 1rem; margin-bottom: 2rem; border: 1px solid #cccccc8a; position: relative; display: flex; flex-direction: column; align-items: center;">    
    <img src=${
      res.eventos.evento_actual.image
    } style="width: 150px; border-radius: 999px;" />
        <p class="card" style="position: absolute; bottom: -10%; gap: 1rem; padding: .8rem 1.5rem; display: flex; align-items: center">
          <i class="fa-solid fa-circle" style="color: yellowgreen;"></i>
          <a href="../evento/evento.html" >  
            ${res.eventos.evento_actual.name}
          </a>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </p>
    </div> 

    <div class="container">
        <div>
            <h2 style="color:#555555c2; margin-bottom: 1rem;">
              Dias de Evento
            </h2>

            <div class="card-container" style="overflow-x: scroll">
              ${Object.values(dias)
                .map((dia) => {
                  return `
                  <a href="#" style="text-decoration: none; color: inherit;">
                    <div data-id="${dia.dia}" class="card" style="display: flex; flex-direction: column; align-items: center; gap: 5px; padding: .5rem 1.2rem;">
                      <i class="fa-solid fa-calendar-days"></i>
                      <span style="font-size="1.5em" font-weight: 600; color:rgba(85, 85, 85, 0.55);">
                        ${dia.dia}
                      </span>
                    </div>
                  </a>
                    `;
                })
                .join("")}
            </div>
        </div>
    </div>  

    <div class="container" style="margin-top: 2rem;">
      <div class="card-horas" style="background-color: white; color:#555555c2; padding: 2rem; max-height: 50dvh; overflow-y: scroll; border-radius: 20px; "></div>
    </div>
  `;

  const diasElement = div.querySelectorAll(".card-container div[data-id]");
  const cardHoras = div.querySelector(".card-horas");
  const data = res.eventos.evento_actual.moreInfo;

  diasElement.forEach((dia, i) => {
    const arrdias = [...diasElement].map((element) =>
      element.getAttribute("data-id")
    );

    if (!arrdias.includes(diaActual)) {
      diasElement[0].classList.add("active");
    }

    if (dia.dataset.id == diaActual) {
      dia.classList.add("active");

      const infoActual = data.find((info) => info.dia == diaActual);

      cardHoras.innerHTML += `
      <div id="horas-${i}" style="margin-bottom: 1rem;">
        <i class="fa-solid fa-clock"></i>
        <span>${infoActual.info}</span>
        <br>
      </div>
    `;
    }

    dia.addEventListener("click", (event) => {
      diasElement.forEach((element) => element.classList.remove("active"));
      dia.classList.add("active");

      const id = event.target.getAttribute("data-id");

      const moreInfo = data.find((info) => info.dia == id);

      if (moreInfo === undefined) {
        cardHoras.innerHTML = `
          <div id="horas-${i}" style="margin-bottom: 1rem;">
            <i class="fa-solid fa-clock"></i>
            <span>No hay mas informacion</span>
            <br>
          </div>
        `;
        return;
      } else {
        cardHoras.innerHTML = `
          <div id="horas-${i}">
            <i class="fa-solid fa-clock"></i>
            <span>${moreInfo.info}</span>
            <br>
          </div>
        `;
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", main);
