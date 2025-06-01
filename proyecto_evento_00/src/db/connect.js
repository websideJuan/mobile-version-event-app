export const connect = async () => {
  const db = localStorage.getItem("db");

  if (db) {
    return JSON.parse(db);
  } else {
    const Opjson = await fetch("./src/db/operarios.json");
    const MQjson = await fetch("./src/db/maquinas.json");
    const EVjson = await fetch("./src/db/eventos.json");
    const operarios = await Opjson.json();
    const maquinas = await MQjson.json();
    const eventos = await EVjson.json();

    operarios.forEach((operario) => {
      operario.id = operario.id;

    });

    maquinas.forEach((maquina) => {
      
      maquina.operarioId = 0
    });

    const data = {
      eventos: [],
      operarios: [],
      maquinas: [],
    };

    data.operarios = operarios;
    data.maquinas = maquinas;
    data.eventos = eventos;

    const res = save({ nameData: "db", data });
    alert(res.message);
    return data;
  }
};

export function save({ nameData, data }) {
  if (!nameData) {
    throw new Error("No hay nombre para guardar los datos");
  }

  localStorage.setItem(nameData, JSON.stringify(data));

  return {
    nameData,
    message: "Los datos han sido guardados",
  };
}

export function update({ nameData, data }) {
  if (!nameData) {
    throw new Error("No hay nombre para guardar los datos");
  }

  const db = localStorage.getItem(nameData);

  if (db) {
    // Si existe el localStorage, lo actualizamos
    const dataDB = JSON.parse(db);

    

    localStorage.setItem(nameData, JSON.stringify({
      ...dataDB,
      ...data,
    }));

  } else {
    // Si no existe el localStorage, lo creamos
    localStorage.setItem(nameData, JSON.stringify([data]));
  }

  return {
    nameData,
    message: "Los datos han sido actualizados",
  };
}
