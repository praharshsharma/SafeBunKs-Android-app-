let x = 1;
var subbut = document.getElementById("ads");
var subdiv = document.getElementById("submitbutton");
var anch = document.getElementById("anch");
subbut.addEventListener('click',()=>{
    var subname = document.createElement("input");
    subname.setAttribute("type","text");
    subname.setAttribute("maxlength",10);
    subname.setAttribute("id",`sub${x}`);
    subname.setAttribute("placeholder","Enter Subject Name");
    if(x==1){
        var submit = document.createElement("input");
        submit.setAttribute("type","submit");
        submit.setAttribute("id","submit");
        submit.setAttribute("value","Submit");
        submit.setAttribute("onclick","addingsub()");
        subdiv.appendChild(submit);
//        var chpg = document.createElement("input");
//        chpg.setAttribute("type","submit");
//        chpg.setAttribute("value","Edit your Attendance")
//        anch.appendChild(chpg);
    }
    x=x+1;
    sublist.appendChild(subname);
})

let checkinjsondata = (name,arr)=>{
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].name.replaceAll(' ','') == name.replaceAll(' ','')) return false;
    }

    return true;
}

async function  addingsub(){
    console.log("in submit button");
    let data = Android.load_data();
    let jsondata = [];
    if(data) jsondata = JSON.parse(data);
    let st = "";
    for(let i=1;i<x;i++){
        var subn = document.getElementById(`sub${i}`).value;
        subn = subn.trim();
        if(subn != "")
        {
            if(checkinjsondata(subn,jsondata))
            {
                var obj={name:subn , val:[0,0]};
                jsondata.push(obj);
            }
            else
            {
                st = "Duplicate names not allowed";
            }
        }
    }

    if(st!="") Android.displayToast(st);
    let result = Android.add_data(JSON.stringify(jsondata));
    x=1;
    window.location.reload();

}

window.onload = function(){
    let data = Android.load_data();

    if(data){
        display_data(data);
    }
}

let display_data= async (d)=>{
   let data = []
   data = JSON.parse(d);
   for (let i = 0; i < data.length; i++) {
    var present = data[i].val[0];
    var total = data[i].val[1];
    var subcard = document.createElement("div");
    subcard.setAttribute("class", "cards");
    let percentage = 0;
    let elem = data[i].name.replaceAll(' ','');
    if(total != 0) percentage = (present / total) * 100;
    if((present*100)%total)
    {
        percentage = percentage.toFixed(1);
    }
    // Create the skill element
    const skillElement = document.createElement('div');
    skillElement.classList.add('skill');

    // Create the outer div
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('outer');

    // Create the inner div
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner');

    // Create the number element
    const numberElement = document.createElement('div');
    numberElement.id = 'number';
    numberElement.textContent = percentage + "%";

    // Append the number element to the inner div
    innerDiv.appendChild(numberElement);

    // Append the inner div to the outer div
    outerDiv.appendChild(innerDiv);

    // Create the SVG element
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('version', '1.1');
    svgElement.setAttribute('width', '64px');
    svgElement.setAttribute('height', '64px');

    // Create the linear gradient
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'GradientColor');

    // Create the first stop in the gradient

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '100%');
    stop1.setAttribute('stop-color', '#4682b4'); //e91e63


    // Create the second stop in the gradient

    // Append the stops to the linear gradient
    linearGradient.appendChild(stop1);
    // linearGradient.appendChild(stop2);


    // Append the linear gradient to the SVG element
    svgElement.appendChild(linearGradient);

    // Create the circle element
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // console.log(`${data[i].name}` + "1");
    circleElement.id = `${elem}` + "1";
    circleElement.setAttribute('cx', '32'); //32
    circleElement.setAttribute('cy', '32');  //32
    circleElement.setAttribute('r', '28');  //28
    circleElement.setAttribute('stroke-linecap', 'round');

    // Append the circle element to the SVG element
    svgElement.appendChild(circleElement);

    // Append the outer div and SVG element to the skill element
    skillElement.appendChild(outerDiv);


    // Set the CSS styles for the #last element
    circleElement.style.fill = 'none';
    circleElement.style.stroke = 'url(#GradientColor)';
    circleElement.style.strokeWidth = '4px';
    circleElement.style.strokeDasharray = '175.84';
    let sdo = 175.84 - (175.84 * (percentage / 100));
    // circleElement.style.strokeDashoffset = '175.84';

    const cssAnimation = document.createElement('style');
    cssAnimation.textContent = `
    @keyframes ${elem} {
        0% {
            stroke-dashoffset: 175.84;
        }
        100% {
            stroke-dashoffset: ${sdo};
        }
    }
    `;

    // Append the CSS animation to the document head
    document.head.appendChild(cssAnimation);

    // Apply the animation to the #last element

    circleElement.style.animation = `${elem} 2s linear forwards`;

    skillElement.appendChild(svgElement);
    // document.body.appendChild(skillElement);

    var text = document.createElement("div");
    text.classList.add("subtext");
    text.innerHTML = data[i].name;
    var sidetext = document.createElement("div");
    sidetext.classList.add("sidetext");
    var prestext = document.createElement("div");
    prestext.classList.add("prestext");
    prestext.innerHTML+= "Present: "
    prestext.innerHTML += " ";
    prestext.innerHTML += present;
    var tottext = document.createElement("div");
    tottext.innerHTML+= "Total: "
    tottext.classList.add("tottext");
    tottext.innerHTML += " ";
    tottext.innerHTML += total;
    var circletext = document.createElement("div");
    circletext.classList.add("circletext");

    sidetext.appendChild(prestext);
    sidetext.appendChild(tottext);

    circletext.appendChild(skillElement);
    circletext.appendChild(sidetext);
    subcard.appendChild(text);
    subcard.appendChild(circletext);

    // Append the skill element to the document body or any desired container element
    subnamelist.append(subcard);

}
}