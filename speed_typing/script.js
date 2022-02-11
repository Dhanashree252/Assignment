const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"
const quoteBox = document.querySelector(".quote")
const textBox = document.querySelector(".quote-textbox")
const timer = document.querySelector(".timer")
const result = document.querySelector(".final")


let correct = true
textBox.addEventListener("input", () => {
    const arrayChar = quoteBox.querySelectorAll("span")
    let CharNumber = arrayChar.length
    // console.log(CharNumber)
    const arrayInput = textBox.value.split("")
    arrayChar.forEach((charSpan, index) => {
        const character = arrayInput[index]
        if (character == null){
            charSpan.classList.remove("correct")
            charSpan.classList.remove("incorrect")
            correct = false
        }
        else if(character === charSpan.innerText){
            charSpan.classList.add("correct")
            charSpan.classList.remove("incorrect")
        }else{
            charSpan.classList.remove("correct")
            charSpan.classList.add("incorrect")
            correct = false
        }
    })
    if(correct) {
        result.innerText = `Congratulations! You have done ${CharNumber} characters in ${timer.innerText} Seconds.`
        getQuote()
    }
})

function generateRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}
async function getQuote(){
    const quote = await generateRandomQuote()
    // console.log(quote)
    // quoteBox.textContent = quote
    quoteBox.textContent = ""
    quote.split("").forEach(char => {
        const charSpan = document.createElement("span")
        charSpan.innerText = char
        quoteBox.appendChild(charSpan)
    });
    textBox.value = null
    startTimer()
}

let startTime 
function startTimer(){
    timer.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}
getQuote()

