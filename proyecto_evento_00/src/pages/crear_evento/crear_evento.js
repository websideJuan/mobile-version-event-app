
import { navegation } from "../../components/navbar/navbar.js";
import { save, update } from "../../db/connect.js";

document.log = function () {
  console.log("Log function called");
};
function main() {
  const productoras = document.querySelectorAll(".selectProductora");
  const appContainer = document.querySelector("#appContainer");
  const btnSave = document.querySelector("#btnSave");
  btnSave.style.pointerEvents = "none";
  btnSave.style.opacity = 0.5;

  productoras.forEach((productora) => {
    productora.addEventListener("click", () => {
      productoras.forEach((productora) => (productora.style.opacity = 0.5));

      const product = {
        name: productora.querySelector("h5").innerText,
        image: productora.querySelector("img").src,
        moreInfo: []
      };

      save({
        nameData: "productora",
        data: product,
      });

      const div = document.createElement("div");

      div.innerHTML = `
         <div>
      <h2 style="color: #555555c2; margin-bottom: 2rem">
        Productora Seleccionada:
      </h2>
      <p class="card" style="display: flex; align-items: center">
        <img
          src="${product.image}"
          alt="Productora"
          style="
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 1rem;
          "
        />
        ${product.name}
      </p>
    </div>

    <div class="card-container">
      <div
        style="
          text-align: center;
          cursor: pointer;
          font-weight: 900;
          color: #3333335c;
        "
        class="card w-f fecha_evento"
        onclick="event.target.classList.add('active')"
      >
        <span>Inicio</span>
        <div
          class="event-date form-container"
          style="
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
          "
        >
          <div class="form-group">
            <input type="date" id="startDate" />
          </div>
          <div class="form-group">
            <input type="time" id="startTime" />
          </div>

          <div class="form-group">
            <button class="btn" id="startButton">Ingresar</button>
          </div>
        </div>
      </div>

      <div
        style="
          text-align: center;
          cursor: pointer;
          font-weight: 900;
          color: #3333335c;
        "
        hover="display: none;"
        class="card w-f fecha_evento"
        onclick="event.target.classList.add('active')"
      >
        <span>Final</span>
        <div
          class="event-date form-container"
          style="
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
          "
        >
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

        const startEvent = {
          startDate: startDate,
          startTime: startTime,
        };

        update({
          nameData: "productora",
          data: startEvent,
        });

        document.querySelectorAll(".fecha_evento").forEach((card) => {
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            card.innerHTML = `
              <div class="event-date">
                <span style="font-size: 2.5em; color: orangered;">Día</span>
                <p style="font-size: 2.8em;">${startDate.split("-")[2]}</p>
                <p style="font-weight: 100;">${startTime}</p>
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
          dias:
            endTimeDate.split("-")[2] -
            JSON.parse(localStorage.getItem("productora")).startDate.split(
              "-"
            )[2],
        };

        update({
          nameData: "productora",
          data: endEvent,
        });

        document.querySelectorAll(".fecha_evento").forEach((card) => {
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            card.innerHTML = `
              <div class="event-date" style="line-height: 1.5;">
                <span style="font-size: 2.5em; color: orangered;">Día</span>
                <p style="font-size: 2.8em;">${endTimeDate.split("-")[2]}</p>
                <p style="font-weight: 100;">${endTimeHora}</p>
              </div>
            `;
          }
        });

        
        appContainer.innerHTML = `
        <div class="card-container" style="overflow-x: scroll; padding: .5rem; flex-wrap: wrap;">
          ${Array.from(
            { length: endEvent.dias },
            (_, i) => {
              return `
              <div class="card w-f active" onclick="log()">
                <span">
                  Día
                </span>
                <p>${
                  parseInt(endTimeDate.split("-")[2]) + i
                }</p>
              </div>
              `;
            }
          ).join("")} 
  
        </div>
          
        </div>`

        btnSave.style.pointerEvents = "all";
        btnSave.style.opacity = 1;
      });

    });
  });


  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    const db = localStorage.getItem("db");
    const generalDB = JSON.parse(db);

    let productora = JSON.parse(localStorage.getItem("productora"));

    productora = {
      ...productora,
      montaje: 23 - productora.startDate.split("-")[2],
      desmontaje: productora.endTimeDate.split("-")[2] - 23,
    };

    generalDB.eventos.evento_actual = productora;

    localStorage.setItem("db", JSON.stringify(generalDB));
    localStorage.removeItem("productora");
    alert("Evento guardado");

    navegation("../../../../../../index.html");
  });
}



main();
