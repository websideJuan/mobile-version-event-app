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

  document.head.querySelector("title").textContent =
    document.head.querySelector("title").textContent.split(":")[0] +
    " : " +
    res.eventos.evento_actual.name;

  view({ div, res });

  document.body.appendChild(div);
}

// This function generates the HTML content for the event view
function view({ div, res }) {
  const diaInicio = res.eventos.evento_actual.startDate.split("-")[2];
  const diaTermino = res.eventos.evento_actual.endTimeDate.split("-")[2];
  const totalDias = diaTermino - diaInicio;
  const diaActual = new Date().getDate().toString();

  


  div.innerHTML = `
    <div style="background-color: white; padding: 1rem; margin-bottom: 2rem; border: 1px solid #cccccc8a; position: relative; display: flex; flex-direction: column; align-items: center;">    
    <img src=${
      res.eventos.evento_actual.image
    } style="width: 150px; border-radius: 999px;" />
        <div class="card" style="position: absolute; bottom: -10%; gap: 1rem; padding: .8rem 1.5rem; display: flex; flex-direction: row; align-items: center">
          <p><i class="fa-solid fa-circle" style="color: yellowgreen;"></i></p>
          <a href="../evento/evento.html" >  
            ${res.eventos.evento_actual.name}
          </a>
          <button id="btnOptions" style="width: 30px; height: 30px; color: #555555c2; background-color: transparent; border: none; cursor: pointer;">
          <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
    </div> 

    <div class="">
        <div>
            <h2 style="color:#555555c2; margin-bottom: 1rem;">
              Dias de Evento
            </h2>

            <div class="card-container" style="overflow-x: auto; scrollbar-width: none; padding: 0 2rem;">
              ${res.eventos.evento_actual.moreInfo
                .map((calendario) => {
                  return `
                    <div data-id="${calendario.dia}" class="diasDeEvento" style=" border: 1px solid #cccccc8a; border-top: none; border-radius: 10px; ">
                      <div  class="card" style="padding: .3rem 1rem; text-align: center;">
                        ${createDeyOfWeek(calendario.dia)}
                      </div>
                      <div style=" display: flex; flex-direction: column; align-items: center; gap: 5px; padding: .5rem 1.2rem;">
                        <div style=" font-size:1.5em; font-weight: 600; color:rgba(85, 85, 85, 0.55);">
                          ${calendario.dia}
                        </div>
                      </div>
                    </div>
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

  const btnOptions = div.querySelector("#btnOptions");

  btnOptions.addEventListener("click", () => changeOption());


  const diasElement = div.querySelectorAll(".card-container div[data-id]");
  const cardHoras = div.querySelector(".card-horas");
  const data = res.eventos.evento_actual.moreInfo;

  diasElement.forEach((dia, i) => {
    const arrdias = [...diasElement].map((element) => element.getAttribute("data-id"));

    if (!arrdias.includes(diaActual) ) {
      diasElement[0].classList.add("active");

      const infoActual = data.find((info) => info.dia == diasElement[0].dataset.id);

      cardHoras.innerHTML = `
        <div id="horas-${i}" style="margin-bottom: 1rem;">
          <i class="fa-solid fa-clock"></i>
          <span>${infoActual.info}</span>
          <br>
        </div>
      `;
    }

    if (dia.dataset.id == diaActual) {
      dia.classList.add("active"); 

      const infoActual = data.find((info) => info.dia == diaActual);

      
      cardHoras.innerHTML = `
      <div id="horas-${i}" style="margin-bottom: 1rem;">
        <i class="fa-solid fa-clock"></i>
        <span>${infoActual.info}</span> <br>
        <i class="fa-solid fa-truck"></i>
        <span>Cantidad de gruas: ${infoActual.gruas}</span>
        <br>
        <i class="fa-solid fa-user"></i>
        <span>Operario: ${infoActual.operario ? infoActual.operario : 'Aldo'}</span>
        <br>
      </div>
    `;
    }

    dia.addEventListener("click", (event) => {
      diasElement.forEach((element) => element.classList.remove("active"));
      dia.classList.add("active");

      const id = event.target.getAttribute("data-id");
      
      console.log("id", id);
      
      
      const moreInfo = data.find((info) => info.dia == id);

      cardHoras.innerHTML = `
          <div id="horas-${i}">
            <i class="fa-solid fa-clock"></i>
            <span>${moreInfo.info}</span>
    
            <br>
            <i class="fa-solid fa-truck"></i>
            <span>Cantidad de gruas: ${moreInfo.gruas}</span>
            <br>
            <i class="fa-solid fa-user"></i>
            <span>Operario: ${moreInfo.operario ? moreInfo.operario : 'Aldo'}</span>
            <br>
          </div>
        `;
    });
  });
}

function createDeyOfWeek(date) {
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayOfString = `2025-${new Date().getMonth() + 1}-${date}`; // Formato de fecha YYYY-MM-DD
  const day = new Date(dayOfString).getDay(); // 

  return daysOfWeek[day]; // Devuelve el nombre del día de la semana
}



function changeOption() {
  const passAdmin = "1234"; // Contraseña de administrador
  console.log("Change option clicked");

  const res = prompt("¿Desea eliminar el evento actual? (si/no)");

  if (res === null || res === "") {
    console.log("No se ingreso ninguna opcion");
    return;
  }

  if (res === 'si') {
    const pass = prompt('Ingrese la contraseña para continuar:')
    if (pass === passAdmin) {
      console.log("Contraseña correcta, eliminando evento actual...");
      const db = JSON.parse(localStorage.getItem("db"));
      db.eventos.evento_actual = null; // Eliminar el evento actual
      localStorage.setItem("db", JSON.stringify(db)); // Guardar los cambios en el localStorage
      alert("Evento actual eliminado correctamente.");
      window.location.href = "/"; // Redirigir a la página de creación de eventos
    } else {
      console.log("Contraseña incorrecta, no se puede eliminar el evento actual.");
      alert("Contraseña incorrecta, no se puede eliminar el evento actual.");
      return;
    }
  }
  
  
}

window.addEventListener("DOMContentLoaded", main);
