function show_div_reservacion() {
    document.getElementById("div_form_reservacion").style.visibility = "visible";
    limpiarCamposReservacion();
}
function hidden_div_reservacion() {
    document.getElementById("div_form_reservacion").style.visibility = "hidden";
    limpiarCamposReservacion();
}

function limpiarCamposReservacion() {
    document.getElementById('txtIdReservacion').value = "";
   // document.getElementById('txtReservacionTexto').value = "";
    document.getElementById('select_doctor_reserva').value = 0;
    document.getElementById('select_client_reserva').value = 0;
    currentReservacion = 0;
}
function getReservacion() {
    var url = urlReservation + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaReservaciones = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">Inicio</th><th scope="col">Finaliza</th><th scope="col">Doctor</th><th scope="col">Cliente</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(reservacion => {
                    datatexto += "<tr>";
                    datatexto += '<td >' + reservacion.idReservation + '</td>';
                    datatexto += '<td style="font-size: 10px;">' + reservacion.startDate + '</td>';
                    datatexto += '<td style="font-size: 10px;" >' + reservacion.devolutionDate + '</td>';
                    datatexto += '<td >' + reservacion.doctor.name + '</td>';
                    datatexto += '<td >' + reservacion.client.name + '</td>';
                    

                    datatexto += '<td><button class="btn btn-primary" onclick="editReservacion(' + reservacion.idMessage + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteReservacion(' + reservacion.idMessage + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_reservacion').innerHTML = datatexto;
        });
    getdoctors_1();
    getClient_1();
}
function convertFecha(){
    
}


function getdoctors_1() {
    var url = urlDoctor + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            var listacurrent = data;
            var texto = '<div class="form-group"><label >Doctor</label>';
            texto += '<select class="browser-default custom-select" id="select_doctor_reserva">';
            texto += '<option value="0">Seleccione</option>';
            listacurrent.forEach(element => {
                texto += '<option value="' + element.id + '" >' + element.name + '</option>';
            });
            texto += '</select></div>';
            document.getElementById('div_reservacion_doctor').innerHTML = texto;
        });
}
function getClient_1() {
    var url = urlCliente + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            var listacurrent = data;
            var texto = '<div class="form-group"><label >Cliente</label>';
            texto += '<select class="browser-default custom-select" id="select_client_reserva">';
            texto += '<option value="0">Seleccione</option>';
            listacurrent.forEach(element => {
                texto += '<option value="' + element.idClient + '" >' + element.name + '</option>';
            });
            texto += '</select></div>';
            document.getElementById('div_reservacion_cliente').innerHTML = texto;
        });
}

function deleteReservacion(id) {
    // var opcion = confirm("Seguro que desea eliminar?");
    // if (opcion == true) {
    //     var data = { id: id };
    //     var url = urlReservacions;
    //     fetch(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     getReservacions();
    //     hidden_div_reservacion();
    // }
    alert("función no disponible aún en este reto 3 ");
}
function editReservacion(id) {

    alert("función no disponible aún en este reto 3 ");
    // listaReservacions.forEach(reservacion => {
    //     if (reservacion.idMessage == id) {
    //         currentReservacion = id;
    //         document.getElementById("div_form_reservacion").style.visibility = "visible";
    //         document.getElementById('txtIdReservacion').value = reservacion.idMessage;
    //         document.getElementById('txtReservacionTexto').value = reservacion.messageText;
    //         document.getElementById('select_doctor').value = reservacion.doctor.id;
    //         document.getElementById('select_client').value = reservacion.client.idClient;
    //     }
    // });
}

function guardarDatosReservacion() {
    var url = urlReservation+"/save";
    
    var seleccionDoctor = document.getElementById("select_doctor_reserva").value;
    var seleccionClient = document.getElementById("select_client_reserva").value;
    var fechaInicio = document.getElementById("datepicker_inicio").value;
    var fechaFin = document.getElementById("datepicker_fin").value;

    if(seleccionClient!=0 &&seleccionDoctor!=0)
    {
        if (currentReservacion == 0) {
            //nuevo
            //{"startDate":"2020-12-20","devolutionDate":"2020-12-20","client":{"idClient":1},"doctor":{"id":1}}
            console.log(fechaInicio);
            console.log(fechaFin);
            var data = { id: 0, startDate: fechaInicio,devolutionDate:fechaFin,client:{idClient:seleccionClient},doctor:{id:seleccionDoctor} };
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Reservacion Creado');
                getReservacion();
                hidden_div_reservacion();
            });
        } else {
            //editar
            alert("función no disponible aún en este reto 3 ");
            // let id = currentReservacion;
            // var data = { id: id, messagetext: reservacion };
            // fetch(url, {
            //     method: 'PUT',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then(() => {
            //     alert('Reservacion Editado');
            //     getReservacions();
            //     hidden_div_reservacion();
            // });
        }
    }else{
        alert('falta campo Cliente o campo Doctor  ');
    }

    
}