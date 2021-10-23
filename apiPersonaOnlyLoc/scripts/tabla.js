export function handlerLoadTable(event, items, contenedor) {
    mostrarTabla(crearTabla(items), contenedor);
  }
  
  // recibe una tabla y el contenedor, limpia los datos del contenedor y asigna lo recibido
  function mostrarTabla(tabla, contenedor) {
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
    if (tabla) {
      contenedor.appendChild(tabla);
    }
  }
  
  /**
   * Crea la tabla
   */
  function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    return tabla;
  }
  
  function crearThead(items) {
    const thead = document.createElement("thead");
    thead.setAttribute("id","thead");
    const fila = document.createElement("tr");
    if (items) {
      for (const key in items) {
        if (key != "id" && key!="foto") {
          const columna = document.createElement("th");
          columna.textContent = key.toUpperCase();
          fila.appendChild(columna);
        }
      }
      const colEliminar = document.createElement("th");
      colEliminar.textContent = "ACCION";
      fila.appendChild(colEliminar);
      thead.appendChild(fila);
    }
  
    return thead;
  }
  
  function crearTbody(items) {
    const tbody = document.createElement("tbody");
    tbody.setAttribute("id","tbody"); // le agrego un ID para poder controlarlo
    items.forEach((element) => {
      const fila = document.createElement("tr");
      for (const key in element) {
        if (key === "id") {
          fila.setAttribute("data-id", element[key]); //lo seteo para ocultar el ID
        } else if(key == "foto"){
          continue;
        }
        else if (key ==="localidad"){
          const columna = document.createElement("td");
          columna.setAttribute("data-id",element[key].id);
          columna.textContent = element[key].nombre;
          fila.appendChild(columna);
        }
        else{
          const columna = document.createElement("td");
          columna.textContent = element[key];
          fila.appendChild(columna);
        }

      }
  
      const colImg = document.createElement("td");
      const img = document.createElement("img");
      img.setAttribute("src", "./img/accion.png");
      colImg.appendChild(img);
      fila.appendChild(colImg);
      tbody.appendChild(fila);
    });
    return tbody;
  }