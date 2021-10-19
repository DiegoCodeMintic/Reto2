//FUNCIONES DE CLIENTE
function show_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "visible";
    limpiarCamposCliente();
}
function hidden_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "hidden";
    limpiarCamposCliente();
}
function getClientes() {
    var url = urlClientes;
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaClientes = data.items;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Email</th><th scope="col">Edad</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.items.length > 0) {
                data.items.forEach(cliente => {
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
    var opcion = confirm("Seguro que desea eliminar?");
    if (opcion == true) {
        var data = { id: id };
        var url = urlClientes;
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
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
    currentCliente = 0;
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
            method: 'POST',
            body: JSON.stringify(data),
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
            method: 'PUT',
            body: JSON.stringify(data),
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
