function loadPage() {
    //alert('asas');



}
function consultar() {
    let email = document.getElementById('txtEmail').value;
    var urlNotas = 'https://g6c335b483ca254-bdgastosg16.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/notas/retos/';
    if (email == "") {
        alert('campo correo  es necesario');
    } else {


        var url = urlNotas + email;
        let ress = fetch(url, {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {

                let datatexto = '<table class="table table-striped"><thead><tr>';
                datatexto += '<th scope="col">Front R2</th>';
                datatexto += '<th scope="col">Front R3</th>';
                datatexto += '<th scope="col">Front R4</th>';
                datatexto += '<th scope="col">Front R5</th>';
                datatexto += '</tr></thead><tbody>';
                if (data.items.length > 0) {
                    data.items.forEach(admin => {
                        datatexto += "<tr>";
                        //datatexto += '<th scope="row">' + admin.id + '</th>';
                        datatexto += '<td>' + admin.frontend_reto2 + '</td>';
                        datatexto += '<td>' + admin.frontend_reto3 + '</td>';
                        datatexto += '<td>' + admin.frontend_reto4 + '</td>';
                        datatexto += '<td>' + admin.frontend_reto5 + '</td>';
                        datatexto += '</tr>';

                        datatexto += "<tr>";
                        //datatexto += '<th scope="row">' + admin.id + '</th>';
                        datatexto += '<td>' + admin.mensaje_r2 + '</td>';
                        datatexto += '<td>' + admin.mensaje_r3 + '</td>';
                        datatexto += '<td>' + admin.mensaje_r4 + '</td>';
                        datatexto += '<td>' + admin.mensaje_r5 + '</td>';
                        datatexto += '</tr>';
                    });

                    document.getElementById('txtNombre').innerHTML = "Estudiente:   " + data.items[0].nombre;
                    document.getElementById('txtNota').innerHTML = "Nota:   " + data.items[0].promedio;
                    datatexto += '</tbody></table>';
                    document.getElementById('div_data_admin').innerHTML = datatexto;
                } else {
                    document.getElementById('div_data_admin').innerHTML = "";
                    document.getElementById('txtNombre').innerHTML = "";
                    document.getElementById('txtNota').innerHTML = "";
                    alert('debes especificar un correo institucional valido');
                }

            });
    }
}