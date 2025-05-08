/**
 * Limbo game implementation
 */

let limboMultiplierElement
let limboTargetInput
let limboBetInput
let limboBetButton
let limboAutoButton
let limboPayoutElement
let limboChanceElement
let limboProgressBar
let limboHistoryContainer

// Mock functions for missing dependencies
// Replace these with your actual implementations
// function getPlayerPoints() {
//   return 1000 // Example: return 1000 points
// }

// function notifyInfo(message) {
//   console.info(message)
// }

// function formatPoints(points) {
//   return points.toFixed(2) // Example: format to 2 decimal places
// }

// function notifyError(message) {
//   console.error(message)
// }

// function updatePlayerPoints(points) {
//   // In a real implementation, you would update the player's points here
//   console.log(`Updating player points by ${points}`)
// }

// function notifySuccess(message) {
//   console.log(`Success: ${message}`)
// }

// function recordGameResult(result) {
//   console.log("Game Result:", result)
// }

// function calculateGameResult(gameType, won, payout, multiplier) {
//   return {
//     gameType: gameType,
//     won: won,
//     payout: payout,
//     multiplier: multiplier,
//   }
// }

// // Define SOUNDS object (replace with actual sound loading if needed)
// const SOUNDS = {
//   WIN: { play: () => console.log("Playing WIN sound") },
//   LOSE: { play: () => console.log("Playing LOSE sound") },
// }

// Limbo game state
const LimboState = {
  bet: 50,
  targetMultiplier: 2.0,
  isPlaying: false,
  result: null,

  // Reset game state
  reset() {
    this.isPlaying = false
    this.result = null
  },

  // Calculate win chance based on target multiplier
  calculateWinChance() {
    // The formula is (1 / target multiplier) * 0.99 to account for house edge
    return ((1 / this.targetMultiplier) * 0.99 * 100).toFixed(2)
  },

  // Calculate potential payout
  calculatePayout() {
    return (this.bet * this.targetMultiplier).toFixed(2)
  },

  // Play the game
  play() {
    if (this.isPlaying) return false

    this.isPlaying = true

    // Generate a random multiplier between 1.00 and 100.00
    // The distribution is weighted to make higher multipliers less likely
    const randomValue = Math.random()
    const houseEdge = 0.99 // 1% house edge
    const maxMultiplier = 100.0

    // Calculate the actual multiplier using an inverse formula
    // This creates a distribution where the probability of getting a multiplier X
    // is roughly 1/X, which matches how most limbo games work
    const actualMultiplier = (1 / (1 - randomValue * houseEdge)).toFixed(2)

    // Clamp the multiplier to the maximum
    this.result = Math.min(Number(actualMultiplier), maxMultiplier).toFixed(2)

    // Determine if player won
    const won = Number(this.result) >= Number(this.targetMultiplier)

    this.isPlaying = false
    return {
      multiplier: this.result,
      won: won,
      payout: won ? this.calculatePayout() : 0,
    }
  },
}

// Initialize the limbo game
function initializeLimbo() {
  // Get DOM elements
  limboMultiplierElement = document.getElementById("limbo-multiplier")
  limboTargetInput = document.getElementById("limbo-target")
  limboBetInput = document.getElementById("limbo-bet")
  limboBetButton = document.getElementById("btn-limbo-bet")
  limboAutoButton = document.getElementById("btn-limbo-auto")
  limboPayoutElement = document.getElementById("limbo-payout")
  limboChanceElement = document.getElementById("limbo-chance")
  limboProgressBar = document.getElementById("limbo-progress-bar")

  // Add history container
  setupLimboHistoryContainer()

  // Set initial values
  limboTargetInput.value = LimboState.targetMultiplier.toFixed(2)
  limboBetInput.value = LimboState.bet

  // Update displays
  updateLimboDisplays()

  // Set up event listeners
  setupLimboEventListeners()

  // Load history
  loadLimboHistory()
}

// Set up history container
function setupLimboHistoryContainer() {
  const limboGame = document.querySelector(".limbo-game")

  // Create history container
  const historyContainer = document.createElement("div")
  historyContainer.className = "limbo-history-container"
  historyContainer.innerHTML = `
    <h3>Recent Games</h3>
    <div class="limbo-history" id="limbo-history"></div>
  `

  // Add to game container
  limboGame.appendChild(historyContainer)

  // Save reference
  limboHistoryContainer = document.getElementById("limbo-history")
}

// Set up event listeners
function setupLimboEventListeners() {
  // Target multiplier input
  limboTargetInput.addEventListener("input", function () {
    let value = Number.parseFloat(this.value)

    // Validate input
    if (isNaN(value) || value < 1.01) {
      value = 1.01
    } else if (value > 100) {
      value = 100
    }

    // Update state and display
    LimboState.targetMultiplier = value
    updateLimboDisplays()
  })

  // Bet input
  limboBetInput.addEventListener("input", function () {
    let value = Number.parseInt(this.value)

    // Validate input
    if (isNaN(value) || value < 10) {
      value = 10
    } else if (value > getPlayerPoints()) {
      value = getPlayerPoints()
    }

    // Update state and display
    LimboState.bet = value
    updateLimboDisplays()
  })

  // Bet button
  limboBetButton.addEventListener("click", playLimboGame)

  // Auto button (not implemented in this version)
  limboAutoButton.addEventListener("click", () => {
    notifyInfo("Auto play is not available in this version.")
  })
}

// Update displays
function updateLimboDisplays() {
  // Update payout
  limboPayoutElement.textContent = formatPoints(LimboState.calculatePayout())

  // Update win chance
  limboChanceElement.textContent = LimboState.calculateWinChance() + "%"
}

// Play the limbo game
async function playLimboGame() {
  if (LimboState.isPlaying) return

  // Validate bet
  if (LimboState.bet <= 0 || LimboState.bet > getPlayerPoints()) {
    notifyError("Invalid bet amount!")
    return
  }

  // Deduct bet
  updatePlayerPoints(-LimboState.bet)

  // Disable controls
  limboBetButton.disabled = true
  limboAutoButton.disabled = true
  limboTargetInput.disabled = true
  limboBetInput.disabled = true

  // Reset multiplier display
  limboMultiplierElement.textContent = "1.00x"
  limboMultiplierElement.classList.remove("win", "lose")

  // Start animation
  await animateLimboGame()

  // Play the game
  const result = LimboState.play()

  // Show result
  limboMultiplierElement.textContent = result.multiplier + "x"
  limboMultiplierElement.classList.add(result.won ? "win" : "lose")

  // Play sound
  if (result.won) {
    SOUNDS.WIN.play()
    // Add winnings
    updatePlayerPoints(Number(result.payout))
    notifySuccess(`You won ${formatPoints(result.payout - LimboState.bet)} points!`)
    recordGameResult(calculateGameResult("Limbo", true, result.payout - LimboState.bet, result.multiplier))
  } else {
    SOUNDS.LOSE.play()
    notifyError(`You lost ${formatPoints(LimboState.bet)} points!`)
    recordGameResult(calculateGameResult("Limbo", false, LimboState.bet))
  }

  // Add to history
  addToLimboHistory({
    multiplier: result.multiplier,
    target: LimboState.targetMultiplier.toFixed(2),
    won: result.won,
  })

  // Re-enable controls
  limboBetButton.disabled = false
  limboAutoButton.disabled = false
  limboTargetInput.disabled = false
  limboBetInput.disabled = false

  // Reset progress bar
  limboProgressBar.style.width = "0%"
}

// Animate the limbo game
async function animateLimboGame() {
  return new Promise((resolve) => {
    const startMultiplier = 1.0
    const duration = 2000 // 2 seconds
    const startTime = Date.now()
    let progress = 0

    function updateAnimation() {
      const currentTime = Date.now()
      progress = Math.min((currentTime - startTime) / duration, 1)

      // Exponential growth for multiplier to simulate acceleration
      const currentMultiplier = startMultiplier * Math.pow(1.5, progress * 10)

      // Update display
      limboMultiplierElement.textContent = currentMultiplier.toFixed(2) + "x"

      // Update progress bar
      limboProgressBar.style.width = progress * 100 + "%"

      if (progress < 1) {
        requestAnimationFrame(updateAnimation)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(updateAnimation)
  })
}

// Add to limbo history
function addToLimboHistory(game) {
  // Create history item
  const historyItem = document.createElement("div")
  historyItem.className = "limbo-history-item"

  // Multiplier
  const multiplier = document.createElement("div")
  multiplier.className = "limbo-history-multiplier"
  multiplier.textContent = game.multiplier + "x"

  // Target
  const target = document.createElement("div")
  target.className = "limbo-history-target"
  target.textContent = "Target: " + game.target + "x"

  // Result
  const result = document.createElement("div")
  result.className = `limbo-history-result ${game.won ? "win" : "loss"}`
  result.textContent = game.won ? "WIN" : "LOSS"

  // Add to item
  historyItem.appendChild(multiplier)
  historyItem.appendChild(target)
  historyItem.appendChild(result)

  // Add to container
  limboHistoryContainer.prepend(historyItem)

  // Limit to 5 items
  const items = limboHistoryContainer.querySelectorAll(".limbo-history-item")
  if (items.length > 5) {
    limboHistoryContainer.removeChild(items[items.length - 1])
  }

  // Save to local storage
  saveLimboHistory()
}

// Save limbo history to local storage
function saveLimboHistory() {
  const items = limboHistoryContainer.querySelectorAll(".limbo-history-item")
  const history = []

  items.forEach((item) => {
    const multiplier = item.querySelector(".limbo-history-multiplier").textContent
    const target = item.querySelector(".limbo-history-target").textContent
    const won = item.querySelector(".limbo-history-result").classList.contains("win")

    history.push({
      multiplier: multiplier.replace("x", ""),
      target: target.replace("Target: ", "").replace("x", ""),
      won: won,
    })
  })

  localStorage.setItem("limbo_history", JSON.stringify(history))
}

// Load limbo history from local storage
function loadLimboHistory() {
  try {
    const history = JSON.parse(localStorage.getItem("limbo_history"))
    if (history && Array.isArray(history)) {
      // Clear container
      limboHistoryContainer.innerHTML = ""

      // Add items in reverse order (newest first)
      history.reverse().forEach((game) => {
        addToLimboHistory(game)
      })
    }
  } catch (e) {
    console.error("Error loading limbo history:", e)
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("limbo-multiplier")) {
    initializeLimbo()
  }
})
