let body = document.body
localStorage.setItem("gameHtml", body.innerHTML)
let score = 0
let time = 60
let molePosition = null
let high_Score = localStorage.getItem("highScore") || 0;
const hit = new Audio("pop.mp3")

body.innerHTML = `
        <h1>CLICK TO START THE GAME</h1><br>
        <button id="start-btn" onclick="gameScreen()">START GAME</button>
        <h1>Highest Score: ${high_Score}</h1>`
let startBtn = document.querySelector("#start-btn")

function gameScreen(){
    body.innerHTML = localStorage.getItem("gameHtml")
    let timeEL = document.querySelector("#time-el")
    let scoreEl = document.querySelector("#score-el")
    let circleEl = document.querySelectorAll(".circle")    
    startGame(timeEL, scoreEl, circleEl)
    circleEl.forEach((circle)=>{
    circle.addEventListener("click", ()=>{
        if(circle===molePosition){
            hit.currentTime = 0.008
            hit.play()
            score++
            scoreEl.textContent = "Score: "+score
            circle.style.background = "black"
            if(score>high_Score){
                localStorage.setItem("highScore", score)
            }
            molePosition = null
        }    
    })
    
})

}

function molesOut(circleEl){
    circleEl.forEach(circle=>circle.style.background = "black")
    let randomIndex = Math.floor(Math.random()*circleEl.length)
    molePosition = circleEl[randomIndex]
    molePosition.style.background = "red"
    return molePosition
}
function countDown(timeEL){
    time -=1
    timeEL.innerHTML = "Time: "+ time
    if(time<=0){
        alert("Times Up!! You score: "+score)
        clearInterval(molesInterval)
        clearInterval(timeInterval)
        
        location.reload()
    }
}

function startGame(timeEL, scoreEl, circleEl){
    molesInterval = setInterval(()=>{
        molesOut(circleEl)
    }, 1000)
    timeInterval = setInterval(()=>{
        countDown(timeEL)
        
    }, 1000)
}









