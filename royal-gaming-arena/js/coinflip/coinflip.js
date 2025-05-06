/**
 * Coin flip game implementation
 */

let coinElement
let coinflipBetInput
let startCoinflipButton
let headsButton
let tailsButton
let resultElement
let coinflipHistoryContainer

// Mocked variables (replace with actual implementations)
CoinFlipState = {
  bet: 0,
  selectedSide: null,
  gamePhase: "betting",
  result: null,
  reset: () => {
    CoinFlipState.bet = 0
    CoinFlipState.selectedSide = null
    CoinFlipState.gamePhase = "betting"
    CoinFlipState.result = null
  },
  selectSide: (side) => {
    CoinFlipState.selectedSide = side
  },
  flip: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const random = Math.random()
        CoinFlipState.result = random < 0.5 ? "heads" : "tails"
        resolve(CoinFlipState.result === CoinFlipState.selectedSide)
      }, 1000)
    })
  },
}

// const getPlayerPoints = () => 1000
// const SOUNDS = {
//   CLICK: { play: () => {} },
//   WIN: { play: () => {} },
//   LOSE: { play: () => {} },
// }
// const notifyError = (message) => console.error(message)
// const updatePlayerPoints = (amount) => console.log(`Player points updated by ${amount}`)
// const formatPoints = (points) => points.toFixed(2)
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// const calculateGameResult = (gameName, won, amount, multiplier = 1) => {
//   return {
//     game: gameName,
//     won: won,
//     amount: amount,
//     multiplier: multiplier,
//   }
// }
// const recordGameResult = (result) => {
//   console.log("Game Result:", result)
// }

// Initialize the coin flip game
function initializeCoinflip() {
  // Get DOM elements
  coinElement = document.querySelector(".coin")
  coinflipBetInput = document.getElementById("coinflip-bet")
  startCoinflipButton = document.getElementById("btn-start-coinflip")
  headsButton = document.getElementById("btn-heads")
  tailsButton = document.getElementById("btn-tails")
  resultElement = document.querySelector(".coinflip-result")

  // Add history container
  setupCoinflipHistoryContainer()

  // Reset game state
  CoinFlipState.reset()

  // Set initial values
  coinflipBetInput.value = CoinFlipState.bet

  // Set up event listeners
  setupCoinflipEventListeners()

  // Load history
  loadCoinflipHistory()
}

// Set up history container
function setupCoinflipHistoryContainer() {
  const coinflipGame = document.querySelector(".coinflip-game")

  // Create history container
  const historyContainer = document.createElement("div")
  historyContainer.className = "coinflip-history-container"
  historyContainer.innerHTML = `
    <h3>Recent Games</h3>
    <div class="coinflip-history" id="coinflip-history"></div>
  `

  // Add to game container
  coinflipGame.appendChild(historyContainer)

  // Save reference
  coinflipHistoryContainer = document.getElementById("coinflip-history")
}

initializeCoinflip()

// Set up event listeners for coin flip
function setupCoinflipEventListeners() {
  // Bet input
  coinflipBetInput.addEventListener("change", () => {
    const betAmount = Number.parseInt(coinflipBetInput.value)
    if (isNaN(betAmount) || betAmount < 10) {
      coinflipBetInput.value = 10
      CoinFlipState.bet = 10
    } else if (betAmount > getPlayerPoints()) {
      coinflipBetInput.value = getPlayerPoints()
      CoinFlipState.bet = getPlayerPoints()
    } else {
      CoinFlipState.bet = betAmount
    }
  })

  // Side selection buttons
  headsButton.addEventListener("click", () => {
    if (CoinFlipState.gamePhase === "betting") {
      headsButton.classList.add("selected")
      tailsButton.classList.remove("selected")
      CoinFlipState.selectSide("heads")
      SOUNDS.CLICK.play()
    }
  })

  tailsButton.addEventListener("click", () => {
    if (CoinFlipState.gamePhase === "betting") {
      tailsButton.classList.add("selected")
      headsButton.classList.remove("selected")
      CoinFlipState.selectSide("tails")
      SOUNDS.CLICK.play()
    }
  })

  // Start game button
  startCoinflipButton.addEventListener("click", () => {
    if (CoinFlipState.gamePhase === "betting") {
      startCoinflipGame()
    }
  })

  // Quick amount buttons
  document.querySelectorAll(".quick-amount").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = Number.parseInt(btn.dataset.amount)
      if (amount <= getPlayerPoints()) {
        coinflipBetInput.value = amount
        CoinFlipState.bet = amount
        SOUNDS.CLICK.play()
      }
    })
  })
}

// Start a new coin flip game
async function startCoinflipGame() {
  // Validate bet and side selection
  if (CoinFlipState.bet <= 0 || CoinFlipState.bet > getPlayerPoints()) {
    notifyError("Invalid bet amount!")
    return
  }

  if (!CoinFlipState.selectedSide) {
    notifyError("Please select heads or tails!")
    return
  }

  // Deduct bet from points
  updatePlayerPoints(-CoinFlipState.bet)

  // Disable controls
  coinflipBetInput.disabled = true
  startCoinflipButton.disabled = true
  headsButton.disabled = true
  tailsButton.disabled = true

  // Flip the coin
  const won = await CoinFlipState.flip()

  // Animate coin flip
  coinElement.className = "coin"
  void coinElement.offsetWidth // Force reflow
  coinElement.classList.add(`flip-${CoinFlipState.result}`)

  // Play sound
  SOUNDS.CLICK.play()

  // Wait for animation
  await sleep(2000)

  // Show result
  showCoinflipResult(won)

  // Add to history
  addToCoinflipHistory({
    side: CoinFlipState.selectedSide,
    result: CoinFlipState.result,
    won: won,
  })

  // Reset for next game
  await sleep(3000)
  endCoinflipGame()
}

// Show the game result
function showCoinflipResult(won) {
  const resultAmount = document.createElement("div")
  resultAmount.className = `result-amount ${won ? "win" : "lose"}`
  resultAmount.textContent = won ? `+${formatPoints(CoinFlipState.bet)}` : `-${formatPoints(CoinFlipState.bet)}`

  const resultMultiplier = document.createElement("div")
  resultMultiplier.className = "result-multiplier"
  resultMultiplier.textContent = won ? "2.00x" : "0.00x"

  resultElement.innerHTML = ""
  resultElement.appendChild(resultAmount)
  resultElement.appendChild(resultMultiplier)
  resultElement.classList.add("show")

  if (won) {
    const winnings = CoinFlipState.bet
    console.log("Win" + CoinFlipState.bet);
    updatePlayerPoints(CoinFlipState.bet * 2)
    SOUNDS.WIN.play()
    recordGameResult(calculateGameResult("Coin Flip", true, winnings, 2))
  } else {
    console.log("lose" + CoinFlipState.bet)
    SOUNDS.LOSE.play()
    recordGameResult(calculateGameResult("Coin Flip", false, CoinFlipState.bet))
  }
}

// End the coin flip game
function endCoinflipGame() {
  // Reset controls
  coinflipBetInput.disabled = false
  startCoinflipButton.disabled = false
  headsButton.disabled = false
  tailsButton.disabled = false

  // Reset selection
  headsButton.classList.remove("selected")
  tailsButton.classList.remove("selected")

  // Reset coin
  coinElement.className = "coin"

  // Hide result
  resultElement.classList.remove("show")

  // Reset game state
  CoinFlipState.reset()
}

// Add to coinflip history
function addToCoinflipHistory(game) {
  // Create history item
  const historyItem = document.createElement("div")
  historyItem.className = "coinflip-history-item"

  // Side icon
  const sideIcon = document.createElement("div")
  sideIcon.className = `side-icon ${game.side}`
  sideIcon.textContent = game.side === "heads" ? "H" : "T"

  // Result
  const resultText = document.createElement("div")
  resultText.className = "result-text"
  resultText.textContent = `Result: ${game.result === "heads" ? "Heads" : "Tails"}`

  // Outcome
  const outcome = document.createElement("div")
  outcome.className = `outcome ${game.won ? "win" : "loss"}`
  outcome.textContent = game.won ? "WIN" : "LOSS"

  // Add to item
  historyItem.appendChild(sideIcon)
  historyItem.appendChild(resultText)
  historyItem.appendChild(outcome)

  // Add to container
  coinflipHistoryContainer.prepend(historyItem)

  // Limit to 5 items
  const items = coinflipHistoryContainer.querySelectorAll(".coinflip-history-item")
  if (items.length > 5) {
    coinflipHistoryContainer.removeChild(items[items.length - 1])
  }

  // Save to local storage
  saveCoinflipHistory()
}

// Save coinflip history to local storage
function saveCoinflipHistory() {
  const items = coinflipHistoryContainer.querySelectorAll(".coinflip-history-item")
  const history = []

  items.forEach((item) => {
    const side = item.querySelector(".side-icon").classList.contains("heads") ? "heads" : "tails"
    const resultText = item.querySelector(".result-text").textContent
    const result = resultText.includes("Heads") ? "heads" : "tails"
    const won = item.querySelector(".outcome").classList.contains("win")

    history.push({ side, result, won })
  })

  localStorage.setItem("coinflip_history", JSON.stringify(history))
}

// Load coinflip history from local storage
function loadCoinflipHistory() {
  try {
    const history = JSON.parse(localStorage.getItem("coinflip_history"))
    if (history && Array.isArray(history)) {
      // Clear container
      coinflipHistoryContainer.innerHTML = ""

      // Add items in reverse order (newest first)
      history.reverse().forEach((game) => {
        addToCoinflipHistory(game)
      })
    }
  } catch (e) {
    console.error("Error loading coinflip history:", e)
  }
}