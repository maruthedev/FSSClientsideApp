var table = document.getElementById('table');
const socket = SockJS('http://localhost:8080/topPrice');
const incColor = 'green';
const decColor = 'red';

// fake data
var changeTemplate = [
    {
        "code": "AAA",
        "dataSets": [
            {
                "col": "t1m",
                "value": "10"
            },
            {
                "col": "t1b",
                "value": "20"
            }
        ]
    },
    {
        "code": "BBB",
        "dataSets": [
            {
                "col": "t3m",
                "value": "5"
            }
        ]
    }
]

function initData(data) {
    console.log('client is handling datas!')
    // var datas = JSON.parse(ev.data);
    // datas.forEach(data => {
    //     table.innerHTML +=
    //         `<tr>
    //         <td id="code${data.code}">${data.code}</td>
    //         <td id="tc${data.code}">${data.dataSets[0].value}</td>
    //         <td id="tran${data.code}">${data.dataSets[1].value}</td>
    //         <td id="san${data.code}">${data.dataSets[2].value}</td>
    //         <td id="t1m${data.code}">${data.dataSets[3].value}</td>
    //         <td id="t1b${data.code}">${data.dataSets[4].value}</td>
    //         <td id="t2m${data.code}">${data.dataSets[5].value}</td>
    //         <td id="t2b${data.code}">${data.dataSets[6].value}</td>
    //         <td id="t3m${data.code}">${data.dataSets[7].value}</td>
    //         <td id="t3b${data.code}">${data.dataSets[8].value}</td>
    //         </tr>`;
    // });

    setTimeout(() => socket.send('update'),
        5000);
}

function updateData(data) {
    setInterval(() => {
        console.log('client is updating data!');

        // fake data change
        console.log('update');
        changeTemplate.at(0).dataSets.at(0).value
            = parseInt(changeTemplate.at(0).dataSets.at(0).value) + 5;

        changeTemplate.at(0).dataSets.at(1).value
            = parseInt(changeTemplate.at(0).dataSets.at(1).value) + 15;

        changeTemplate.at(1).dataSets.at(0).value
            = parseInt(changeTemplate.at(1).dataSets.at(0).value) + 1;


        // var datas = JSON.parse(data);

        for (var i = 0; i < changeTemplate.length; i++) {
            for (var j = 0; j < changeTemplate.at(i).dataSets.length; j++) {
                // update data
                var cid = changeTemplate.at(i).dataSets.at(j).col + "" + changeTemplate.at(i).code;
                var el = document.getElementById(`${cid}`);
                el.innerHTML = parseInt(changeTemplate.at(i).dataSets.at(j).value);

                // update color
                el.style.backgroundColor = incColor;
            }
        }

        // reset color
        setTimeout(() => {
            var tds = table.querySelectorAll('td');
            tds.forEach(td => {
                td.style.backgroundColor = 'transparent'
            });
        }, 200);

    }, 1000);
}

function startApp() {
    socket.onopen = function () {
        console.log('connected!')
        socket.send('init');
    }

    socket.onmessage = function (ev) {
        console.log(ev.data);
        if (ev.data === 'INIT DATA FROM SERVER!') {
            initData(ev.data);
        }
        if (ev.data === 'UPDATE DATA...') {
            updateData(ev.data);
        }

    }
}

startApp();
