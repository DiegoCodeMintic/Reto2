//FUNCIONES DE CLIENTE
function show_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "visible";
    document.getElementById("txtEmailCliente").disabled = false;
    limpiarCamposCliente();
}
function hidden_div_cliente() {
    document.getElementById("div_form_cliente").style.visibility = "hidden";
    limpiarCamposCliente();
}
function getClientes() {

    var el;
    el = document.getElementById('txtNombreCliente');
    el.addEventListener('keyup', countCharactersCliente, false);

    var url = urlCliente + "/all";
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            listaClientes = data;
            let datatexto = '<table class="table table-striped"><thead><tr><th scope="col">Nombre</th><th scope="col">Email</th><th scope="col">Edad</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';
            if (data.length > 0) {
                data.forEach(cliente => {
                    datatexto += "<tr>";
                    //datatexto += '<th scope="row">' + cliente.idClient + '</th>';
                    datatexto += '<td>' + cliente.name + '</td>';
                    datatexto += '<td>' + cliente.email + '</td>';
                    datatexto += '<td>' + cliente.age + '</td>';
                    datatexto += '<td><button class="btn btn-primary" onclick="editCliente(' + cliente.idClient + ')"  >Editar</button></td>';
                    datatexto += '<td><button class="btn btn-danger" onclick="deleteCliente(' + cliente.idClient + ')" > X</button></td>';
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
        var delInfo = true;
        listaClientes.forEach(element => {
            if (element.idClient == id) {
                if (element.messages.length > 0 || element.reservations.length > 0) {
                    delInfo = false;

                }
            }
        });
        if (delInfo) {
            var url = urlCliente + '/' + id;
            fetch(url, {
                method: 'DELETE',
                //body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                getClientes();
                hidden_div_cliente();
            });
        } else {
            alert("NO se puede eliminar este cliente porque tiene MENSAJES o RESERVAS\nElimine estos antes de borrar este registro");
        }
    }

}
function editCliente(id) {
    listaClientes.forEach(cliente => {
        if (cliente.idClient == id) {
            currentCliente = id;
            document.getElementById("div_form_cliente").style.visibility = "visible";
            document.getElementById('txtIdCliente').value = cliente.idClient;
            document.getElementById('txtNombreCliente').value = cliente.name;
            document.getElementById('txtEmailCliente').value = cliente.email;
            document.getElementById('txtEdadCliente').value = cliente.age;
            countRemaining = document.getElementById('lblCountLettersCliente');
            countRemaining.textContent = cliente.name.length + "/250";
            document.getElementById("txtEmailCliente").disabled = true;
        }
    });
}
function limpiarCamposCliente() {
    document.getElementById('txtIdCliente').value = "";
    document.getElementById('txtNombreCliente').value = "";
    document.getElementById('txtEmailCliente').value = "";
    document.getElementById('txtEdadCliente').value = "";
    document.getElementById('txtPassCliente').value = "";
    currentCliente = 0;

    countRemaining = document.getElementById('lblCountLettersCliente');
    countRemaining.textContent = "0/250";
}
function guardarDatos() {
    var url = urlCliente + "/save";
    let nombre = document.getElementById('txtNombreCliente').value;
    let email = document.getElementById('txtEmailCliente').value;
    let edad = document.getElementById('txtEdadCliente').value;
    let pass = document.getElementById('txtPassCliente').value;
    if (currentCliente == 0) {
        //nuevo
        //{"name":"Agustin Parra","email":"agustin@gmail.com","password":"agustin123","age":18}
        var data = { id: 0, name: nombre, email: email, age: edad, password: pass };
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

        url = urlCliente + "/update";
        let id = currentCliente;
        var data = { idClient: id, name: nombre, email: email, password: pass, age: edad };
        //{"idClient":1,"name":"Adeodato Sanchez","email":"agustin@gmail.com","password":"adeodato123","age":15}
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

//nuevo en reto4
function countCharactersCliente(e) {
    var textEntered, countRemaining, counter;
    textEntered = document.getElementById('txtNombreCliente').value;
    counter = textEntered.length;
    countRemaining = document.getElementById('lblCountLettersCliente');
    countRemaining.textContent = counter + "/250";
}