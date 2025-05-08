/**
 * Stock market game implementation
 */

let stockCanvas
let ctx
let animationFrame
let graphPoints = []
let isPlaying = false
let startTime
let marketDirection
let currentPercentage = 0
let selectedDirection = null
let betAmount = 0
let stockBetInput
let startStockButton
// let cashoutButton
// let currentMultiplierElement
// let stockHistoryContainer

// Declare missing variables
// const SOUNDS = {
//   CLICK: { play: () => console.log("SOUNDS.CLICK.play()") }, // Mock implementation
// }

// function notifyError(message) {
//   console.error(message)
// }

// function updatePlayerPoints(points) {
//   console.log(`Updating player points by ${points}`)
// }

// function notifySuccess(message) {
//   console.log(message)
// }

// function formatPoints(points) {
//   return points.toString()
// }

// function calculateGameResult(game, won, points, multiplier) {
//   return {
//     game: game,
//     won: won,
//     points: points,
//     multiplier: multiplier,
//   }
// }

// function recordGameResult(result) {
//   console.log("Game Result:", result)
// }

// function getPlayerPoints() {
//   return 1000 // Mock implementation
// }

// Initialize the stock market game
function initializeStock() {
  // Get DOM elements
  stockCanvas = document.getElementById("stock-chart")
  stockBetInput = document.getElementById("stock-bet")
  startStockButton = document.getElementById("btn-start-stock")
  cashoutButton = document.getElementById("btn-cashout-stock")
  currentMultiplierElement = document.getElementById("stock-multiplier")

  // Add direction buttons to the UI
  setupDirectionButtons()

  // Add history container
  setupHistoryContainer()

  // Set up canvas
  ctx = stockCanvas.getContext("2d")

  // Set initial values
  stockBetInput.value = 50

  // Set up event listeners
  setupStockEventListeners()

  // Initial render
  resizeCanvas()
  renderEmptyChart()

  // Load history
  loadStockHistory()
}

// Set up direction buttons
function setupDirectionButtons() {
  const stockControls = document.querySelector(".stock-controls")

  // Create direction buttons container
  const directionContainer = document.createElement("div")
  directionContainer.className = "direction-buttons"

  // Up button
  const upButton = document.createElement("button")
  upButton.id = "btn-direction-up"
  upButton.className = "btn direction-btn"
  upButton.innerHTML = "Up <span class='direction-arrow'>↑</span>"

  // Down button
  const downButton = document.createElement("button")
  downButton.id = "btn-direction-down"
  downButton.className = "btn direction-btn"
  downButton.innerHTML = "Down <span class='direction-arrow'>↓</span>"

  // Add buttons to container
  directionContainer.appendChild(upButton)
  directionContainer.appendChild(downButton)

  // Insert before the stock controls
  stockControls.parentNode.insertBefore(directionContainer, stockControls)
}

// Set up history container
function setupHistoryContainer() {
  const stockGame = document.querySelector(".stock-game")

  // Create history container
  const historyContainer = document.createElement("div")
  historyContainer.className = "stock-history-container"
  historyContainer.innerHTML = `
    <h3>Recent Games</h3>
    <div class="stock-history" id="stock-history"></div>
  `

  // Add to game container
  stockGame.appendChild(historyContainer)

  // Save reference
  stockHistoryContainer = document.getElementById("stock-history")
}

// Set up event listeners
function setupStockEventListeners() {
  // Bet input
  stockBetInput.addEventListener("change", () => {
    const betAmount = Number.parseInt(stockBetInput.value)
    if (isNaN(betAmount) || betAmount < 10) {
      stockBetInput.value = 10
    } else if (betAmount > getPlayerPoints()) {
      stockBetInput.value = getPlayerPoints()
    }
  })

  // Start button
  startStockButton.addEventListener("click", startStockGame)

  // Cashout button - not used in this version but keeping for UI consistency
  cashoutButton.addEventListener("click", () => {})

  // Direction buttons
  document.getElementById("btn-direction-up").addEventListener("click", () => {
    selectDirection("up")
  })

  document.getElementById("btn-direction-down").addEventListener("click", () => {
    selectDirection("down")
  })

  // Quick amount buttons
  document.querySelectorAll(".quick-amount").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = Number.parseInt(btn.dataset.amount)
      if (amount <= getPlayerPoints()) {
        stockBetInput.value = amount
        SOUNDS.CLICK.play()
      }
    })
  })

  // Window resize
  window.addEventListener("resize", resizeCanvas)
}

// Select direction
function selectDirection(direction) {
  if (isPlaying) return

  selectedDirection = direction

  // Update UI
  const upButton = document.getElementById("btn-direction-up")
  const downButton = document.getElementById("btn-direction-down")

  if (direction === "up") {
    upButton.classList.add("primary")
    downButton.classList.remove("primary")
  } else {
    downButton.classList.add("primary")
    upButton.classList.remove("primary")
  }

  SOUNDS.CLICK.play()
}

// Start the stock game
// Store the dynamic percentage at the beginning and reuse it
let gameDynamicPercentage = null;
// Track market shock events
let marketShocks = [];

function startStockGame() {
  if (isPlaying) return

  // Check if direction is selected
  if (!selectedDirection) {
    notifyError("Please select a direction (Up or Down)!")
    return
  }

  betAmount = Number.parseInt(stockBetInput.value)
  if (isNaN(betAmount) || betAmount < 10 || betAmount > getPlayerPoints()) {
    notifyError("Invalid bet amount!")
    return
  }

  // Deduct bet
  updatePlayerPoints(-betAmount)

  // Reset game state
  isPlaying = true
  graphPoints = []
  startTime = Date.now()
  currentPercentage = 0
  
  // Generate a dynamic percentage once at the beginning of the game
  gameDynamicPercentage = generateDynamicPercentage()
  
  // Plan random market shocks (dramatic price movements)
  marketShocks = generateMarketShocks(10); // 10 second game duration

  // Determine final market direction (random)
  // This will be the actual market movement, not necessarily what the player bet on
  marketDirection = Math.random() < 0.5 ? "up" : "down"

  // Update UI
  startStockButton.disabled = true
  stockBetInput.disabled = true
  document.getElementById("btn-direction-up").disabled = true
  document.getElementById("btn-direction-down").disabled = true
  cashoutButton.disabled = true // No cashout in this version, game runs to completion

  // Start animation
  animate()
}

function generateDynamicPercentage() {
  // Generate a random number between 0 and 1
  const random = Math.random();
  
  // 10% chance of returning a high value (above 90%)
  if (random < 0.1) {
    // Return a value between 90% and 100%
    return 90 + (Math.random() * 10);
  } else {
    // 90% chance of returning a value between 20% and 30%
    return 20 + (Math.random() * 10);
  }
}

// Generate market shocks (sudden price changes)
function generateMarketShocks(duration) {
  const shocks = [];
  
  // 50% chance to have a market shock
  if (Math.random() < 0.5) {
    // Place shock somewhere between 3-7 seconds (not too early, not too late)
    const shockTime = 3 + Math.random() * 4;
    
    // Determine shock magnitude (dramatic drop or spike)
    const isPositiveShock = Math.random() < 0.3; // 30% chance for positive shock
    const shockMagnitude = isPositiveShock ? 
      40 + Math.random() * 40 : // Positive shock (+40% to +80%)
      -(40 + Math.random() * 60); // Negative shock (-40% to -100%)
    
    shocks.push({
      time: shockTime,
      magnitude: shockMagnitude,
      duration: 0.5 + Math.random() * 1.5 // Shock lasts 0.5-2 seconds
    });
  }
  
  return shocks;
}

// Animation loop
function animate() {
  const now = Date.now()
  const elapsed = (now - startTime) / 1000
  const duration = 10 // 10 seconds total game duration

  if (elapsed >= duration) {
    // Game complete
    endGame()
    return
  }

  // Calculate current percentage (-100% to +100%)
  const progress = elapsed / duration
  
  // Calculate base movement
  let baseMovement = marketDirection === "up"
    ? progress * gameDynamicPercentage // Trend upward
    : -progress * gameDynamicPercentage // Trend downward

  // Apply market shock effect if active
  let shockEffect = 0;
  for (const shock of marketShocks) {
    // Check if we're in a shock period
    if (elapsed >= shock.time && elapsed <= shock.time + shock.duration) {
      // Calculate how far into the shock we are (0-1)
      const shockProgress = (elapsed - shock.time) / shock.duration;
      
      // Apply shock with a smooth entry and exit
      // Using sine curve to create smooth transitions
      const shockIntensity = Math.sin(shockProgress * Math.PI) * shock.magnitude;
      shockEffect += shockIntensity;
    }
  }

  // Add some volatility
  const volatility = 30
  const noise = Math.sin(elapsed * 5) * volatility * (1 - progress)

  // Combine all effects
  currentPercentage = baseMovement + noise + shockEffect

  // Clamp between -100 and 100
  currentPercentage = Math.max(-100, Math.min(100, currentPercentage))

  // Add point to graph
  graphPoints.push({ time: elapsed, value: currentPercentage })

  // Update percentage display
  currentMultiplierElement.textContent = (currentPercentage >= 0 ? "+" : "") + currentPercentage.toFixed(2) + "%"

  // Update color based on movement
  if (currentPercentage >= 0) {
    currentMultiplierElement.style.color = "var(--color-success-500)"
  } else {
    currentMultiplierElement.style.color = "var(--color-error-500)"
  }

  // Render graph
  renderChart()

  // Continue animation
  if (isPlaying) {
    animationFrame = requestAnimationFrame(animate)
  }
}

// End the game
function endGame() {
  isPlaying = false
  cancelAnimationFrame(animationFrame)

  // Determine if player won
  const finalPercentage = currentPercentage
  const playerWon =
    (selectedDirection === "up" && finalPercentage > 0) || (selectedDirection === "down" && finalPercentage < 0)

    // Calculate the percentage-based amount
  const percentageAmount = Math.floor((betAmount * Math.abs(finalPercentage)) / 100)

  // Calculate winnings
  let winnings = 0
  if (playerWon) {
    // Win amount is bet * percentage/100
    const winPercentage = Math.abs(finalPercentage) / 100
    winnings = Math.floor(betAmount * winPercentage)

    // Update points
    updatePlayerPoints(betAmount + winnings)

    // Show success message
    notifySuccess(
      `You won! Market went ${finalPercentage > 0 ? "up" : "down"} by ${Math.abs(finalPercentage).toFixed(2)}%. Won ${formatPoints(winnings)} points!`,
    )

    // Record win
    recordGameResult({
      game: "Stock",
      won: true,
      amount: winnings,
      timestamp: new Date().toISOString(),
      multiplier: 1 + Math.abs(finalPercentage) / 100,
      direction: selectedDirection,
      result: finalPercentage > 0 ? "up" : "down",
      percentage: Math.abs(finalPercentage).toFixed(2),
    })
  } else {
    // For losses, deduct the percentage-based amount
    // We already deducted the full bet at the start, so we need to return the remaining amount
    const lossAmount = percentageAmount
    const refundAmount = betAmount - lossAmount

    // Return the portion of the bet that wasn't lost
    if (refundAmount > 0) {
      updatePlayerPoints(refundAmount)
    }

    // Show loss message
    notifyError(
      `You lost! Market went ${finalPercentage > 0 ? "up" : "down"} by ${Math.abs(finalPercentage).toFixed(2)}%.`,
    )

    // Record loss
    recordGameResult({
      game: "Stock",
      won: false,
      amount: betAmount,
      timestamp: new Date().toISOString(),
      multiplier: 0,
      direction: selectedDirection,
      result: finalPercentage > 0 ? "up" : "down",
      percentage: Math.abs(finalPercentage).toFixed(2),
    })
  }

  // Add to history
  addToStockHistory({
    direction: selectedDirection,
    result: finalPercentage > 0 ? "up" : "down",
    percentage: Math.abs(finalPercentage).toFixed(2),
    won: playerWon,
  })

  // Reset UI
  startStockButton.disabled = false
  stockBetInput.disabled = false
  document.getElementById("btn-direction-up").disabled = false
  document.getElementById("btn-direction-down").disabled = false
  cashoutButton.disabled = true

  // Reset direction selection
  document.getElementById("btn-direction-up").classList.remove("primary")
  document.getElementById("btn-direction-down").classList.remove("primary")
  selectedDirection = null

  // Render final state
  renderChart()
}

// Add to stock history
function addToStockHistory(game) {
  // Create history item
  const historyItem = document.createElement("div")
  historyItem.className = "stock-history-item"

  // Direction icon
  const directionIcon = document.createElement("div")
  directionIcon.className = `direction-icon ${game.direction}`
  directionIcon.innerHTML = game.direction === "up" ? "↑" : "↓"

  // Result
  const resultText = document.createElement("div")
  resultText.className = "result-text"
  resultText.textContent = `${game.result === "up" ? "↑" : "↓"} ${game.percentage}%`

  // Outcome
  const outcome = document.createElement("div")
  outcome.className = `outcome ${game.won ? "win" : "loss"}`
  outcome.textContent = game.won ? "WIN" : "LOSS"

  // Add to item
  historyItem.appendChild(directionIcon)
  historyItem.appendChild(resultText)
  historyItem.appendChild(outcome)

  // Add to container
  stockHistoryContainer.prepend(historyItem)

  // Limit to 5 items
  const items = stockHistoryContainer.querySelectorAll(".stock-history-item")
  if (items.length > 5) {
    stockHistoryContainer.removeChild(items[items.length - 1])
  }

  // Save to local storage
  saveStockHistory()
}

// Save stock history to local storage
function saveStockHistory() {
  const items = stockHistoryContainer.querySelectorAll(".stock-history-item")
  const history = []

  items.forEach((item) => {
    const direction = item.querySelector(".direction-icon").classList.contains("up") ? "up" : "down"
    const resultText = item.querySelector(".result-text").textContent
    const result = resultText.includes("↑") ? "up" : "down"
    const percentage = Number.parseFloat(resultText.match(/[\d.]+/)[0])
    const won = item.querySelector(".outcome").classList.contains("win")

    history.push({ direction, result, percentage, won })
  })

  localStorage.setItem("stock_history", JSON.stringify(history))
}

// Load stock history from local storage
function loadStockHistory() {
  try {
    const history = JSON.parse(localStorage.getItem("stock_history"))
    if (history && Array.isArray(history)) {
      // Clear container
      stockHistoryContainer.innerHTML = ""

      // Add items in reverse order (newest first)
      history.reverse().forEach((game) => {
        addToStockHistory(game)
      })
    }
  } catch (e) {
    console.error("Error loading stock history:", e)
  }
}

// Render the chart
function renderChart() {
  ctx.clearRect(0, 0, stockCanvas.width, stockCanvas.height)

  const centerY = stockCanvas.height / 2
  const scaleY = centerY / 100 // Scale factor for percentage

  // Draw background grid
  drawGrid()

  if (graphPoints.length < 2) return

  // Draw line
  ctx.beginPath()

  // Start at the center line (0%)
  ctx.moveTo(0, centerY)

  // Draw line
  graphPoints.forEach((point, i) => {
    const x = (point.time / 10) * stockCanvas.width
    const y = centerY - point.value * scaleY

    if (i === 0) {
      ctx.lineTo(x, centerY) // Start at center
    } else {
      ctx.lineTo(x, y)
    }
  })

  // Line style
  ctx.strokeStyle = currentPercentage >= 0 ? "var(--color-success-500)" : "var(--color-error-500)"
  ctx.lineWidth = 3
  ctx.stroke()

  // Add gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, stockCanvas.height)
  if (currentPercentage >= 0) {
    gradient.addColorStop(0, "rgba(0, 230, 89, 0.2)")
    gradient.addColorStop(0.5, "rgba(0, 230, 89, 0.05)")
    gradient.addColorStop(1, "rgba(0, 230, 89, 0)")
  } else {
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)")
    gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.05)")
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)")
  }

  ctx.beginPath()
  ctx.moveTo(0, centerY)

  graphPoints.forEach((point, i) => {
    const x = (point.time / 10) * stockCanvas.width
    const y = centerY - point.value * scaleY
    ctx.lineTo(x, y)
  })

  const lastPoint = graphPoints[graphPoints.length - 1]
  const lastX = (lastPoint.time / 10) * stockCanvas.width

  ctx.lineTo(lastX, centerY)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()

  // Draw current position dot
  if (graphPoints.length > 0) {
    const lastPoint = graphPoints[graphPoints.length - 1]
    const x = (lastPoint.time / 10) * stockCanvas.width
    const y = centerY - lastPoint.value * scaleY

    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = currentPercentage >= 0 ? "var(--color-success-500)" : "var(--color-error-500)"
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()
  }
}

// Draw grid
function drawGrid() {
  const centerY = stockCanvas.height / 2

  // Draw center line (0%)
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(stockCanvas.width, centerY)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw +100%, +50%, -50%, and -100% lines
  ctx.beginPath()

  // +100%
  ctx.moveTo(0, 0)
  ctx.lineTo(stockCanvas.width, 0)

  // +50%
  ctx.moveTo(0, centerY / 2)
  ctx.lineTo(stockCanvas.width, centerY / 2)

  // -50%
  ctx.moveTo(0, centerY + centerY / 2)
  ctx.lineTo(stockCanvas.width, centerY + centerY / 2)

  // -100%
  ctx.moveTo(0, stockCanvas.height)
  ctx.lineTo(stockCanvas.width, stockCanvas.height)

  // Vertical grid lines
  for (let i = 1; i < 10; i++) {
    const x = (i / 10) * stockCanvas.width
    ctx.moveTo(x, 0)
    ctx.lineTo(x, stockCanvas.height)
  }

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  ctx.stroke()

  // Label the lines
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  ctx.font = "12px var(--font-primary)"
  ctx.textAlign = "left"
  ctx.fillText("+100%", 5, 15)
  ctx.fillText("+50%", 5, centerY / 2 - 5)
  ctx.fillText("0%", 5, centerY - 5)
  ctx.fillText("-50%", 5, centerY + centerY / 2 - 5)
  ctx.fillText("-100%", 5, stockCanvas.height - 5)
}

// Render empty chart
function renderEmptyChart() {
  ctx.clearRect(0, 0, stockCanvas.width, stockCanvas.height)
  drawGrid()
}

// Resize canvas
function resizeCanvas() {
  const container = stockCanvas.parentElement
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  // Set canvas dimensions to match container, accounting for padding
  stockCanvas.width = containerWidth - 20 // Adjust for padding
  stockCanvas.height = containerHeight - 60 // Adjust for padding and info bar

  // Ensure minimum height
  if (stockCanvas.height < 150) {
    stockCanvas.height = 150
  }

  if (!isPlaying) {
    renderEmptyChart()
  } else {
    renderChart()
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("stock-chart")) {
    initializeStock()
  }
})

// Add window resize event listener to ensure canvas resizes properly
window.addEventListener("resize", () => {
  if (stockCanvas) {
    resizeCanvas()
  }
})
