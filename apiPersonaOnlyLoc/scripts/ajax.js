// Metodos Ajax
import spinner from "./spinner.js";


export const getDatosAjax = (url) => new Promise((resolve,reject)=> {
  const xhr = new XMLHttpRequest();
  let statusSpinner;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const datos = JSON.parse(xhr.responseText);
        resolve(datos);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        reject(Error(`Error: ${xhr.status} : ${statusText}`));
      }
      spinner.removeSpinner(document.getElementById("spinner"),document.getElementById("img-spinner"));
    } else {
      if (!statusSpinner) {
        spinner.setSpinner(document.getElementById("spinner"));
        statusSpinner = true;
      }
    }
  };

  //abrir la petecion
  xhr.open("GET", url);
  //enviar la peticion
  xhr.send();
  
});

//Post
export const postDatosAjax = (objeto,url) => new Promise((resolve,reject)=> {
  const xhr = new XMLHttpRequest();
  let statusSpinner;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        reject(Error(`Error: ${xhr.status} : ${statusText}`));
      }
      spinner.removeSpinner(document.getElementById("spinner"),document.getElementById("img-spinner"));
    } else {
      if (!statusSpinner) {
        spinner.setSpinner(document.getElementById("spinner"));
        statusSpinner = true;
      }
    }
  };
  xhr.open("POST", url);
  //seteamos las cabecera
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.send(JSON.stringify(objeto));
});
//delete solo necesito el ID
export const deleteDatosAjax = (id, url) => new Promise((resolve,reject)=> {
  const xhr = new XMLHttpRequest();
  let statusSpinner;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        reject(Error(`Error: ${xhr.status} : ${statusText}`));
      }
      spinner.removeSpinner(document.getElementById("spinner"),document.getElementById("img-spinner"));
    } else {
      if (!statusSpinner) {
        spinner.setSpinner(document.getElementById("spinner"));
        statusSpinner = true;
      }
    }
    
  };

  xhr.open("DELETE", `${url}/${id}`);

  xhr.send();
});

export const putDatosAjax = (id, objeto, url) => new Promise((resolve,reject)=> {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        reject(Error(`Error: ${xhr.status} : ${statusText}`));
      }
      spinner.removeSpinner(document.getElementById("spinner"),document.getElementById("img-spinner"));
    } else {
      if (!statusSpinner) {
        spinner.setSpinner(document.getElementById("spinner"));
        statusSpinner = true;
      }
    }
  };
  xhr.open("PUT", `${url}/${id}`); // a la ruta el maando el ID
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(objeto)); // en la cabecera envio el objeto
});
