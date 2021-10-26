//FUNCIONES DE DOCTOR

function getdoctors() {
    var url = urlDoctor + "/all";
    console.log("data->");
    console.log(url);
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listadoctors = data;

            let datatexto = '<table class="table table-striped"><thead>';
            datatexto += '<tr><th scope="col">#</th>';
            datatexto += '<th scope="col">Nombre</th>';
            datatexto += '<th scope="col">Especialidad</th>';
            datatexto += '<th scope="col">Año</th>';
            datatexto += '<th scope="col">Dep id</th>';
            datatexto += '<th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(doctor => {
                    datatexto += "<tr>";
                    datatexto += '<th scope="row">' + doctor.id + '</th>';
                    datatexto += '<td>' + doctor.name + '</td>';
                    datatexto += '<td>' + doctor.specialty.name + '</td>';
                    datatexto += '<td>' + doctor.year + '</td>';
                    datatexto += '<td>' + doctor.department + '</td>';
                    datatexto += '<td><button class="btn btn-primary" onclick="editdoctor(' + doctor.id + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deletedoctor(' + doctor.id + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_doctors').innerHTML = datatexto;
        });
}
function deletedoctor(id) {
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var data = { id: id };
        var url = urldoctors;
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getdoctors();
        hidden_div_doctor();
    }
}
function editdoctor(id) {
    listadoctors.forEach(doctor => {
        if (doctor.id == id) {
            currentdoctor = id;
            document.getElementById("div_form_doctor").style.visibility = "visible";
            document.getElementById('txtIddoctor').value = doctor.id;
            document.getElementById('txtNombredoctor').value = doctor.name;
            document.getElementById('txtEspecialidaddoctor').value = doctor.specialty;
            document.getElementById('txtYeardoctor').value = doctor.graduate_year;
            document.getElementById('txtDepdoctor').value = doctor.department_id;
        }
    });
}
function limpiarCamposdoctor() {
    document.getElementById('txtIddoctor').value = "";
    document.getElementById('txtNombredoctor').value = "";
    document.getElementById('txtEspecialidaddoctor').value = "";
    document.getElementById('txtYeardoctor').value = "";
    document.getElementById('txtDepdoctor').value = "";
    currentdoctor = 0;
}
function guardarDatosdoctor() {
    var url = urlDoctor+"/save";
    let nombre = document.getElementById('txtNombredoctor').value;
    let especialidad = document.getElementById('txtEspecialidaddoctor').value;
    let year = document.getElementById('txtYeardoctor').value;
    let dep = document.getElementById('txtDepdoctor').value;
    if (currentdoctor == 0) {
        //nuevo
        //{"department":"Pediatra","year":2005,"specialty":{"id":1},"name":"Mario Delgadillo","description":"DrMuelitas"}
        var data = {  name: nombre, specialty: {id:1}, year: year, department: dep ,description:"algo test"};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('doctor Creado');
            getdoctors();
            hidden_div_doctor();
        });
    } else {
        //editar
        let id = currentdoctor;
        var data = { id: id, name: nombre, specialty: especialidad, graduate_year: year, department_id: dep };
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('doctor Editado');
            getdoctors();
            hidden_div_doctor();
        });
    }
}

function show_div_doctor() {
    document.getElementById("div_form_doctor").style.visibility = "visible";
    limpiarCamposdoctor();
}
function hidden_div_doctor() {
    document.getElementById("div_form_doctor").style.visibility = "hidden";
    limpiarCamposdoctor();
}
