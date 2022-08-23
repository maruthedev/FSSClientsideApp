var table = document.getElementById('table');
const socket = SockJS('http://192.168.193.222:8080/register');
const api = "http://192.168.193.222:8080/stockInfo";
const incColor = 'pink';

async function initData() {
    await fetch(api, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            console.log(json);
            json.forEach(item => {
                console.log(item);
                table.innerHTML +=
                    `<tr id="line${item.symbol}">
                        <td id="code${item.symbol}">${item.symbol}</td>
                        <td id="tc${item.symbol}">${item.thamChieu}</td>
                        <td id="tran${item.symbol}">${item.giaTran}</td>
                        <td id="san${item.symbol}">${item.giaSan}</td> 
                        <td id="t1b${item.symbol}"></td>
                        <td id="t1m${item.symbol}"></td>
                        <td id="t2b${item.symbol}"></td>
                        <td id="t2m${item.symbol}"></td>
                        <td id="t3b${item.symbol}"></td>
                        <td id="t3m${item.symbol}"></td> 
                    </tr> `
                    ;

                if (item.listTP.length > 0) {
                    item.listTP.forEach(i => {
                        console.log(i);
                        if (i.top == "1" && i.ben == "Offer") {
                            var el = document.getElementById(`t1b${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }

                        if (i.top == "1" && i.ben == "Bid") {
                            var el = document.getElementById(`t1m${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }

                        if (i.top == "2" && i.ben == "Offer") {
                            var el = document.getElementById(`t2b${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }

                        if (i.top == "2" && i.ben == "Bid") {
                            var el = document.getElementById(`t2m${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }

                        if (i.top == "3" && i.ben == "Offer") {
                            var el = document.getElementById(`t3b${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }

                        if (i.top == "3" && i.ben == "Bid") {
                            var el = document.getElementById(`t3m${item.symbol}`);
                            if (parseInt(el.innerHTML) !== parseInt(i.gia)) {
                                el.innerHTML = i.gia;
                            }
                        }
                    })
                }
            })

            setTimeout(() => socket.send('update'),
                2000);
        })
        .catch(ex => console.log(ex));
}

function updateData(data) {
    var datas = JSON.parse(data);

    console.log(datas);

    var elMACK = document.getElementById(`code${datas.symbol}`);
    elMACK.innerHTML = datas.symbol;
    console.log(datas.symbol)
    document.getElementById(`tc${datas.symbol}`).innerHTML = datas.thamChieu;
    document.getElementById(`tran${datas.symbol}`).innerHTML = datas.giaTran;
    document.getElementById(`san${datas.symbol}`).innerHTML = datas.giaSan;

    datas.listTP.forEach(item => {
        console.log(item);
        if (item.top == "1" && item.ben == "Offer") {
            var el = document.getElementById(`t1b${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        if (item.top == "1" && item.ben == "Bid") {
            var el = document.getElementById(`t1m${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        if (item.top == "2" && item.ben == "Offer") {
            var el = document.getElementById(`t2b${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        if (item.top == "2" && item.ben == "Bid") {
            var el = document.getElementById(`t2m${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        if (item.top == "3" && item.ben == "Offer") {
            var el = document.getElementById(`t3b${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        if (item.top == "3" && item.ben == "Bid") {
            var el = document.getElementById(`t3m${datas.symbol}`);
            if (parseInt(el.innerHTML) !== parseInt(item.gia)) {
                el.innerHTML = item.gia;
                el.style.backgroundColor = incColor;
            }
        }

        // reset color
        setTimeout(() => {
            var tds = table.querySelectorAll('td');
            tds.forEach(td => {
                td.style.backgroundColor = 'transparent'
            });
        }, 2000);
    });


}

function startApp() {
    initData()
        .then(socketOnUpdate);
}

function socketOnUpdate() {
    socket.onopen = function () {
        console.log('connected!');
    };

    var webstompClient = webstomp.over(socket);

    webstompClient.connect({
    }, frame => {
        console.log('webstomp is connected!');
        webstompClient.subscribe('/topic/topPrice', message => {
            updateData(message.body);
        })
    })
}

startApp();