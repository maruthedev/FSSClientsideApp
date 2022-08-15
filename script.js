var table = document.getElementById('table');
const socket = SockJS('http://localhost:8080/topPrice');
const incColor = 'green';
const decColor = 'red';

// fake data
// var changeTemplate = [
//     {
//         "code": "AAA",
//         "dataSets": [
//             {
//                 "col": "t1m",
//                 "value": "10"
//             },
//             {
//                 "col": "t1b",
//                 "value": "20"
//             }
//         ]
//     },
//     {
//         "code": "BBB",
//         "dataSets": [
//             {
//                 "col": "t3m",
//                 "value": "5"
//             }
//         ]
//     }
// ]

function initData(data) {
    console.log('client is handling datas!')
    var datas = JSON.parse(data);
    console.log(datas);

    if (datas.listTP.length !== 0) {
        table.innerHTML +=
            `<tr>
            <td id="code${datas.symbol}">${datas.symbol}</td>
            <td id="tc${datas.symbol}">${datas.thamChieu}</td>
            <td id="tran${datas.symbol}">${datas.giaTran}</td>
            <td id="san${datas.symbol}">${datas.giaSan}</td>
            <td id="t1b${datas.symbol}">${datas.listTP.at(0).gia}</td>
            <td id="t1m${datas.symbol}">${datas.listTP.at(1).gia}</td>
            <td id="t2b${datas.symbol}">${datas.listTP.at(2).gia}</td>
            <td id="t2m${datas.symbol}">${datas.listTP.at(3).gia}</td>
            <td id="t3b${datas.symbol}">${datas.listTP.at(4).gia}</td>
            <td id="t3m${datas.symbol}">${datas.listTP.at(5).gia}</td>
            </tr>`;
    }
    else {
        table.innerHTML +=
            `<tr>
            <td id="code${datas.symbol}">${datas.symbol}</td>
            <td id="tc${datas.symbol}">${datas.thamChieu}</td>
            <td id="tran${datas.symbol}">${datas.giaTran}</td>
            <td id="san${datas.symbol}">${datas.giaSan}</td>
            <td id="t1b${datas.symbol}">Chua cap nhat</td>
            <td id="t1m${datas.symbol}">Chua cap nhat</td>
            <td id="t2b${datas.symbol}">Chua cap nhat</td>
            <td id="t2m${datas.symbol}">Chua cap nhat</td>
            <td id="t3b${datas.symbol}">Chua cap nhat</td>
            <td id="t3m${datas.symbol}">Chua cap nhat</td>
            </tr>`;
    }

    // setTimeout(() => socket.send('update'),
    //     5000);
}

function updateData(data) {
    var datas = JSON.parse(data);

    console.log(datas);

    var elMACK = document.getElementById(`code${datas.symbol}`).innerHTML = datas.symbol;
    var elTC = document.getElementById(`tc${datas.symbol}`).innerHTML = datas.thamChieu;
    var elTRAN = document.getElementById(`tran${datas.symbol}`).innerHTML = datas.giaTran;
    var elSAN = document.getElementById(`san${datas.symbol}`).innerHTML = datas.giaSan;
    var elT1B = document.getElementById(`t1b${datas.symbol}`).innerHTML = (datas.listTP.at(0).gia !== null ? datas.listTP.at(0).gia : document.getElementById(`t1b${datas.symbol}`).innerHTML);
    var elT1M = document.getElementById(`t1m${datas.symbol}`).innerHTML = (datas.listTP.at(1).gia !== null ? datas.listTP.at(1).gia : document.getElementById(`t1m${datas.symbol}`).innerHTML);
    var elT2B = document.getElementById(`t2b${datas.symbol}`).innerHTML = (datas.listTP.at(2).gia !== null ? datas.listTP.at(2).gia : document.getElementById(`t2b${datas.symbol}`).innerHTML);
    var elT2M = document.getElementById(`t2m${datas.symbol}`).innerHTML = (datas.listTP.at(3).gia !== null ? datas.listTP.at(3).gia : document.getElementById(`t2m${datas.symbol}`).innerHTML);
    var elT3B = document.getElementById(`t3b${datas.symbol}`).innerHTML = (datas.listTP.at(4).gia !== null ? datas.listTP.at(4).gia : document.getElementById(`t3b${datas.symbol}`).innerHTML);
    var elT3M = document.getElementById(`t3m${datas.symbol}`).innerHTML = (datas.listTP.at(5).gia !== null ? datas.listTP.at(5).gia : document.getElementById(`t3m${datas.symbol}`).innerHTML);



    // reset color
    setTimeout(() => {
        var tds = table.querySelectorAll('td');
        tds.forEach(td => {
            td.style.backgroundColor = 'transparent'
        });
    }, 200);
}

function startApp() {
    socket.onopen = function () {
        console.log('connected!')
        socket.send('init');
    }

    socket.onmessage = function (ev) {
        var status = JSON.parse(ev.data).status;
        console.log(status);
        if (status === 'create') {
            initData(ev.data);
        }
        if (status === 'update') {
            updateData(ev.data);
        }

    }
}

startApp();
