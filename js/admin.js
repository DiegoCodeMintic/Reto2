
function show_div_admin() {
    document.getElementById("div_form_admin").style.visibility = "visible";
    limpiarCamposAdmin();
}
function hidden_div_admin() {
    document.getElementById("div_form_admin").style.visibility = "hidden";
    limpiarCamposAdmin();
}

function limpiarCamposAdmin() {
    document.getElementById('txtIdAdmin').value = "";
    document.getElementById('txtAdminNombre').value = "";
    document.getElementById('txtAdminPassword').value = "";
    currentAdmin = 0;
}

function getAdmin() {
    var url = urlAdmin+"/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaAdmin = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">admin</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(admin => {
                    datatexto += "<tr>";
                    //datatexto += '<th scope="row">' + admin.id + '</th>';
                    datatexto += '<td>' + admin.name + '</td>';

                    datatexto += '<td><button class="btn btn-primary" onclick="editAdmin(' + admin.id + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteAdmin(' + admin.id + ')" > X</button></td>';
                    datatexto += '</tr>';
                });
            }
            datatexto += '</tbody></table>';
            document.getElementById('div_data_admin').innerHTML = datatexto;
        });
        //return listaAdmines;
}

function deleteAdmin(id) {
    // var opcion = confirm("Seguro que desea eliminar?");
    // if (opcion == true) {
    //     var data = { id: id };
    //     var url = urlAdmins;
    //     fetch(url, {
    //         method: 'DELETE',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     getAdmins();
    //     hidden_div_admin();
    // }
    alert("función no disponible aún en este reto ");
}
function editAdmin(id) {
    //alert(listaAdmines.length);
    //getListaEspecialty();
    listaAdmin.forEach(admin => {
        if (admin.id == id) {
            currentAdmin = id;
            //localStorage.setItem('diego','roberto');
            document.getElementById("div_form_admin").style.visibility = "visible";
            document.getElementById('txtIdAdmin').value = admin.id;
            document.getElementById('txtAdminNombre').value = admin.name;
            document.getElementById('txtAdminPassword').value = admin.password;
        }
    });
}

function guardarDatosAdmin() {
    var url = urlAdmin+"/save";
    let name = document.getElementById('txtAdminNombre').value;
    let password = document.getElementById('txtAdminPassword').value;

    if (currentAdmin == 0) {
        //nuevo
        //{"name":"cat1","description":"test category"}
        var data = {  name: name,password:password };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            alert('admin Creado');
            getAdmin();
            hidden_div_admin();
        });
    } else {
        //editar
        alert("función no disponible aún en este reto ");
        // let id = currentAdmin;
        // var data = { id: id, name: admin,description:descripcion };
        // fetch(url, {
        //     method: 'PUT',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(() => {
        //     alert('admin Editado');
        //     getAdmin();
        //     hidden_div_admin();
        // });
    }
}