function show_div_mensaje() {
    document.getElementById("div_form_mensaje").style.visibility = "visible";
    document.getElementById("select_doctor").disabled = false;
    document.getElementById("select_client").disabled = false;

    limpiarCamposMensaje();
}
function hidden_div_mensaje() {
    document.getElementById("div_form_mensaje").style.visibility = "hidden";
    limpiarCamposMensaje();
}

function limpiarCamposMensaje() {
    document.getElementById('txtIdMensaje').value = "";
    document.getElementById('txtMensajeTexto').value = "";
    document.getElementById('select_doctor').value = 0;
    document.getElementById('select_client').value = 0;
    currentMensaje = 0;

    countRemaining = document.getElementById('lblCountLettersMensaje');
    countRemaining.textContent = "0/250";
}
function getMensajes() {
    var el;
    el = document.getElementById('txtMensajeTexto');
    el.addEventListener('keyup', countCharactersMensaje, false);


    var url = urlMessage + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaMensajes = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">Doctor</th><th scope="col">Cliente</th><th scope="col">Mensaje</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(mensaje => {
                    datatexto += "<tr>";
                    //datatexto += '<td >' + mensaje.idMessage + '</td>';
                    datatexto += '<td >' + mensaje.doctor.name + '</td>';
                    datatexto += '<td >' + mensaje.client.name + '</td>';
                    datatexto += '<td>' + mensaje.messageText + '</td>';

                    datatexto += '<td><button class="btn btn-primary" onclick="editMensaje(' + mensaje.idMessage + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteMensaje(' + mensaje.idMessage + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_mensajes').innerHTML = datatexto;
        });
    getdoctors_();
    getClient_();
}
function getdoctors_() {
    var url = urlDoctor + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            var listacurrent = data;
            var texto = '<div class="form-group"><label >Doctor</label>';
            texto += '<select class="browser-default custom-select" id="select_doctor">';
            texto += '<option value="0">Seleccione</option>';
            listacurrent.forEach(element => {
                texto += '<option value="' + element.id + '" >' + element.name + '</option>';
            });
            texto += '</select></div>';
            document.getElementById('div_mensaje_doctor').innerHTML = texto;
        });
}
function getClient_() {
    var url = urlCliente + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            var listacurrent = data;
            var texto = '<div class="form-group"><label >Cliente</label>';
            texto += '<select class="browser-default custom-select" id="select_client">';
            texto += '<option value="0">Seleccione</option>';
            listacurrent.forEach(element => {
                texto += '<option value="' + element.idClient + '" >' + element.name + '</option>';
            });
            texto += '</select></div>';
            document.getElementById('div_mensaje_cliente').innerHTML = texto;
        });
}

function deleteMensaje(id) {
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var url = urlMessage + "/" + id;
        fetch(url, {
            method: 'DELETE',
            //body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            getMensajes();
            hidden_div_mensaje();
        });

    }

}
function editMensaje(id) {
    listaMensajes.forEach(mensaje => {
        if (mensaje.idMessage == id) {
            currentMensaje = id;
            document.getElementById("div_form_mensaje").style.visibility = "visible";
            document.getElementById('txtIdMensaje').value = mensaje.idMessage;
            document.getElementById('txtMensajeTexto').value = mensaje.messageText;
            document.getElementById('select_doctor').value = mensaje.doctor.id;
            document.getElementById('select_client').value = mensaje.client.idClient;
            countRemaining = document.getElementById('lblCountLettersMensaje');
            countRemaining.textContent = mensaje.messageText.length + "/250";
            document.getElementById("select_doctor").disabled = true;
            document.getElementById("select_client").disabled = true;
        }
    });
}

function guardarDatosMensaje() {
    var url = urlMessage + "/save";
    let mensaje = document.getElementById('txtMensajeTexto').value;
    var seleccionDoctor = document.getElementById("select_doctor").value;
    var seleccionClient = document.getElementById("select_client").value;

    if (seleccionClient != 0 && seleccionDoctor != 0) {
        if (currentMensaje == 0) {
            //nuevo
            //	{"messageText":"Me gusta.","client":{"idClient":1},"doctor":{"id":1}}
            var data = {  messageText: mensaje, client: { idClient: seleccionClient }, doctor: { id: seleccionDoctor } };
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Mensaje Creado');
                getMensajes();
                hidden_div_mensaje();
            });
        } else {
            //editar
            url = urlMessage + "/update";
            let id = currentMensaje;
            //{"idMessage": 2,"messageText": "pepepepe","doctor":{  "id": 1},"client":{  "idClient": 1}}
            var data = { idMessage: id,  messageText: mensaje, client: { idClient: seleccionClient }, doctor: { id: seleccionDoctor } };
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Mensaje Editado');
                getMensajes();
                hidden_div_mensaje();
            });
        }
    } else {
        alert('falta campo Cliente o campo Doctor  ');
    }


}

//nuevo en Reto 4

function countCharactersMensaje(e) {
    var textEntered, countRemaining, counter;
    textEntered = document.getElementById('txtMensajeTexto').value;
    counter = textEntered.length;
    countRemaining = document.getElementById('lblCountLettersMensaje');
    countRemaining.textContent = counter + "/250";
}