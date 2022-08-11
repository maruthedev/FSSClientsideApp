var table = document.getElementById('table');
var initWebSocket = new WebSocket(""); // khoi tao
var updateWebSocket = new WebSocket(""); // thay doi
// const incColor = 'green';
// const decColor = 'red';

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

async function clientReady() {
    initWebSocket.onopen = await function () {
        initWebSocket.send('init');
    }
}

async function initData() {
    initWebSocket.onmessage = await function (ev) {
        var datas = JSON.parse(ev.data);
        datas.forEach(data => {
            table.innerHTML +=
                `<tr>
                <td id="code${data.code}">${data.code}</td>
                <td id="tc${data.code}">${data.dataSets[0].value}</td>
                <td id="tran${data.code}">${data.dataSets[1].value}</td>
                <td id="san${data.code}">${data.dataSets[2].value}</td>
                <td id="t1m${data.code}">${data.dataSets[3].value}</td>
                <td id="t1b${data.code}">${data.dataSets[4].value}</td>
                <td id="t2m${data.code}">${data.dataSets[5].value}</td>
                <td id="t2b${data.code}">${data.dataSets[6].value}</td>
                <td id="t3m${data.code}">${data.dataSets[7].value}</td>
                <td id="t3b${data.code}">${data.dataSets[8].value}</td>
                </tr>`;
        });
    }
}

async function updateData() {
    // websocket
    updateWebSocket.onmessage = await function (ev) {
        var datas = JSON.parse(ev.data);
        for (var i = 0; i < datas.length; i++) {
            for (var j = 0; j < datas.at(i).dataSets.length; j++) {
                // update data
                var cid = datas.at(i).dataSets.at(j).col + "" + datas.at(i).code;
                var el = document.getElementById(`${cid}`);
                el.innerHTML = parseInt(datas.at(i).dataSets.at(j).value);

                // update color
                el.style.backgroundColor = incColor;

                // return color to transparent
                setTimeout(() => {
                    el.style.backgroundColor = 'transparent';
                }, 200);
            }
        }
    }

    // fake data changes
    // setInterval(function () {
    //     console.log('update');
    //     changeTemplate.at(0).dataSets.at(0).value
    //         = parseInt(changeTemplate.at(0).dataSets.at(0).value) + 5;

    //     changeTemplate.at(0).dataSets.at(1).value
    //         = parseInt(changeTemplate.at(0).dataSets.at(1).value) + 15;

    //     changeTemplate.at(1).dataSets.at(0).value
    //         = parseInt(changeTemplate.at(1).dataSets.at(0).value) + 1;


    //     for (var i = 0; i < changeTemplate.length; i++) {
    //         for (var j = 0; j < changeTemplate.at(i).dataSets.length; j++) {
    //             // update data
    //             var cid = changeTemplate.at(i).dataSets.at(j).col + "" + changeTemplate.at(i).code;
    //             var el = document.getElementById(`${cid}`);
    //             el.innerHTML = parseInt(changeTemplate.at(i).dataSets.at(j).value);

    //             // update color
    //             el.style.backgroundColor = incColor;

    //             // return color to transparent
    //             setTimeout(() => {
    //                 el.style.backgroundColor = 'transparent';
    //             }, 200);
    //         }
    //     }
    // }, 1000);
}

function startApp() {
    clientReady()
        .then(initData)
        .then(function () {
            updateWebSocket.send('update');
        })
        .then(updateData)
        .catch(ex => console.log(ex));
}

startApp();
