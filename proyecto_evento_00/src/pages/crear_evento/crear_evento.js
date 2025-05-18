import { navegation } from "../../components/navbar/navbar.js";
import { save, update } from "../../db/connect.js";

function main() {
  const productoras = document.querySelectorAll(".selectProductora");
  const btnSave = document.querySelector('#btnSave')

  productoras.forEach((productora) => {
    productora.addEventListener("click", (event) => {
      productoras.forEach((productora) => (productora.style.opacity = 0.5));

      productora.style.opacity = 1;

      const product = {
        name: productora.querySelector("h5").innerText,
      };

      save({
        nameData: "productora",
        data: product,
      });

      const div = document.createElement("div");
      div.innerHTML = `
        <div>
          <div>
            <h2 style="color:#555555c2; margin-bottom: 2rem;">
              Productora Seleccionada:
            </h2>
            <p class="card">${product.name}</p>
          </div>
          <div>
            <div class="card-container">
              <div class="card w-f fecha_evento" onclick="event.target.classList.add('active')">
                <span>Ingresa Inicio de Evento</span>
                <div class="event-date" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.5); display: none;"> 
                  <label for="startDate">Fecha de Inicio:</label>
                  <input type="date" id="startDate" />
                  <input type="time" id="startTime" />
                  <input type="checkbox" id="startCheckbox" />
                  <button id="startButton">Ingresar</button>
                </div>
              </div>

               <div class="card w-f fecha_evento" onclick="event.target.classList.add('active')">
                <span>Ingresa Inicio de Evento</span>
                <div class="event-date form-container" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.5); display: none;"> 
                  <h5>Fecha de Termino:</h5>
                  <div class="form-group">
                    <input type="date" id="endTimeDate" />
                  </div>
                  <div class="form-group">
                    <input type="time" id="endTimeHora" />
                  </div>   
                  <div class="form-group">

                    <button class="btn" id="endEvent">Ingresar</button>
                  </div>
                </div>
              </div>
               
              </div>
            </div>
          </div>
        </div>
      `;

      const eventoActual = document.querySelector("#evento_actual");
      eventoActual.innerHTML = "";
      eventoActual.appendChild(div);
      const endEvent = document.querySelector("#endEvent");
      const startButton = document.querySelector("#startButton");

      startButton.addEventListener("click", (e) => {
        e.preventDefault();
        const startDate = document.querySelector("#startDate").value;
        const startTime = document.querySelector("#startTime").value;
        const startCheckbox = document.querySelector("#startCheckbox").checked;

        const startEvent = {
          startDate: startDate,
          startTime: startTime,
          startCheckbox: startCheckbox,
        };

        update({
          nameData: "productora",
          data: startEvent,
        });

        document.querySelectorAll(".fecha_evento").forEach((card) => {
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            card.innerHTML = `
              <span>Evento Iniciado</span>
              <div class="event-date">
                <h5>Fecha de Inicio:</h5>
                <p>${startDate}</p>
                <p>${startTime}</p>
                
              </div>
            `;
          }
        });
      });

      endEvent.addEventListener("click", (e) => {
        e.preventDefault();
        const endTimeDate = document.querySelector("#endTimeDate").value;
        const endTimeHora = document.querySelector("#endTimeHora").value;

        const endEvent = {
          endTimeDate: endTimeDate,
          endTimeHora: endTimeHora,
        };

        update({
          nameData: "productora",
          data: endEvent,
        });

        document.querySelectorAll(".fecha_evento").forEach((card) => {
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            card.innerHTML = `
              <span>Evento Terminado</span>
              <div class="event-date">
                <h5>Fecha de Termino:</h5>
                <p>${endTimeDate}</p>
                <p>${endTimeHora}</p>
              </div>
            `;
          }
        });
      });
    });
  });


  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    const db = localStorage.getItem("db");
    const generalDB = JSON.parse(db);
    generalDB.eventos.evento_actual = JSON.parse(
      localStorage.getItem("productora")
    );

    localStorage.setItem("db", JSON.stringify(generalDB));
    alert("Evento guardado");

    navegation("../../../../../../index.html");
  });
}

main();
