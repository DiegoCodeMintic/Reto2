function press() {
    alert('si');
    var url = 'https://g8b329f59e9c137-db202109230709.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor'

    //fetch(url).then((Response)=>alert(Response))

    //var url= 'http://'+getIpRemoto()+'/api/local/Obtener_Todo?IdCC='+IdCC+'&Cantidad=0';
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            console.log("DATA:");
            data.items.forEach(Doctor => {
                console.log(Doctor.id);
            });
        });
}

function press1() {

    var url = 'https://g8b329f59e9c137-db202109230709.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor'



    //{"id":1,"specialty":"Pediatra","graduate_year":2005,"department_id":3,"name":"Mario TALES"}
    var data = { id: 100, specialty: 'specialty', graduate_year: 2222, department_id: 9898, name: 'name' };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        press();
    });

}



//{"id":2,"specialty":"Odontologo","graduate_year":2011,"department_id":1,"name":"Aleja Guevara"}

/*
1. Creación cuenta en GitHub 
2. Creación de tablas, módulos, plantillas, peticiones HTTP de CLIENT y MESSAGE en la nube de Oracle. 
3. Generar API REST para reto 2. 
4. Creación del proyecto FrontEnd del reto 2 con HTML y JavaScript. 
5. Creación de función de conexión y llamados AJAX. 
6. Creación de Botones, Inputsy Listas. 
7. Generar archivo zip. con el proyecto del reto 2.
*/


/*
function traerInformacion(){
    $.ajax({
        url:"https://g42463fc9ec0dbe-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
        }

    });

}

function traerInformacion(){
    $.ajax({
        url:"https://g42463fc9ec0dbe-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
        }

    });
}

function pintarRespuesta(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}

<!DOCTYPE html>
<html>
<head>
    <title>Reto 2 </title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="js/misFunciones.js"></script>

</head>
<body>
<h1> Tutoria Domingo en tarde!!!!</h1>
<div id="resultado"></div>
<button onclick="traerInformacion()"> Consultar </button>



</body>


</html>
*/

//VARIABLES

let listaClientes = [];
let currentCliente = 0;

//FUNCIONES DE PAGINA
function loadPage() {
    getClientes();
}

//FUNCIONES DE CLIENTE
function show_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "visible";
    //document.getElementById('txtIdCliente').disabled=false;
    limpiarCamposCliente();
    currentCliente = 0;
}
function hidden_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "hidden";
    //document.getElementById('txtIdCliente').disabled=false;
    limpiarCamposCliente();
    currentCliente = 0;
}
function getClientes() {
    var url = urlClientes;
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            //console.log("DATA:");
            listaClientes = data.items;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Email</th><th scope="col">Edad</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';

            if (data.items.length > 0) {
                data.items.forEach(cliente => {
                    //console.log(Doctor.id);
                    datatexto += "<tr>";
                    datatexto += '<th scope="row">' + cliente.id + '</th>';
                    datatexto += '<td>' + cliente.name + '</td>';
                    datatexto += '<td>' + cliente.email + '</td>';
                    datatexto += '<td>' + cliente.age + '</td>';
                    datatexto += '<td><button class="btn btn-primary" onclick="editCliente(' + cliente.id + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteCliente(' + cliente.id + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_clientes').innerHTML = datatexto;
        });
}
function deleteCliente(id) {
    //alert(id);
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var data = { id: id };
        var url = urlClientes;
        fetch(url, {
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            //alert('Cliente Eliminado');
        });

        getClientes();
        hidden_div_cliente();
    }


}
function editCliente(id) {
    listaClientes.forEach(cliente => {
        if (cliente.id == id) {
            currentCliente = id;
            document.getElementById("div_form_cliente").style.visibility = "visible";
            document.getElementById('txtIdCliente').value = cliente.id;
            document.getElementById('txtNombreCliente').value = cliente.name;
            document.getElementById('txtEmailCliente').value = cliente.email;
            document.getElementById('txtEdadCliente').value = cliente.age;
        }
    });

}
function limpiarCamposCliente() {
    document.getElementById('txtIdCliente').value = "";
    document.getElementById('txtNombreCliente').value = "";
    document.getElementById('txtEmailCliente').value = "";
    document.getElementById('txtEdadCliente').value = "";
}
function guardarDatos() {

    var url = urlClientes;


    let nombre = document.getElementById('txtNombreCliente').value;
    let email = document.getElementById('txtEmailCliente').value;
    let edad = document.getElementById('txtEdadCliente').value;


    if (currentCliente == 0) {
        //nuevo
        var data = { id: 0, name: nombre, email: email, age: edad };
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('Cliente Creado');
            getClientes();
            hidden_div_cliente();
        });
    } else {
        //editar
        let id = currentCliente;
        var data = { id: id, name: nombre, email: email, age: edad };
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('Cliente Editado');
            getClientes();
            hidden_div_cliente();
        });
    }
    

}
