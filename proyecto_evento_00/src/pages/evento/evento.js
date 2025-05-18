import { server } from "../../server/main.js";


// This function is called when the DOM is fully loaded
function main() {
  const res = server('evento');
  const div = document.createElement("div");

  if (res.name === "undefined") {
    notFound(div, res);
  } else {
    View(div);
  }

  div.style.backgroundColor = "black";
  div.style.color = "white";
  div.style.padding = "15px";
  div.style.borderRadius = "5px";
  document.body.appendChild(div);
}

function notFound(div, res) {
  div.innerHTML = `
      <code>{
         <br>code: '404',<br> 
          Error: '${res.answer}'<br>}
      </code>
    `;
}

function View(div) {
  div.innerHTML = `
      <code>{
         <br>code: '200',<br> 
          data: '${res.answer}'<br>}
      </code>
    `;
}

window.addEventListener("DOMContentLoaded", main);
