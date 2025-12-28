let cards = []
let sum = 0 
let hasBlackjack = false
let isAlive = false
let message = ""
let messageEl = document.querySelector("#message-el")
let sumEl = document.querySelector("#sum-el")
let cardEl = document.querySelector("#card-el")

let player = {
    name : "USER",
    chips : 345
}

let playerEl = document.querySelector("#player-el")
playerEl.innerHTML = player.name + " : $" + player.chips

function getRandomCard(){
    let randomNumber =  Math.floor(Math.random()*13)+1
    if(randomNumber === 1){
        return 11
    }else if(randomNumber > 10 ){
        return 10
    }else{
        return randomNumber
    }
    
    
}
function startGame(){
    cards = []
    sum = 0
    isAlive=true
    hasBlackjack=false
    player.chips -= 10
    playerEl.innerHTML = player.name + " : $" + player.chips
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards.push(firstCard, secondCard)
    sum = firstCard+secondCard
    renderGame()    
}


function renderGame(){
    cardEl.innerHTML = "Cards : "
    for (let i=0; i<cards.length; i+=1){
     cardEl.innerHTML += cards[i] + " + "
    }
    
    sumEl.innerHTML = "Sum : " + sum
    if (sum<=20){
        message = "Do you want to draw a new card"
    }else if(sum===21){
        message = "Wohoo! you've got blackjack!"
        player.chips += 100
        playerEl.innerHTML = player.name + " : $" + player.chips
        hasBlackjack = true
    }else{
        message = "You're out of the game!"
       // alert("You're out of the game!")
        isAlive = false
    }
    messageEl.innerHTML = message
}


function newCard(){
    if(isAlive===true && hasBlackjack===false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()    
    }else{
        messageEl.innerHTML = "Start a new Game!!!!!!"
    }
    
}

















