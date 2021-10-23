import { handlerLoadTable } from "./tabla.js";
import { getDatosAjax, postDatosAjax, deleteDatosAjax, putDatosAjax} from "./ajax.js";

const btnModificar = document.getElementById("btnModificar");
const selectLocalidad = document.getElementById("localidades");
const contenedorTabla = document.getElementById("contenedor-tabla");
const formulario = document.getElementById("formulario");
const btnCerrar = document.getElementById("btnCierreFrm");
const cajasText = document.querySelectorAll(".controles__texto");
let localidades;
let idSeleccionado;
let trSeleccionado;
let personas;






window.addEventListener("DOMContentLoaded",(event)=>{

    recuperarLocalidaddes();
    getDatosAjax("http://localhost:3000/Personas")
    .then((datos) => {
      personas = datos || [];
      handlerLoadTable(event,datos,contenedorTabla);
    })
    .catch((error) => {
      console.error(error);
    });

    document.addEventListener("click",handlerAccion);
    btnCerrar.addEventListener("click",handlerCerrarFrm);
    cajasText.forEach((element) => {
      element.addEventListener("change",controlInput)
    });
    btnModificar.addEventListener("click", handlerModificar);
})
const handlerAbrirFrm =  (event )=>{
  formulario.removeAttribute("hidden");
}

// al hacer click en la llaver se abre el frm con los datos cargados
const handlerAccion = (event)=>{
    if (event.target.matches("img")) {
        idSeleccionado = parseInt(event.target.parentNode.parentNode.dataset.id);
        console.log(idSeleccionado);
        trSeleccionado = event.target.parentNode.parentNode; // guardo la referencia a la seleccion para borrar directamente desde ahi.
        formulario.removeAttribute("hidden");
        let personaAux = personas.find(element=> element.id === idSeleccionado);
        cargarPersona(personaAux);
        cajasText.forEach((element) => {
          establecerBorde(element, "controles__texto completo");
        });


    }
}

//al hacer click en la cruz del frm, se cierra y se limpia
const handlerCerrarFrm = (event)=>{
  formulario.setAttribute("hidden","");
  limpiarFormulario();
}


/**
 * Metodo que controla los input y cambia el color de estos en base 
 * @param {*} event 
 * @returns 
 */
function controlInput(event) {
  if (event.target.matches("input") && (event.target.type == "text" || event.target.type == "number")){
    if (event.target.value.length < 3) {
      establecerBorde(event.target, "controles__texto incompleto");
      return false;
    } else {
      establecerBorde(event.target, "controles__texto completo");
      return true;
    }
  }
}

// metodo que establece una clase a un elemento
const establecerBorde = (element, clase)=> {
  element.setAttribute("class", clase);
}

/**
 * Limpia el FRM 
 */
function limpiarFormulario() {
  cajasText.forEach((element) => {
    element.value="";
    establecerBorde(element, "controles__texto incompleto");
  });
}


/**
 * Evento encargado de modificar una persona
 * @param {*} event 
 */
const handlerModificar = (event)=>{


  if(confirm(`Desea modificar los datos de la persona seleccionada?`)){

    postDatosAjax(getPersona(),"http://localhost:3000/editar")
    .then((datos)=>{
      console.log(datos);
      personas = personas.filter((element)=>element.id != idSeleccionado);
      personas.push(datos);
      const contenedor =trSeleccionado.parentNode;
      contenedor.removeChild(trSeleccionado);
      contenedor.appendChild(crearNuevoTr(datos));


    })
    .catch((error)=>{
      console.error(error);
    });
    handlerCerrarFrm();
  }

}
/**
 * Metodo que recupera las localidades desde la API
 */
const recuperarLocalidaddes = ()=>{
  getDatosAjax("http://localhost:3000/localidades")
  .then((datos) => {
    localidades = datos;
    addLocalidades(localidades);
  })
  .catch((error) => {
    console.error(error);
  });
};

/**
 * Metodo que agregar las localidades al Select
 * @param {*} elements 
 */
const addLocalidades = (elements)=>{

  elements.forEach((element)=>{
    const option = document.createElement("option");
    option.id = element.id;
    option.value = element.nombre;
    option.textContent =element.nombre;;
    selectLocalidad.appendChild(option);
  });
};


/**
 * Metodo que carga una persona en el formulario para mostrar
 * @param {*} persona 
 */
const cargarPersona = (persona)=>{
  console.log(persona);
  formulario.id.value = persona.id;
  formulario.nombre.value = persona.nombre;
  formulario.apellido.value = persona.apellido;
  formulario.localidades.value = persona.localidad.nombre;
  formulario.sexo.value = persona.sexo;
};


/**
 * Metodo que genera una persona desde el FRM
 * @returns 
 */
const getPersona = ()=>{
  let idLocalidad = localidades.find(element=> element.nombre = formulario.localidades.value); // obtendo el id de las localidades
  let localidad = {id:idLocalidad.id, nombre:formulario.localidades.value};
  const p = {
    id:parseInt(formulario.id.value),
    nombre:formulario.nombre.value,
    apellido:formulario.apellido.value,
    sexo: formulario.sexo.value,
    localidad:localidad
  };
  return p;
};


/**
 * Metodo que creoa un nuevo TR para la modificacion de Persona, lo hago de esta manera para apendizar el sexo como ultima opcion
 * que es como vienen inicialmente
 * @param {} persona 
 * @returns 
 */
const crearNuevoTr = (persona)=>{

  const fila = document.createElement("tr");
  fila.setAttribute("data-id", persona.id);
  for (const key in persona) {
    if(key!="sexo" && key!="id" ){
      const columna = document.createElement("td");
      if(key=="localidad"){
          columna.setAttribute("data-id", persona[key].id);
          columna.textContent = persona[key].nombre;
      }else{
        columna.textContent = persona[key];
      }
      fila.appendChild(columna);
    }
  }
  const columnaSexo = document.createElement("td");
  columnaSexo.textContent = persona.sexo;
  fila.appendChild(columnaSexo);
  const colImg = document.createElement("td");
  const img = document.createElement("img");
  img.setAttribute("src", "./img/accion.png");
  colImg.appendChild(img);
  fila.appendChild(colImg);
  console.log(fila);
  return fila;
}



