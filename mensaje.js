function show_div_mensaje() {
    document.getElementById("div_form_mensaje").style.visibility = "visible";
    limpiarCamposMensaje();
}
function hidden_div_mensaje() {
    document.getElementById("div_form_mensaje").style.visibility = "hidden";
    limpiarCamposMensaje();
}

function limpiarCamposMensaje() {
    document.getElementById('txtIdMensaje').value = "";
    document.getElementById('txtMensajeTexto').value = "";
    currentMensaje = 0;
}
function getMensajes() {
    var url = urlMensajes;
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaMensajes = data.items;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">Mensaje</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.items.length > 0) {
                data.items.forEach(mensaje => {
                    datatexto += "<tr>";
                    datatexto += '<th scope="row">' + mensaje.id + '</th>';
                    datatexto += '<td>' + mensaje.messagetext + '</td>';

                    datatexto += '<td><button class="btn btn-primary" onclick="editMensaje(' + mensaje.id + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteMensaje(' + mensaje.id + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_mensajes').innerHTML = datatexto;
        });
}

function deleteMensaje(id) {
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var data = { id: id };
        var url = urlMensajes;
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getMensajes();
        hidden_div_mensaje();
    }
}
function editMensaje(id) {
    listaMensajes.forEach(mensaje => {
        if (mensaje.id == id) {
            currentMensaje = id;
            document.getElementById("div_form_mensaje").style.visibility = "visible";
            document.getElementById('txtIdMensaje').value = mensaje.id;
            document.getElementById('txtMensajeTexto').value = mensaje.messagetext;
        }
    });
}

function guardarDatosMensaje() {
    var url = urlMensajes;
    let mensaje = document.getElementById('txtMensajeTexto').value;

    if (currentMensaje == 0) {
        //nuevo
        var data = { id: 0, messagetext: mensaje };
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
        let id = currentMensaje;
        var data = { id: id, messagetext: mensaje };
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
}