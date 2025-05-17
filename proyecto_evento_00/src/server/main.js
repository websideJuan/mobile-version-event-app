import { connect } from "../db/connect.js";

export function server (nameDB) {
  let answer = {};
  const data = connect();

  if (data[nameDB]) {
    answer = {
      name: nameDB,
      answer: data[nameDB],
    }
  }
  else {
    answer = {
      name: 'undefined',
      answer: 'No hay datos en el localStorage',
    };
  }

  return answer  
}