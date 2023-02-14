let generateBtn = document.querySelector("#generate-btn");
generateBtn.addEventListener("click", firstPage);

let output = document.querySelector(".back");
output.addEventListener("click", secondPage);

function firstPage() {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".output").style.display = "block";
    buildingFloors();
    // console.log("clicked");
}

function secondPage() {
    document.querySelector(".output").style.display = "none";
    document.querySelector(".container").style.display = "block";
    deletingFloors();
}

function buildingFloors() {

    let floorInput = document.querySelector("#floor-input").value;
    let liftInput = document.querySelector("#lift-input").value;

    for (let i = floorInput; i > 0; i--) {

        let floor = document.createElement("div");
        floor.className = "floorDiv";

        let lift = document.createElement("div");
        lift.className = "buttonLift";
        
        let divBtn = document.createElement("div");
        divBtn.className = "button";

        let upwardsBtn = document.createElement("upButton");
        let upwardsBtnText = document.createTextNode("up");

            upwardsBtn.className = "up";
            upwardsBtn.setAttribute("id", `up${i}`);
            upwardsBtn.appendChild(upwardsBtnText);

        let downwardsBtn = document.createElement("upButton");
        let downwardsBtnText = document.createTextNode("down");

            downwardsBtn.className = "down";
            downwardsBtn.setAttribute("id", `down${i}`);
            downwardsBtn.appendChild(downwardsBtnText);

        divBtn.appendChild(upwardsBtn);
        divBtn.appendChild(downwardsBtn);

        lift.appendChild(divBtn);
        floor.appendChild(lift);

        let hrdiv = document.createElement("div");
        hrdiv.className = "hrfloorName";

        let hr = document.createElement("hr");

        let spanFloorNo = document.createElement("span");
        spanFloorNo.innerText = `Floor ${i}`;

        hrdiv.appendChild(hr);
        hrdiv.appendChild(spanFloorNo);

        floor.appendChild(hrdiv);

        document.querySelector(".output").appendChild(floor);

        if(i == floorInput){
            upwardsBtn.style.display = "none";
        }
        if(i == 1){
            downwardsBtn.style.display = "none";
        }
    }

    let mainLift = document.createElement("div");
    mainLift.className = "mainLift";

    for (let j = 1; j <= liftInput; j++) {

        let liftdiv = document.createElement("div");
        liftdiv.className = "liftDiv";

        liftdiv.setAttribute("id", `liftDiv${j}`);
        liftdiv.setAttribute("flag", `free`);

        let gates = document.createElement("div");
        gates.className = "gates";
        gates.setAttribute("id", `gates`);

        let gate1 = document.createElement("div");
        gate1.className = "gate1";
        gates.appendChild(gate1);

        let gate2 = document.createElement("div");
        gate2.className = "gate2";
        gates.appendChild(gate2);

        liftdiv.appendChild(gates);
        mainLift.appendChild(liftdiv);
    }

    const mainLiftBtn = document.querySelectorAll(".buttonLift");
    const liftBox = mainLiftBtn[mainLiftBtn.length - 1];
    liftBox.appendChild(mainLift);

    let selectLift = document.querySelectorAll(".liftDiv");

    let up = document.querySelectorAll(".up")
    let nUp = up.length;
    let previous = 0;

    let down = document.querySelectorAll(".down");

    let oldFloorValue = [];
    for (let i = 0; i < selectLift.length; i++) {
        oldFloorValue.push(1);
    }

    up.forEach((e, i) => {
        e.addEventListener("click", () => {

            let floorValue = nUp - i;
            
            for (let i = 0; i < selectLift.length; i++) {
                if(selectLift[i].getAttribute("flag") === "free") {
                    selectLift[i].setAttribute("flag", "busy");

                    moveLift(selectLift[i], floorValue, oldFloorValue[i]);

                    oldFloorValue[i] = floorValue;
                    console.log(oldFloorValue);
                    console.log(selectLift[i]);
                    break;
                }
                console.log("s");
            }
            previous = nUp - i;
        }) 
    })

    down.forEach((e, i) => {
        e.addEventListener("click", () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectLift.length; i++) {
                if(selectLift[i].getAttribute("flag") === "free") {
                    selectLift[i].setAttribute("flag", "busy");

                    moveLift(selectLift[i], floorValue, oldFloorValue[i]);

                    oldFloorValue[i] = floorValue;
                    console.log(oldFloorValue);
                    console.log(selectLift[i]);
                    break;
                }
                console.log("s");
            }
            previous = nUp - i;
        }) 
    })
}

function moveLift(liftNo, floorNo, oldFloorValue) {
    liftNo.style.transform = `translateY(${-88 * (floorNo - 1)}px)`;

    let previous = `${2 * Math.abs(floorNo - oldFloorValue)}s`
    liftNo.style.transitionDuration = previous;
    console.log("snjh", 2 * (floorNo - oldFloorValue));

    setTimeout(() => {
        gateOpenClose(liftNo);
        setTimeout(() => {
            liftNo.setAttribute("flag", "free");

        }, 6000);
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000);
}

function gateOpenClose(liftNo) {
    let gates = liftNo.firstChild;
    setTimeout(() => {
        gates.children[0].style.width = "4px";
        gates.children[1].style.width = "4px";
    }, 1000);

    setTimeout(() => {
        gates.children[0].style.width = "20px";
        gates.children[1].style.width = "20px";
    }, 3500);
}

function deletingFloors() {

    let floorInput = document.querySelector("#floor-input").value;

    for (let i = floorInput; i > 0; i--) {
        let floor = document.querySelector(".floorDiv");
        floor.remove();
    }
}