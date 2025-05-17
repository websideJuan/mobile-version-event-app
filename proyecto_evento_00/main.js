import { navegation } from "./src/components/navbar/navbar.js";
import { connect } from "./src/db/connect.js";
/*
  Initial code for a simple event management system.
*/

async function Initialize() {
  // Initialize the event management system
  // Connect to the database
  const data = await connect();
  const links = document.querySelectorAll("a.navegation");

  
  
  const operarioCompleto = data.operarios.filter((operario) => operario.id == 1).map((operario) => {
    
    const maquinas = data.maquinas.filter((maquina) => maquina.operarioId == operario.id);
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

  console.log("Operarios with Machines: ", operarioCompleto);
  

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const path = event.target.getAttribute("href");
      navegation(path);
    });
  });

  console.log("Event Management System Initialized");
}

Initialize();