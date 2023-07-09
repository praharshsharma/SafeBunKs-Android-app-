let pres = document.getElementById("pres");
let notpres = document.getElementById("notpres");
let currDate = document.getElementById("currdate");
//var today = new Date().toISOString().split('T')[0];

var today = new Date().toLocaleDateString();

const parts = today.split("/");
const formattedDate = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;

currDate.value = formattedDate;

//let myarr=[{name:"OOT",val:[0,0]},{name:"ojk",val:[0,0]},{name:"hghfty",val:[0,0]}];
let myarr=[];
let detailedDataArr = [];

 window.onload = function(){
     let data = Android.load_data();
     let detailedData = Android.load_detailed_data();
     let detailedDataAr = [];
     if(detailedData)
     {
         detailedDataAr = JSON.parse(detailedData);
         detailedDataArr = detailedDataAr;

         //document.getElementById("tp").append(JSON.stringify(detailedDataArr));
     }

     if(data){
         get_data(data);
     }
 }

let allbtns = [];
let get_data = async (d) => {
    //data = d;
     let data = []
     data = JSON.parse(d);
     myarr=data;
    for (let i = 0; i < data.length; i++) {
        var box = document.createElement("div");
        box.classList.add("box");
        var subcard = document.createElement("button");
        subcard.innerHTML = data[i].name;
        let classname = data[i].name.replaceAll(' ','');
        subcard.setAttribute("class", `${classname}`);
        subcard.classList.add("subject");
        subcard.classList.add("present");
        var inp = document.createElement("input");
        inp.setAttribute("type","number");
        inp.setAttribute("id",`pres${classname}`);
        inp.setAttribute("placeholder" , 1);
        inp.classList.add("hide");
        box.appendChild(subcard);
        box.appendChild(inp);
        pres.appendChild(box);
    }

    for (let i = 0; i < data.length; i++) {
        var box = document.createElement("div");
        box.classList.add("box");
        var subcard = document.createElement("button");
        subcard.innerHTML = data[i].name;
        let classname = data[i].name.replaceAll(' ','');
        subcard.setAttribute("class", `${classname}`);
        subcard.classList.add("subject");
        subcard.classList.add("notpresent");
        var inp = document.createElement("input");
        inp.setAttribute("type","number");
        inp.setAttribute("id",`notpres${classname}`);
        inp.setAttribute("placeholder" , 1);
        inp.classList.add("hide");
        box.appendChild(subcard);
        box.appendChild(inp);
        notpres.appendChild(box);
    }

    //allbtns = document.getElementsByClassName("subject");

    //document.getElementById("tp").append(allbtns.length);
    // console.log(allbtns);
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach((currElement) => {
        var classofcurr = currElement.classList[0];
        currElement.addEventListener("click", () => {
            currElement.classList.toggle("selected");
            if(currElement.classList.contains("present"))
            {
                document.getElementById(`pres${classofcurr}`).classList.toggle("hide");
            }
            else
            {
                document.getElementById(`notpres${classofcurr}`).classList.toggle("hide");
            }
        })
    })

}
//get_data(myarr);

//allbtns = document.getElementsByClassName("subject");




//console.log(pressub);
function modifyjson() {
        let presarr = [];
        let notpresarr = [];
        currDate = document.getElementById("currdate").value;
        let flag = 0;
        detailedDataArr.forEach((currElement)=>{
            if(currElement.date == currDate)
            {
                flag = 1;
                presarr = currElement.presarr;
                notpresarr = currElement.notpresarr;
            }
        });


        let pressub = pres.querySelectorAll(".subject");
        let notpressub = notpres.querySelectorAll(".subject");
        pressub.forEach((currElement) => {
            if (currElement.classList.length > 3) {
                for (let i = 0; i < myarr.length; i++) {
                    if (myarr[i].name.replaceAll(' ','') == currElement.classList[0]) {
                        let val = document.getElementById(`pres${currElement.classList[0]}`).value;
                        if(val=="") val = 1;
                        for(let j=0;j<val;j++) presarr.push(myarr[i].name);
                        let v = Number(val);
                        myarr[i].val[0]+= v;
                        myarr[i].val[1]+= v;
                    }
                }
            }
        })

        notpressub.forEach((currElement) => {

            if (currElement.classList.length > 3) {
                for (let i = 0; i < myarr.length; i++) {
                    if (myarr[i].name.replaceAll(' ','') == currElement.classList[0]) {
                        let val = document.getElementById(`notpres${currElement.classList[0]}`).value;
                        if(val=="") val = 1;
                        for(let j=0;j<val;j++) notpresarr.push(myarr[i].name);
                        let v = Number(val);
                        myarr[i].val[1]+= v;
                    }
                }
            }
        })

        if(flag==0)
        {
            let obj = {date:currDate , presarr:[] , notpresarr:[]};
            obj.presarr = presarr;
            obj.notpresarr = notpresarr;
            detailedDataArr.push(obj);
        }
        else
        {
            detailedDataArr.forEach((currElement)=>{
                if(currElement.date == currDate)
                {

                    currElement.presarr = presarr;
                    currElement.notpresarr = notpresarr;
                }
            });
        }

        console.log(myarr);
        Android.add_detailed_data(JSON.stringify(detailedDataArr));
        Android.add_data(JSON.stringify(myarr));
        Android.displayToast("Attendance added");
        location.replace("./index.html")
}