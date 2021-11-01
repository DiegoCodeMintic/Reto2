function getReporte1() {
    var fechaInicio = document.getElementById("datepicker_inicio_reporte").value;
    var fechaFin = document.getElementById("datepicker_final_reporte").value;
    //http://150.230.69.0:8080/api/Reservation/report-dates/2020-01-01/2020-12-31

    var url = urlReservation + "/report-dates/" + fechaInicio + "/" + fechaFin;
    let ress = fetch(url, {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {
            var densityCanvas0 = document.getElementById("popChart");

            var a = 0;
            var b = 0;
            var c = 0;
            var d = 0;

            if (data.length > 0) {
                data.forEach(reservacion => {
                    switch (reservacion.status) {
                        case 'create':
                            a++;
                            break;
                        case 'completed':
                            b++;
                            break;
                        case 'cancelled':
                            c++;
                            break;
                        case 'programed':
                            d++;
                            break;
                    }

                });
            }

            var densityData0 = {
                label: 'Cantidad de reservas segun estado ',
                data: [a, b, c, d]
            };
            var barChart0 = new Chart(densityCanvas0, {
                type: 'bar',
                data: {
                    labels: ["Creadas", "completadas", "Canceladas", "Programada"],
                    datasets: [densityData0]
                },
            });
        });
}


let barChart2;

function getReporte2() {
    //http://150.230.69.0:8080/api/Reservation/report-status
    var url = urlReservation + "/report-status";
    fetch(url, {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {
            var densityCanvas2 = document.getElementById("densityChart1");
            if (barChart2) {
                barChart2.destroy();
            }
            barChart2 = new Chart(densityCanvas2, {
                type: 'doughnut',
                data: {
                    labels: ['Completadas', 'Canceladas'],
                    datasets: [{
                        label: 'Dataset 1',
                        data: [data.completed, data.cancelled],
                        backgroundColor: [
                            'rgb(33, 191, 41)',
                            'rgb(248, 92, 9)'
                        ],
                    }]
                }

            });
        });
}

let barChart1;

function getReporte3() {
    //http://150.230.69.0:8080/api/Reservation/report-clients
    var url = urlReservation + "/report-clients";
    fetch(url, {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {

            var cantidadReservas = [];
            var labelsData = [];
            if (data.length > 0) {
                data.forEach(reservacion => {

                    cantidadReservas.push(reservacion.total);
                    labelsData.push(reservacion.client.name);



                });
            }


            var densityCanvas1 = document.getElementById("densityChart");
            var densityData1 = {
                label: 'Cantidad de reservas:',
                data: cantidadReservas,
                backgroundColor: [
                    'rgba(0, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 99, 132, 1)'
                ],
                borderWidth: 2,
                hoverBorderWidth: 0
            };

            if (barChart1) {
                barChart1.destroy();
            }

            barChart1 = new Chart(densityCanvas1, {
                type: 'bar',
                data: {
                    labels: labelsData,
                    datasets: [densityData1],
                },
                options: {
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: false,

                },
            });
        });
}