

export const navegation = (path) => {
  const location = window.location.pathname
  const pathName = path.split('.')[0]
  console.log(path);
  

  if (path === "/") {
    window.location.href = ''
    return
  }

  if (location.match(path)) {
    console.log("Ya estás en la página");
    return
  }

  
  
  window.location.href = `${location}src/pages/${pathName}/${path}`
  
}
