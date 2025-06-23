
const baseUrl = "https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json";
let select = document.querySelectorAll(".from-to select");
let msg = document.querySelector(".message");
let btn = document.querySelector("#exchange");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
for ( let input of select){
    let code,additional;
    for (let currencyCode in countryList){
        additional = document.createElement("option");
        additional.innerText = currencyCode;
        additional.value = currencyCode;
        input.append(additional);
        
    }
    input.addEventListener("change", (event) => {
        for ( let countryCode in countryList){
           code=countryList[event.target.value]
        
        }
        console.log(`Flag changed to ${code}`);
        let newsrc=`https://flagsapi.com/${code}/shiny/64.png`;
        let img = input.parentElement.querySelector("img");
        img.src=newsrc;
        
      });
}
btn.addEventListener("click",async (evet)=>{
    evet.preventDefault();
    let amt = document.querySelector(".amtval");
    console.log(amt.value)
    if(amt.value == "" || amt.value <0){
        amt.value =1;
    }
    console.log(fromcurr.value,tocurr.value)
    
    
    let response = await fetch(baseUrl);
    let data = await response.json();
    console.log(data)
    let rate = data.quotes;
    console.log(rate)
    let fromRate = rate[`${fromcurr.value}`]
    console.log(`USD to ${fromcurr.value} is ${fromRate}`); 
    let toRate = rate[`${tocurr.value}`] 
console.log("fromRate is:",fromRate)
console.log("toRate is:",toRate)
//First converting USD to fromRate then into toRate
    let finalAmount = (amt.value *toRate)/ fromRate;  // Convert Into USD then toCurr
    msg.innerText = `${amt.value} ${fromcurr.value} is ${finalAmount} ${tocurr.value}.`;
console.log(`Final Amount: ${finalAmount}`);
})


