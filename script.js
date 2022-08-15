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

    setTimeout(() => socket.send('update'),
        2000);
}

function updateData(data) {
    var datas = JSON.parse(data);

    console.log(datas);

    var elMACK = document.getElementById(`code${datas.symbol}`).innerHTML = datas.symbol;
    console.log(datas.symbol)
    document.getElementById(`tc${datas.symbol}`).innerHTML = datas.thamChieu;
    document.getElementById(`tran${datas.symbol}`).innerHTML = datas.giaTran;
    document.getElementById(`san${datas.symbol}`).innerHTML = datas.giaSan;

    datas.listTP.forEach(item => {
        console.log(item);
        if (item.top == "1" && item.ben == "Offer") {
            document.getElementById(`t1b${elMACK}`).innerHTML = item.gia;
        }

        if (item.top == "1" && item.ben == "Bid") {
            document.getElementById(`t1m${elMACK}`).innerHTML = item.gia;
        }

        if (item.top == "2" && item.ben == "Offer") {
            document.getElementById(`t2b${elMACK}`).innerHTML = item.gia;
        }

        if (item.top == "2" && item.ben == "Bid") {
            document.getElementById(`t2m${elMACK}`).innerHTML = item.gia;
        }

        if (item.top == "3" && item.ben == "Offer") {
            document.getElementById(`t3b${elMACK}`).innerHTML = item.gia;
        }

        if (item.top == "3" && item.ben == "Bid") {
            document.getElementById(`t3m${elMACK}`).innerHTML = item.gia;
        }
    });

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


/*
{top: '2', ben: 'Bid', gia: '6400', khoiLuong: '700'}
{top: '3', ben: 'Offer', gia: '7400', khoiLuong: '500'}
{top: '3', ben: 'Bid', gia: '6300', khoiLuong: '1500'}
*/