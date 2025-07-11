let from = "usd";
let too = "inr";
let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${from}.json`;
let selects = document.querySelectorAll(".select");
for (let keys in countryList) {
    for (let select of selects) {
        let option = document.createElement("option");
        option.innerText = keys;
        option.value = keys;
        select.append(option);
        if (select.name == "from" && keys == "USD") {
            option.selected = "selected";
        }
        else if (select.name == "to" && keys == "INR") {
            option.selected = "selected";
        }
    }
}
// add event listner on the select element 

for (let select of selects) {
    select.addEventListener("change", (evt) => {
        updateImg(evt.target);
    })
}


// Update flag 
let img = document.querySelectorAll(".img");

function updateImg(element) {
    // console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    if (element.name == "from") {
        getFrom(currCode);
        img[0].src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    }
    else if (element.name == "to") {
        getTo(currCode);
        img[1].src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    }
}
// access amount 
const input = document.querySelector("#input");
let amountValue = input.value;
const btn = document.querySelector("#btn");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    amountValue = input.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        input.value = "1";
    }
    fetchUrl();
})

// update From value

const getFrom = (fr) => {
    from = fr.toLowerCase();
    updateUrl(from);
}
// update to value;
const getTo = (to) => {
    too = to.toLowerCase();
    // console.log(too);
}
// update URl
const updateUrl = (from) => {
    let fromLower = from.toLowerCase();
    URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromLower}.json`;
}

//fetch URl
async function fetchUrl() {
    let response = await fetch(URL);
    let data = await response.json();
    let actualData = data[from];
    // console.log(actualData);
    getToApi(actualData);
}
// get to api for comparison
let getToApi = (data) => {
    for (let keys in data) {
        if (keys == too) {
            let value = data[keys];
            updateText(from, value, keys);
            // console.log("1", from, "=", data[keys], keys);
        }
    }
}

// updateText
let p = document.querySelector("#detail");
const updateText = (from, value, keys) => {
    p.innerText = `${amountValue} ${from.toUpperCase()} = ${amountValue * value} ${keys.toUpperCase()}`;
}