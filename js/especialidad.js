

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

    countRemaining = document.getElementById('lblCountLetters');
    countRemaining.textContent = "0/250";
}

function getEspecialidad() {

    var el;
    el = document.getElementById('txtEspecialidadDescripcion');
    el.addEventListener('keyup', countCharacters, false);

    var url = urlEspecialidad + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaEspecialidades = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">Especialidad</th><th scope="col">Descripción</th><th scope="col"></th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(especialidad => {
                    datatexto += "<tr>";
                    //datatexto += '<th scope="row">' + especialidad.id + '</th>';
                    datatexto += '<td>' + especialidad.name + '</td>';
                    datatexto += '<td>' + especialidad.description + '</td>';
                    datatexto += '<td><button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="showDoctor(' + especialidad.id + ')" >Doctor</button></td>';
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


function editEspecialidad(id) {
    //alert(listaEspecialidades.length);
    //getListaEspecialty();
    listaEspecialidades.forEach(especialidad => {
        if (especialidad.id == id) {
            currentEspecialidad = id;
            localStorage.setItem('diego', 'roberto');
            document.getElementById("div_form_especialidad").style.visibility = "visible";
            document.getElementById('txtIdEspecialidad').value = especialidad.id;
            document.getElementById('txtEspecialidadTexto').value = especialidad.name;
            document.getElementById('txtEspecialidadDescripcion').value = especialidad.description;

            countRemaining = document.getElementById('lblCountLetters');
            countRemaining.textContent = especialidad.description.length + "/250";
        }
    });
}

function guardarDatosEspecialidad() {
    var url = urlEspecialidad + "/save";
    let especialidad = document.getElementById('txtEspecialidadTexto').value;
    let descripcion = document.getElementById('txtEspecialidadDescripcion').value;

    if (currentEspecialidad == 0) {
        //nuevo
        //{"name":"cat1","description":"test category"}
        var data = { id: 0, name: especialidad, description: descripcion };
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
        url=urlEspecialidad + "/update";
        let id = currentEspecialidad;
        var data = { id: id, name: especialidad,description:descripcion };
        //{"id":1,"name":"modificada","description":"se ha modificado"}
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('especialidad Editado');
            getEspecialidad();
            hidden_div_especialidad();
        });
    }
}

//nuevo en reto4




function countCharacters(e) {
    var textEntered, countRemaining, counter;
    textEntered = document.getElementById('txtEspecialidadDescripcion').value;
    counter = textEntered.length;
    countRemaining = document.getElementById('lblCountLetters');
    countRemaining.textContent = counter + "/250";
}
function showDoctor(idEspecialidad) {
    listaEspecialidades.forEach(element => {
        if (element.id == idEspecialidad) {
            document.getElementById('exampleModalLabel').textContent = "Doctores para especialidad: " + element.name;
            var datatexto = '<ul class="list-group">';
            element.doctors.forEach(doctor => {
                datatexto += '<li class="list-group-item">' + doctor.name + '</li>';
            });
            datatexto += '</ul >';
            document.getElementById('div_infoDoctor_fromEspecialidad').innerHTML = datatexto;
        }
    });
}
function deleteEspecialidad(id) {
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var delInfo = true;
        listaEspecialidades.forEach(element => {
            if (element.id == id) {
                if (element.doctors.length > 0) {
                    delInfo = false;
                }
            }
        });
        if (delInfo) {
            //http://150.230.69.0:8080/api/Specialty/2
            var url = urlEspecialidad + '/' + id;
            fetch(url, {
                method: 'DELETE',
                //body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                getEspecialidad();
                hidden_div_especialidad();
            });
        }else{
            alert("NO se puede eliminar esta especialidad ya que tiene doctores inscritos");
        }


    }
}
