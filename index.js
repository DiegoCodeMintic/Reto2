function press() {
    //alert('si');
    var url = 'https://g8b329f59e9c137-db202109230709.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor'

    //fetch(url).then((Response)=>alert(Response))

    //var url= 'http://'+getIpRemoto()+'/api/local/Obtener_Todo?IdCC='+IdCC+'&Cantidad=0';
    let ress = fetch(url, {
        method: 'GET',
    }).then(response => response.json())
        .then(data => {
            console.log("DATA:");
            data.items.forEach(Doctor => {
                console.log(Doctor.id);
            });
        });
}

function press1() {
    
    var url = 'https://g8b329f59e9c137-db202109230709.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor'

    

    //{"id":1,"specialty":"Pediatra","graduate_year":2005,"department_id":3,"name":"Mario TALES"}
    var data = { id: 100,specialty:'specialty',graduate_year:2222 ,department_id:9898,name:'name'};

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(()=>{
        press();
    });
        
}

//{"id":2,"specialty":"Odontologo","graduate_year":2011,"department_id":1,"name":"Aleja Guevara"}