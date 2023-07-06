let pres = document.getElementById("pres");
let notpres = document.getElementById("notpres");
let currDate = document.getElementById("currdate");
var today = new Date().toISOString().split('T')[0];
currDate.value = today;
let row = document.getElementsByClassName("row");
let msg = document.getElementById("msg");
let submitbutton = document.getElementById("submitbutton");
let cleard = document.getElementById("cleard");
let myarr = [];
let detailedDataArr = [];
// myarr = [{ name: "OOT", val: [4, 4] }, { name: "ojk", val: [3, 3] }, { name: "hghfty", val: [0, 1] }, { name: "DBMS LAB", val: [0, 3] }, { name: "poiuytrewq", val: [2, 2] }, { name: "QWERTYUIOP", val: [1, 1] }];
// detailedDataArr = [{ date: "2023-07-06", presarr: ["OOT", "ojk", "OOT"], notpresarr: ["hghfty", "DBMS LAB"] }, { date: "2023-06-16", presarr: ["OOT", "ojk", "poiuytrewq"], notpresarr: ["DBMS LAB"] }, { date: "2023-06-29", presarr: ["OOT", "ojk", "poiuytrewq", "QWERTYUIOP"], notpresarr: ["DBMS LAB"] }]

window.onload = async function () {
    let data = Android.load_data();
    let detailedData = Android.load_detailed_data();
    let detailedDataAr = [];
    if (detailedData) {
        detailedDataAr = JSON.parse(detailedData);
        detailedDataArr = detailedDataAr;

        //document.getElementById("tp").append(JSON.stringify(detailedDataArr));
    }
    if (data) {
        let d = [];
        d = JSON.parse(data);
        myarr = d;
    }
}

let allbtns = [];
async function showifpresent() {
    currDate = document.getElementById("currdate").value;
    let flag = 0;
    let present = [];
    let notpresent = [];
    detailedDataArr.forEach(async (currElement) => {
        if (currElement.date == currDate) {
            flag = 1;
            pres.innerHTML = "<p>Present</p>"; notpres.innerHTML = "<p>Absent</p>";
            row[0].classList.remove("hide");
            msg.classList.add("hide");
            present = currElement.presarr;
            present.sort();
            notpresent = currElement.notpresarr;
            notpresent.sort();
            console.log(currElement);
            console.log(myarr);
        }
    });

    if (flag == 0) {
        row[0].classList.add("hide");
        msg.classList.remove("hide");
        msg.innerHTML = "No record found for the date entered";
    }

    for (let i = 0; i < present.length; i++) {
        var subcard = document.createElement("button");
        subcard.innerHTML = present[i];
        let classname = present[i].replaceAll(' ', '');
        subcard.setAttribute("class", `pres${i}`);
        subcard.classList.add("subject");
        pres.appendChild(subcard);

        var preschoices = document.createElement("div");
        preschoices.setAttribute("class", `pres${i}`);
        preschoices.classList.add("preschoices");
        pres.appendChild(preschoices);
    }

    for (let i = 0; i < notpresent.length; i++) {
        var subcard = document.createElement("button");
        subcard.innerHTML = notpresent[i];
        let classname = notpresent[i].replaceAll(' ', '');
        subcard.setAttribute("class", `notpres${i}`);
        subcard.classList.add("subject");
        notpres.appendChild(subcard);

        var notpreschoices = document.createElement("div");
        notpreschoices.setAttribute("class", `notpres${i}`);
        notpreschoices.classList.add("notpreschoices");
        notpres.appendChild(notpreschoices);
    }

    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach(async (currElement) => {
        currElement.addEventListener("click", async () => {
            var classofcurr = currElement.classList[0];
            if (currElement.classList[2] == "selected") {
                currElement.classList.remove("selected");
                if (currElement.classList.length > 2) {
                    currElement.classList.remove(currElement.classList[currElement.classList.length - 1]);
                }
            }
            else {
                currElement.classList.add("selected");
            }

            if (classofcurr[0] == 'n') {
                let choices = document.querySelectorAll(".notpreschoices");
                choices.forEach(async (currch) => {
                    if (currch.classList[0] == classofcurr) {
                        if (currch.innerHTML != "") currch.innerHTML = "";
                        else {
                            var ifpresent = document.createElement("button");
                            ifpresent.innerHTML = "I was Present";
                            ifpresent.classList.add(`presbut${classofcurr}`);
                            ifpresent.setAttribute("onclick", `present('${classofcurr}')`);
                            var noclass = document.createElement("button");
                            noclass.innerHTML = "The class did not happen."
                            noclass.classList.add(`noclassbut1${classofcurr}`);
                            noclass.setAttribute("onclick", `notpresnoclass('${classofcurr}')`);
                            currch.appendChild(ifpresent);
                            currch.appendChild(noclass);
                        }
                    }
                })
            }
            else {
                let choices = document.querySelectorAll(".preschoices");
                choices.forEach(async (currch) => {
                    if (currch.classList[0] == classofcurr) {
                        if (currch.innerHTML != "") currch.innerHTML = "";
                        else {
                            var ifabsent = document.createElement("button");
                            ifabsent.innerHTML = "I was Absent";
                            ifabsent.classList.add(`absebut${classofcurr}`);
                            ifabsent.setAttribute("onclick", `absent('${classofcurr}')`);
                            var noclass = document.createElement("button");
                            noclass.innerHTML = "The class did not happen."
                            noclass.classList.add(`noclassbut2${classofcurr}`);
                            noclass.setAttribute("onclick", `presnoclass('${classofcurr}')`);
                            currch.appendChild(ifabsent);
                            currch.appendChild(noclass);
                        }
                    }
                })
            }
            submitbutton.setAttribute("onclick", "modifydata()");
        })
    })
}

async function modifydata() {
    let a = pres.querySelectorAll(".subject");
    let b = notpres.querySelectorAll(".subject");
    let newpres = [];
    let newnotpres = [];
    a.forEach(async (currElement) => {
        if (currElement.classList.length == 2) newpres.push(currElement.innerText);
        else {
            for (let i = 0; i < myarr.length; i++) {
                if (myarr[i].name.replaceAll(' ', '') == currElement.innerText.replaceAll(' ', '')) {
                    if (currElement.classList[3] == "absent") {
                        newnotpres.push(currElement.innerText);
                        myarr[i].val[0]--;
                    }
                    else if (currElement.classList[3] == "presnoclass") {
                        myarr[i].val[0]--;
                        myarr[i].val[1]--;
                    }
                }
            }
        }
    })

    b.forEach(async (currElement) => {
        if (currElement.classList.length == 2) newnotpres.push(currElement.innerText);
        else {
            for (let i = 0; i < myarr.length; i++) {
                if (myarr[i].name.replaceAll(' ', '') == currElement.innerText.replaceAll(' ', '')) {
                    if (currElement.classList[3] == "present") {
                        newpres.push(currElement.innerText);
                        myarr[i].val[0]++;
                    }
                    else if (currElement.classList[3] == "notpresnoclass") {
                        myarr[i].val[1]--;
                    }
                }
            }
        }
    })

    detailedDataArr.forEach((currElement) => {
        if (currElement.date == currDate) {
            currElement.presarr = newpres;
            currElement.notpresarr = newnotpres;
        }
    })
    Android.add_detailed_data(JSON.stringify(detailedDataArr));
    Android.add_data(JSON.stringify(myarr));

    location.replace("./index.html");
}

async function present(classn) {
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach(async (curr) => {
        if (curr.classList[0] == classn) {
            curr.classList.add("present");
        }
    })
    let presbut = document.querySelectorAll(`.presbut${classn}`);
    presbut[0].classList.toggle("click");
    let noclassbut1 = document.querySelectorAll(`.noclassbut1${classn}`);
    noclassbut1[0].classList.remove("click");
}

async function absent(classn) {
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach(async (curr) => {
        if (curr.classList[0] == classn) {
            curr.classList.add("absent");
        }
    })
    let absebut = document.querySelectorAll(`.absebut${classn}`);
    absebut[0].classList.toggle("click");
    let noclassbut2 = document.querySelectorAll(`.noclassbut2${classn}`);
    noclassbut2[0].classList.remove("click");

}

async function presnoclass(classn) {
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach(async (curr) => {
        if (curr.classList[0] == classn) {
            curr.classList.add("presnoclass");
        }
    })
    let noclassbut2 = document.querySelectorAll(`.noclassbut2${classn}`);
    noclassbut2[0].classList.toggle("click");
    let absebut = document.querySelectorAll(`.absebut${classn}`);
    absebut[0].classList.remove("click");
}

async function notpresnoclass(classn) {
    allbtns = document.querySelectorAll(".subject");
    allbtns.forEach(async (curr) => {
        if (curr.classList[0] == classn) {
            curr.classList.add("notpresnoclass");
        }
    })
    let noclassbut1 = document.querySelectorAll(`.noclassbut1${classn}`);
    noclassbut1[0].classList.toggle("click");
    let presbut = document.querySelectorAll(`.presbut${classn}`);
    presbut[0].classList.remove("click");

}


async function deletebut() {
    if (!cleard.innerHTML) {
        cleard.innerHTML += "Are you Sure ?";
        let yes = document.createElement("button");
        yes.innerHTML = "Yes";
        yes.setAttribute("id", "yes");
        yes.setAttribute("onclick", "deletedata()");
        cleard.appendChild(yes);
        let no = document.createElement("button");
        no.innerHTML = "No";
        no.setAttribute("id", "no");
        no.setAttribute("onclick", "no()");
        cleard.appendChild(no);
    }
}

async function deletedata() {
    let yes = document.getElementById("yes");
    yes.classList.add("click");
    myarr = [];
    detailedDataArr = [];
    Android.add_detailed_data(JSON.stringify(detailedDataArr));
    Android.add_data(JSON.stringify(myarr));
    location.replace("./index.html");
}

function no() {
    let no = document.getElementById("no");
    no.classList.add("click");
    cleard.innerHTML="";
}
