
import { navegation } from "../../components/navbar/navbar.js";
import { save, update } from "../../db/connect.js";


function main() {
  const productoras = document.querySelectorAll(".selectProductora");
  const appContainer = document.querySelector("#appContainer");
  const btnSave = document.querySelector("#btnSave");
  btnSave.style.pointerEvents = "none";
  btnSave.style.opacity = 0.5;

  productoras.forEach((productora) => {
    productora.addEventListener("click", () => {
      productoras.forEach((productora) => (productora.style.opacity = 0.5));


      let product2 = {
        name: productora.querySelector("h5").innerText,
        image: productora.querySelector("img").src,
        moreInfo: []
      };


      const div = document.createElement("div");

      div.innerHTML = `
         <div>
      <h2 style="color: #555555c2; margin-bottom: 2rem">
        Productora Seleccionada:
      </h2>
      <p class="card" style="display: flex; align-items: center">
        <img
          src="${product2.image}"
          alt="Productora"
          style="
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 1rem;
          "
        />
        ${product2.name}
      </p>
    </div>

    <div class="card-container" style="align-items: flex-start;">
      <div
        style="
          text-align: center;
          cursor: pointer;
          font-weight: 900;
          color: #3333335c;
        "
        class="card w-f fecha_evento"
        onclick="event.target.classList.contains('active') ? event.target.classList.remove('active') : event.target.classList.add('active')"
      >
        <span> <i class="
          fa-solid fa-calendar-days"
        "></i> Inicio</span>
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
            <input type="date" id="startDate" value="2025-05-27"/>
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
        <span><i class="
          fa-solid fa-calendar-days"
        "></i> Final</span>
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
            <input type="date" id="endTimeDate" value="2025-05-31"/>
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

      // Clear previous content and append new content
      const eventoActual = document.querySelector("#evento_actual");
      eventoActual.innerHTML = "";
      eventoActual.appendChild(div);

      // Show the app container
      const endEvent = document.querySelector("#endEvent");
      const startButton = document.querySelector("#startButton");

      startButton.addEventListener("click", (e) => {
        e.preventDefault();
        const startDate = document.querySelector("#startDate").value;
        const startTime = document.querySelector("#startTime").value;

        product2 = {
          ...product2,
          startDate: startDate,
          startTime: startTime,
        };

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

        product2 = {
          ...product2,
          endTimeDate: endTimeDate,
          endTimeHora: endTimeHora,
          dias: endTimeDate.split("-")[2] - product2.startDate.split("-")[2],
          moreInfo: Array.from({ length: 
            endTimeDate.split("-")[2] - product2.startDate.split("-")[2] + 1
           }, (_, index) => ({
            dia: parseInt(product2.startDate.split("-")[2]) + index,
            info: "No hay información",
           })),
        };


  
        document.querySelectorAll(".fecha_evento").forEach((card) => {
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            card.innerHTML = `
              <div class="event-date">
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
          { length: product2.dias + 1},
            (_, i) => {
              return `
             
              <a href="#" style="text-decoration: none; color: inherit;">
              <div class="card w-f addMoreInformation" >
                <span">
                  Día
                </span>
                <p>${
                  parseInt(product2.startDate.split("-")[2]) + i
                }</p>
              </div>
              </a>
              `;
            }
          ).join("")} 
  
        </div>
          
        </div>`

        btnSave.style.pointerEvents = "all";
        btnSave.style.opacity = 1;
      });

      appContainer.addEventListener("click", (e) => {
        e.preventDefault();
        if (!e.target.classList.contains("addMoreInformation")) return;

        const diaActual = e.target.querySelector("p").innerText;
        const div = document.createElement("div");
        const textArea = document.createElement("textarea");
        const button = document.createElement("button");
        const input = document.createElement("input");
        button.innerText = "Guardar Información";
        textArea.placeholder = "Información adicional del día";
        textArea.style.width = "100%";

        div.appendChild(textArea);
        div.appendChild(input);

        div.appendChild(button);
        div.style.position = "absolute";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.style.backgroundColor = "white";
        div.style.padding = "1rem";
        div.style.borderRadius = "10px";
        div.style.zIndex = "1000";
        div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        div.style.width = "300px";
        div.style.maxWidth = "90%";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.gap = "1rem";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "10px";
        div.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        document.body.appendChild(div);
        textArea.focus();
        input.type = 'text'
        input.placeholder = "Cantidad de gruas";
        input.style.width = "100%";
        input.style.marginBottom = "1rem";
        input.style.padding = "0.5rem";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "5px";
        input.required = true;


        button.addEventListener("click", (e) => {
          if (textArea.value.trim() === "") {
            alert("Por favor, ingresa información antes de guardar.");
            return;
          }

          const index = product2.moreInfo.findIndex((index) => index.dia === parseInt(diaActual));
          product2.moreInfo[index].info = textArea.value;
          product2.moreInfo[index].gruas = input.value;


          localStorage.setItem("productora", JSON.stringify(product2));
          div.remove();
        });
      })
    });
  });


  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    const db = localStorage.getItem("db");
    const generalDB = JSON.parse(db);

    let productora = JSON.parse(localStorage.getItem("productora"));
    const diaDelEvento = productora.moreInfo.find((info) => info.info.includes("show"));

    if (diaDelEvento === undefined) {
      alert("Por favor, selecciona un día del evento.");
      return;
    }
    
    productora = {
      ...productora,
      montaje: parseInt(diaDelEvento.dia) - productora.startDate.split("-")[2],
      desmontaje: productora.endTimeDate.split("-")[2] - parseInt(diaDelEvento.dia) ,
      show: diaDelEvento === undefined ? diaDelEvento.dia : null 
    };

    generalDB.eventos.evento_actual = productora;

    localStorage.setItem("db", JSON.stringify(generalDB));
    localStorage.removeItem("productora");
    alert("Evento guardado");

    navegation("../../../../../../index.html");
  });
}



main();
