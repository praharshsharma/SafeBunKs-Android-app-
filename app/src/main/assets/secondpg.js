let pres = document.getElementById("pres");
let notpres = document.getElementById("notpres");
let currDate = document.getElementById("currdate");
var today = new Date().toISOString().split('T')[0];
currDate.value = today;
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
        var subcard = document.createElement("button");
        subcard.innerHTML = data[i].name;
        let classname = data[i].name.replaceAll(' ','');
        subcard.setAttribute("class", `${classname}`);
        subcard.classList.add("subject");
        pres.appendChild(subcard);
    }

    for (let i = 0; i < data.length; i++) {
        var subcard = document.createElement("button");
        subcard.innerHTML = data[i].name;
        let classname = data[i].name.replaceAll(' ','');
        subcard.setAttribute("class", `${classname}`);
        subcard.classList.add("subject");
        notpres.appendChild(subcard);
    }

    //allbtns = document.getElementsByClassName("subject");

    //document.getElementById("tp").append(allbtns.length);
    // console.log(allbtns);
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach((currElement) => {
        var classofcurr = currElement.classList[0];
        currElement.addEventListener("click", () => {
            var selectsubbtn = document.querySelectorAll(`.${classofcurr}`);
            for (let i = 0; i < 2; i++) {
                if (currElement != selectsubbtn[i]) {
                    selectsubbtn[i].classList.remove("selected");
                }
                if (currElement == selectsubbtn[i]) {
                    if (selectsubbtn[i].classList.length > 2) {
                        selectsubbtn[i].classList.remove("selected");
                    }
                    else {
                        selectsubbtn[i].classList.add("selected");
                    }
                }
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
            if (currElement.classList.length == 3) {
                for (let i = 0; i < myarr.length; i++) {
                    if (myarr[i].name.replaceAll(' ','') == currElement.classList[0]) {
                        presarr.push(myarr[i].name);
                        myarr[i].val[0]++;
                        myarr[i].val[1]++;
                    }
                }
            }
        })

        notpressub.forEach((currElement) => {

            if (currElement.classList.length == 3) {
                for (let i = 0; i < myarr.length; i++) {
                    if (myarr[i].name.replaceAll(' ','') == currElement.classList[0]) {
                        notpresarr.push(myarr[i].name);
                        myarr[i].val[1]++;
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

        //console.log(myarr);
        Android.add_detailed_data(JSON.stringify(detailedDataArr));
        Android.add_data(JSON.stringify(myarr));

        location.replace("./index.html")
}