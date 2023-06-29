window.onload = async function(){
    let data = Android.load_detailed_data();
    //document.getElementById("tp").append(data);
    let dataarr = []
    dataarr = JSON.parse(data);


    function GetSortOrder(prop) {
                return function(a, b) {
                    if (a[prop] > b[prop]) {
                        return 1;
                    } else if (a[prop] < b[prop]) {
                        return -1;
                    }
                    return 0;
                }
            }
    dataarr.sort(GetSortOrder("date"));

    let table = document.getElementById("table");
    //document.getElementById("tp").append(JSON.stringify(dataarr[0]));
    dataarr.forEach((currElement)=>{
        let row = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.innerText = currElement.date;
        td2.innerText = JSON.stringify(currElement.presarr);
        td3.innerText = JSON.stringify(currElement.notpresarr);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        table.appendChild(row);
    })
}
