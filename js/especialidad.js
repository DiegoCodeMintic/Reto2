

function show_div_especialidad() {
    document.getElementById("div_form_especialidad").style.visibility = "visible";
    limpiarCamposEspecialidad();
}
function hidden_div_especialidad() {
    document.getElementById("div_form_especialidad").style.visibility = "hidden";
    limpiarCamposEspecialidad();
}

function limpiarCamposEspecialidad() {
    document.getElementById('txtIdEspecialidad').value = "";
    document.getElementById('txtEspecialidadTexto').value = "";
    document.getElementById('txtEspecialidadDescripcion').value = "";
    currentEspecialidad = 0;
}

function getEspecialidad() {
    var url = urlEspecialidad+"/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaEspecialidades = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">especialidad</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(especialidad => {
                    datatexto += "<tr>";
                    datatexto += '<th scope="row">' + especialidad.id + '</th>';
                    datatexto += '<td>' + especialidad.name + '</td>';

                    datatexto += '<td><button class="btn btn-primary" onclick="editEspecialidad(' + especialidad.id + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteEspecialidad(' + especialidad.id + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_especialidad').innerHTML = datatexto;
        });
        //return listaEspecialidades;
}

function deleteEspecialidad(id) {
    // var opcion = confirm("Seguro que desea eliminar?");
    // if (opcion == true) {
    //     var data = { id: id };
    //     var url = urlEspecialidads;
    //     fetch(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     getEspecialidads();
    //     hidden_div_especialidad();
    // }
    alert("función no disponible aún en este reto ");
}
function editEspecialidad(id) {
    //alert(listaEspecialidades.length);
    //getListaEspecialty();
    listaEspecialidades.forEach(especialidad => {
        if (especialidad.id == id) {
            currentEspecialidad = id;
            localStorage.setItem('diego','roberto');
            document.getElementById("div_form_especialidad").style.visibility = "visible";
            document.getElementById('txtIdEspecialidad').value = especialidad.id;
            document.getElementById('txtEspecialidadTexto').value = especialidad.name;
            document.getElementById('txtEspecialidadDescripcion').value = especialidad.description;
        }
    });
}

function guardarDatosEspecialidad() {
    var url = urlEspecialidad+"/save";
    let especialidad = document.getElementById('txtEspecialidadTexto').value;
    let descripcion = document.getElementById('txtEspecialidadDescripcion').value;

    if (currentEspecialidad == 0) {
        //nuevo
        //{"name":"cat1","description":"test category"}
        var data = { id: 0, name: especialidad,description:descripcion };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('especialidad Creado');
            getEspecialidad();
            hidden_div_especialidad();
        });
    } else {
        //editar
        alert("función no disponible aún en este reto ");
        // let id = currentEspecialidad;
        // var data = { id: id, name: especialidad,description:descripcion };
        // fetch(url, {
        //     method: 'PUT',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(() => {
        //     alert('especialidad Editado');
        //     getEspecialidad();
        //     hidden_div_especialidad();
        // });
    }
}