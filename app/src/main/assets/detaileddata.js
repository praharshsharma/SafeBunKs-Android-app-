window.onload = async function () {
  let data = Android.load_detailed_data();
  let dataarr = [];
  dataarr = JSON.parse(data);
  display(dataarr);
};



let display = async (dataarr) => {
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  dataarr.sort(GetSortOrder("date"));

  let table = document.getElementById("table");

  dataarr.forEach((currElement) => {
    let row = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.classList.add("date");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    td1.innerText = currElement.date;

    let presarr = currElement.presarr;
    let st = "";
    presarr.forEach((curr)=>{
        st += curr;
        st += ", ";
    })
    st = st.substring(0, st.length-2);
    td2.innerText = st;

    let notpresarr = currElement.notpresarr;
    st = "";
    notpresarr.forEach((curr)=>{
        st += curr;
        st += ", ";
    })
    st = st.substring(0, st.length-2);
    td3.innerText = st;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    table.appendChild(row);
  });
};




