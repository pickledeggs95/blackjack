let sum = 0
let hasBlackJack = false
let isAlive=false
let message=""
let messageEl=document.getElementById("message-el")
let sumEl=document.getElementById("sum-el")
let cardsEl=document.getElementById("cards-el")
let cards = []
let player = {
    name: "name",
    chips: 3,
}
let stickBtn= document.getElementById("stick-btn")
let newCardBtn = document.getElementById("newcard-btn")
let startBtn = document.getElementById("start-btn")
let playerEl = document.getElementById("player-el")
let dealerCards = []
let dealerSum = 0
let dealerCardsEl = document.getElementById("dealer-cards")
let dealerSumEl = document.getElementById("dealer-sum")
let playEl = document.getElementById("play")
let gameFormEl = document.getElementById("gameform")

playerEl.textContent = player.name + " : " + '$' + player.chips
stickBtn.disabled = true
newCardBtn.disabled = true
startBtn.disabled = false
playEl.hidden = true
gameFormEl.hidden = false

function renderGame() {
    if (sum < 21) {
        message="Do you want to draw a new card? "
        stickBtn.disabled = false
        newCardBtn.disabled = false
        startBtn.disabled = true
    } else if (sum===21) {
        message="Winner!"
        hasBlackJack=true
        player.chips += 1
        playerEl.textContent = player.name + " : " + '$' + player.chips
        stickBtn.disabled = true
        newCardBtn.disabled = true
        startBtn.disabled = false
    } else {
        message="Loser!"
        isAlive=false
        player.chips -= 1
        playerEl.textContent = player.name + " : $" + player.chips
        stickBtn.disabled = true
        newCardBtn.disabled = true
        startBtn.disabled = false
    }

    messageEl.textContent=message
    sumEl.textContent="Sum: "+ sum
    cardsEl.textContent="Cards: "
    for (let i=0; i < cards.length; i++) {
        if (i === (cards.length-1)) {
            cardsEl.textContent += cards[i]
        }
        else {
        cardsEl.textContent += cards[i] + ", "
        }
    }
    

    if (player.chips <= 0) {
        message = "You ran out of money"
        messageEl.textContent = message
        startBtn.disabled = true
        newCardBtn.disabled.disabled = true
        stickBtn.disabled = true
    }
}

function newCard() {
    if (isAlive===true && hasBlackJack===false) {
        let newCard=getCard()
        sum += newCard
        cards.push(newCard)
        renderGame()
    } else {    }
}

function startGame() {
    cards=[]
    dealerCardsEl.textContent = ""
    dealerSumEl.textContent = ""
    dealerSum = 0
    dealerCards = []
    if ((isAlive===false || hasBlackJack===true ) && player.chips > 0) {
        isAlive=true
        hasBlackJack=false
        let firstCard = getCard()
        let secondCard= getCard()
        cards.push(firstCard, secondCard)
        sum = firstCard + secondCard
        stickBtn.disabled = false
        newCardBtn.disabled = false
        startBtn.disabled = true
        renderGame()
    } else {}
}

function getCard() {
    let number = Math.floor(Math.random() * (13) + 1)
    if (number === 1) {
        return 11
    } else if (number > 10) {
        return 10
    } else {
        return number
    }
}

function stick() {
    messageEl.textContent = "Dealer's turn . . ."
    newCardBtn.disabled = true
    stickBtn.disabled = true
    startBtn.dsiable = false
    let dealerFirstCard = getCard()
    let dealerSecondCard= getCard()
    dealerCards.push(dealerFirstCard, dealerSecondCard)
    dealerSum = dealerFirstCard + dealerSecondCard
    dealerCardsEl.textContent="Dealer's Cards: "
    for (let i=0; i < dealerCards.length; i++) {
        if (i === (dealerCards.length-1)) {
            dealerCardsEl.textContent += dealerCards[i]
        }
        else {
        dealerCardsEl.textContent += dealerCards[i] + ", "
        }
    }

    while (dealerSum < sum && dealerSum < 21) {
        let nextCard = getCard()
        dealerSum += nextCard
        console.log(nextCard)
        dealerCards.push(nextCard)
        dealerCardsEl.textContent += ", " + nextCard
    }

    dealerSumEl.textContent = "Dealer's sum: " + dealerSum

    if (dealerSum > 21) {
        message="Winner! Dealer bust"
        messageEl.textContent = message
        hasBlackJack=true
        console.log(player.chips)
        player.chips += 1
        console.log(player.chips)
        playerEl.textContent = player.name + " : " + '$' + player.chips
        stickBtn.disabled = true
        newCardBtn.disabled = true
        startBtn.disabled = false
    } else if ( dealerSum => sum) {
        message="Dealer wins!"
        messageEl.textContent = message
        hasBlackJack=false
        player.chips -= 1
        playerEl.textContent = player.name + " : " + '$' + player.chips
        stickBtn.disabled = true
        newCardBtn.disabled = true
        startBtn.disabled = false
        isAlive = false
    }
    
}

function submit() {
    console.log("papa")
    player.name = document.getElementById("name").value
    player.chips = parseInt(document.getElementById("chips").value)
    playerEl.textContent = player.name + " : " + '$' + player.chips
    playEl.hidden = false
    gameFormEl.hidden = true
}