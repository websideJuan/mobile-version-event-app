
export const connect = async () => {
  const db = localStorage.getItem('db');

  if (db) {
    return JSON.parse(db);
  } else {
    const Opjson = await fetch('./src/db/operarios.json')
    const MQjson = await fetch('./src/db/maquinas.json')
    const operarios = await Opjson.json();
    const maquinas = await MQjson.json();

    operarios.forEach((operario) => {
      operario.id = operario.id;
      operario.createdAt = new Date();
      operario.updatedAt = new Date();

    });

    maquinas.forEach((maquina) => {
      maquina.createdAt = new Date();
      maquina.updatedAt = new Date();
      maquina.operarioId = operarios.filter((operario) => operario.maquina === maquina.id)[0].id;
    });

    const data = {
      eventos: [],
      operarios: [],
      maquinas: [],
    };

    data.operarios = operarios;
    data.maquinas = maquinas;
  
    const res = save({nameData:'db', data});
    alert(res.message);
    return data;
  }

}

function save ({nameData, data}) {
  if (!nameData) {
    throw new Error("No hay nombre para guardar los datos");
  }


  localStorage.setItem(nameData, JSON.stringify(data));

  return {
    nameData,
    message: "Los datos han sido guardados",
  }
}