//VARIABLES
let listaClientes = [];
let currentCliente = 0;

let listadoctors=[];
let currentdoctor=0;

let listaMensajes=[];
let currentMensaje=0;

//FUNCIONES DE PAGINA
function loadPage() {
    getClientes();
    getdoctors();
    getMensajes();
}

