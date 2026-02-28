const BASE_URL =  "https://latest.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;

        if(currCode === 'USD' && select.name === 'from'){
            newOption.selected = "selected";
        }
        else if(currCode === 'INR' && select.name === 'to'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amtVal = document.querySelector('.amount input');
    let amount = amtVal.value;
    if(amount<1 || amount===""){
        amount = 1;
        amount.value ="1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //the API stores data as JSON files
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];

    let finalAmount = (rate*amount).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})
