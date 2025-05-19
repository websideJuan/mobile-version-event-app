import { connect } from "../../db/connect.js";

// This function is called when the DOM is fully loaded
async function main() {
  const res = await connect();
  const div = document.createElement("div");

  view({ div, res });

  document.body.appendChild(div);
}

// This function generates the HTML content for the event view
function view({ div, res }) {
  const diaInicio = res.eventos.evento_actual.startDate.split("-")[2];
  const diaTermino = res.eventos.evento_actual.endTimeDate.split("-")[2];
  const totalDias = diaTermino - diaInicio;

  const dias = [];
  const horas = [];

  for (let i = 0; i <= totalDias; i++) {
    const planificacion = {
      dia : parseInt(diaInicio) + i,
      montaje: 23 - diaInicio,
      desmontaje: diaTermino - 23,
    }
    
    console.log(planificacion);
    
    dias.push(planificacion);
  }

  for (let i = 0; i < 24; i++) {
    const hora = i < 10 ? `0${i}:00` : `${i}:00`;
    horas.push(hora);
  }

  div.innerHTML += `
    <div style="background-color: white; padding: 1rem; margin-bottom: 2rem; border: 1px solid #cccccc8a;">    
        <a href="/proyecto_evento_00/src/pages/evento/evento.html" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; position: relative;">  
          <img src=${
            res.eventos.evento_actual.image
          } style="width: 200px; border-radius: 999px;" />
          <p class="card" style="position: absolute; bottom: -35px; gap: 1rem; padding: .8rem 1.5rem; display: flex; align-items: center">
            <i class="fa-solid fa-circle" style="color: yellowgreen;"></i>
            ${res.eventos.evento_actual.name}

            <i class="fa-solid fa-ellipsis-vertical"></i>
          </p>
        </a>
    </div> 

    <div class="container">
        <div>
            <h2 style="color:#555555c2; margin-bottom: 1rem;">
              Dias de Evento
            </h2>

            <p class="card-container" style="overflow-x: scroll; padding: .5rem; ">
              ${dias
                .map((dia) => {
                  return `<span data-id="${dia.dia}" class="card" style="display: flex; flex-direction: column; align-items: center; gap: 5px; padding: .5rem 1.2rem;">
                          <i class="fa-solid fa-calendar-days"></i>
                          <span">
                            ${dia.dia}
                          </span>
                        </span>`;
                })
                .join("")} 
            </p>
        </div>
    </div>  

    <div>
      <div class="card-horas" style="background-color: white; color:#555555c2; padding: 2rem; max-height: 50dvh; overflow-y: scroll; border-top-left-radius: 20px; border-top-right-radius: 20px;">
        ${horas
          .map((hora) => {
            return `<div  style="margin-bottom: 1rem;">
                      <span>${hora}</span>
                      <hr>
                    </div>`;
          })
          .join("")}
      </div>
    </div>
  `;

  const diasElement = div.querySelectorAll(".card-container span[data-id]");
  const cardHoras = div.querySelector('.card-horas');

  diasElement[0].classList.add("active");


  diasElement.forEach((dia) => {
    
    dia.addEventListener("click", (event) => {
      diasElement.forEach((element) => element.classList.remove("active"));
      dia.classList.add('active');
    });
    
    
  });
  
}

window.addEventListener("DOMContentLoaded", main);
