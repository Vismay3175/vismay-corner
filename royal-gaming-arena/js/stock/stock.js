/**
 * Stock Market Game - VRA Edition
 * FINAL, STABLE & POLISHED: This version fixes all known bugs including chart visibility,
 * history saving, and introduces dynamic Y-axis scaling for a superior user experience.
 */

// --- DOM Elements & State ---
let stockCanvas, ctx, stockBetInput, startStockButton,
    stockResultElement, stockHistoryContainer, chartContainer, btnUp, btnDown,
    backtestControls, backtestInfo;

let animationFrameId, isPlaying = false, isBacktesting = false, keyframes = [],
    startTime, selectedDirection = null, betAmount = 0, pastGamesData = [], chartType = 'line';

// --- Constants ---
const GAME_DURATION = 10, MAX_HISTORY = 10;
const SVG_ICON_UP = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>`;
const SVG_ICON_DOWN = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg>`;

// --- Initialization ---
function initializeStock() {
    stockCanvas = document.getElementById("stock-chart");
    ctx = stockCanvas.getContext("2d");
    chartContainer = document.querySelector('.stock-chart-panel');
    stockBetInput = document.getElementById("stock-bet");
    startStockButton = document.getElementById("btn-start-stock");
    currentMultiplierElement = document.getElementById("stock-multiplier");
    stockResultElement = document.getElementById("stock-result");
    stockHistoryContainer = document.getElementById("stock-history");
    btnUp = document.getElementById('btn-direction-up');
    btnDown = document.getElementById('btn-direction-down');
    backtestControls = document.getElementById('backtest-controls');
    backtestInfo = document.getElementById('backtest-info');

    loadPastGamesData();
    loadStockHistory();
    setupEventListeners();
    resizeCanvas();
    renderCurrentState(); // This will now correctly render the last game on load
}

function setupEventListeners() {
    startStockButton.addEventListener("click", startStockGame);
    btnUp.addEventListener('click', () => selectDirection('up'));
    btnDown.addEventListener('click', () => selectDirection('down'));
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => switchChartView(btn.dataset.chartType));
    });
    document.querySelector('[data-action="bet-half"]').addEventListener('click', () => updateBet(0.5));
    document.querySelector('[data-action="bet-double"]').addEventListener('click', () => updateBet(2));
    document.querySelector('[data-action="bet-min"]').addEventListener('click', () => stockBetInput.value = stockBetInput.min);
    document.querySelector('[data-action="bet-max"]').addEventListener('click', () => stockBetInput.value = Math.min(stockBetInput.max, getPlayerPoints()));
    window.addEventListener("resize", () => {
        resizeCanvas();
        renderCurrentState();
    });
}

function updateBet(multiplier) {
    const currentBet = parseInt(stockBetInput.value, 10) || 0;
    let newBet = Math.floor(currentBet * multiplier);
    newBet = Math.max(parseInt(stockBetInput.min, 10), newBet);
    newBet = Math.min(parseInt(stockBetInput.max, 10), newBet, getPlayerPoints());
    stockBetInput.value = newBet;
}

function selectDirection(direction) {
    if (isPlaying) return;
    selectedDirection = direction;
    btnUp.classList.toggle('selected', direction === 'up');
    btnDown.classList.toggle('selected', direction === 'down');
    if (typeof SOUNDS !== 'undefined' && SOUNDS.CLICK) SOUNDS.CLICK.play();
}

function switchChartView(type) {
    if (isPlaying) return;
    chartType = type;
    document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.chartType === type));
    isBacktesting = (type === 'history');
    backtestControls.style.display = isBacktesting ? 'flex' : 'none';
    renderCurrentState();
}

// --- Game Flow ---
function startStockGame() {
    if (isPlaying) return;
    if (!selectedDirection) return notifyError("Please select a direction!");
    betAmount = parseInt(stockBetInput.value, 10);
    if (isNaN(betAmount) || betAmount < 10 || betAmount > getPlayerPoints()) {
        return notifyError("Invalid bet amount!");
    }
    if (chartType !== 'line') switchChartView('line');
    isPlaying = true;
    updatePlayerPoints(-betAmount);
    toggleControls(false);
    keyframes = generateKeyframes();
    startTime = performance.now();
    animationFrameId = requestAnimationFrame(animationLoop);
}

function animationLoop(currentTime) {
    if (!isPlaying) return;
    const elapsed = (currentTime - startTime) / 1000;
    if (elapsed >= GAME_DURATION) {
        endGame(GAME_DURATION);
        return;
    }
    renderLiveChart(elapsed);
    animationFrameId = requestAnimationFrame(animationLoop);
}

function endGame(elapsed) {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    const finalPercentage = getValueAtTime(elapsed);
    const playerWon = (selectedDirection === 'up' && finalPercentage > 0) || (selectedDirection === 'down' && finalPercentage < 0);
    const gamePath = [];
    for(let t = 0; t <= GAME_DURATION; t += 0.05) { // Increased density for smoother saved path
        gamePath.push({ time: t, value: getValueAtTime(t) });
    }
    saveGameData(gamePath);
    let winnings = 0;
    let remainingPoints = 0;
    if (playerWon) {
        winnings = Math.floor(betAmount * (Math.abs(finalPercentage) / 100));
        updatePlayerPoints(betAmount + winnings);
        stockResultElement.innerHTML = `WIN<br>+${formatPoints(winnings)}`;
        stockResultElement.className = 'stock-result show win';
    } else {
        remainingPoints = Math.floor(betAmount * (Math.abs(finalPercentage) / 100));
        updatePlayerPoints(betAmount - remainingPoints);
        stockResultElement.innerHTML = `LOSS<br>-${formatPoints(betAmount)}`;
        stockResultElement.className = 'stock-result show loss';
    }
    const gameResult = { result: finalPercentage > 0 ? "up" : "down", percentage: Math.abs(finalPercentage) };
    addToStockHistory(gameResult);
    setTimeout(() => {
        toggleControls(true);
        stockResultElement.classList.remove('show', 'win', 'loss');
        renderCurrentState();
    }, 3000);
}

// --- Chart Path & Animation Logic ---
function generateKeyframes() {
    let points = [{ time: 0, value: 0 }];
    let lastTime = 0;
    const numKeyframes = 3 + Math.floor(Math.random() * 3);
    for (let i = 1; i < numKeyframes; i++) {
        const nextTime = lastTime + (GAME_DURATION - lastTime) / (numKeyframes - i + Math.random());
        points.push({ time: nextTime, value: Math.random() * 180 - 90 }); // Clamped for better visuals
        lastTime = nextTime;
    }
    points.push({ time: GAME_DURATION, value: Math.random() * 180 - 90 });
    return points;
}

function getValueAtTime(t) {
    const time = Math.max(0, Math.min(t, GAME_DURATION));
    if (!keyframes || keyframes.length < 2) return 0;
    let p0, p1, p2, p3;
    for (let i = 0; i < keyframes.length - 1; i++) {
        if (time >= keyframes[i].time && time <= keyframes[i+1].time) {
            p1 = keyframes[i];
            p2 = keyframes[i+1];
            p0 = i > 0 ? keyframes[i-1] : p1;
            p3 = i < keyframes.length - 2 ? keyframes[i+2] : p2;
            break;
        }
    }
    if (!p1) {
        p1 = keyframes[keyframes.length - 2];
        p2 = keyframes[keyframes.length - 1];
        p0 = keyframes.length > 2 ? keyframes[keyframes.length - 3] : p1;
        p3 = p2;
    }
    const segmentDuration = p2.time - p1.time;
    const timeIntoSegment = time - p1.time;
    const t_norm = segmentDuration > 0 ? timeIntoSegment / segmentDuration : 0;
    return cubicHermiteSpline(p0.value, p1.value, p2.value, p3.value, t_norm);
}

function cubicHermiteSpline(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    const a0 = -0.5*p0 + 1.5*p1 - 1.5*p2 + 0.5*p3;
    const a1 = p0 - 2.5*p1 + 2*p2 - 0.5*p3;
    const a2 = -0.5*p0 + 0.5*p2;
    const a3 = p1;
    return a0*t3 + a1*t2 + a2*t + a3;
}

// --- NEW: Dynamic Y-Axis Scaling ---
function getChartBounds(paths, padding = 0.1) {
    let min = 0, max = 0;
    paths.forEach(path => {
        path.forEach(point => {
            if (point.value < min) min = point.value;
            if (point.value > max) max = point.value;
        });
    });

    // Add padding to prevent chart touching the edges
    const range = Math.max(max - min, 20); // Ensure a minimum range of 20% for small movements
    const paddingAmount = range * padding;
    min -= paddingAmount;
    max += paddingAmount;
    
    // Ensure 0 is always visible if the range crosses it
    if (min > -10 && max > 10) min = -10;
    if (max < 10 && min < -10) max = 10;
    
    return { min: Math.max(-105, min), max: Math.min(105, max) };
}

// --- Rendering Engine ---
function renderCurrentState() {
    if (isPlaying) return;
    const lastGame = pastGamesData.length > 0 ? [pastGamesData[0]] : [];
    const bounds = getChartBounds(lastGame);

    ctx.clearRect(0, 0, stockCanvas.width, stockCanvas.height);
    drawGrid(bounds);
    
    if (isBacktesting) {
        renderHistoryView();
    } else if (pastGamesData.length > 0) {
        if (chartType === 'candlestick') {
            renderCandlestickChart(lastGame[0], bounds);
        } else {
            drawChartPath(lastGame[0], bounds, false, true); // Render static line
        }
        updateMultiplierText(lastGame[0][lastGame[0].length - 1].value);
    } else {
        updateMultiplierText(0);
    }
}

function renderLiveChart(elapsed) {
    const path = [];
    const step = GAME_DURATION / 200; 
    for (let t = 0; t <= elapsed; t += step) {
        path.push({ time: t, value: getValueAtTime(t) });
    }
    path.push({ time: elapsed, value: getValueAtTime(elapsed) });
    
    const bounds = getChartBounds([path]);
    
    ctx.clearRect(0, 0, stockCanvas.width, stockCanvas.height);
    drawGrid(bounds);
    drawChartPath(path, bounds, false, false);
    updateMultiplierText(path[path.length - 1].value);
}

function renderHistoryView() {
    const bounds = getChartBounds(pastGamesData);
    drawGrid(bounds);
    if (pastGamesData.length > 0) {
        pastGamesData.forEach(gamePath => drawChartPath(gamePath, bounds, true, false));
    }
    updateMultiplierText(0);
}

function renderCandlestickChart(pathData, bounds) {
    const { width, height } = stockCanvas;
    const range = bounds.max - bounds.min;
    if (range === 0) return;
    const scaleY = height / range;
    
    for (let i = 0; i < GAME_DURATION; i++) {
        const pointsInInterval = pathData.filter(p => p.time >= i && p.time < i + 1);
        if (pointsInInterval.length < 2) continue;
        const open = pointsInInterval[0].value, close = pointsInInterval[pointsInInterval.length - 1].value;
        const high = Math.max(...pointsInInterval.map(p => p.value)), low = Math.min(...pointsInInterval.map(p => p.value));
        const x = ((i + 0.5) / GAME_DURATION) * width;
        const color = close >= open ? 'var(--color-success-500)' : 'var(--color-error-500)';
        
        // Wick
        const wickHighY = height - (high - bounds.min) * scaleY;
        const wickLowY = height - (low - bounds.min) * scaleY;
        ctx.strokeStyle = color; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, wickHighY); ctx.lineTo(x, wickLowY); ctx.stroke();
        
        // Body
        const bodyTopY = height - (Math.max(open, close) - bounds.min) * scaleY;
        const bodyHeight = Math.abs(open - close) * scaleY;
        ctx.fillStyle = color;
        ctx.fillRect(x - 5, bodyTopY, 10, Math.max(1, bodyHeight));
    }
}

function drawGrid(bounds) {
    const { width, height } = stockCanvas;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "12px var(--font-primary)";
    ctx.textAlign = "left";
    
    const range = bounds.max - bounds.min;
    if (range === 0) return;
    
    const numLines = 5;
    for (let i = 0; i <= numLines; i++) {
        const value = bounds.min + (range / numLines) * i;
        const y = height - (height / numLines) * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        ctx.fillText(`${value.toFixed(1)}%`, 5, y - 5);
    }
}

function drawChartPath(pathData, bounds, isGhost, isStatic) {
    if (pathData.length < 2) return;
    const { width, height } = stockCanvas;
    const range = bounds.max - bounds.min;
    if (range === 0) return;
    const scaleY = height / range;
    
    const lastValue = pathData[pathData.length - 1].value;
    let color = isStatic ? 'var(--color-gold)' : (isGhost ? 'rgba(255, 255, 255, 0.2)' : (lastValue >= 0 ? 'var(--color-success-500)' : 'var(--color-error-500)'));
    
    ctx.beginPath();
    pathData.forEach((point, i) => {
        const x = (point.time / GAME_DURATION) * width;
        const y = height - (point.value - bounds.min) * scaleY;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    
    ctx.strokeStyle = color;
    ctx.lineWidth = isGhost ? 1.5 : 3;
    if (isGhost) ctx.setLineDash([2, 4]);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.setLineDash([]);
}

// --- UI Helpers ---
function updateMultiplierText(value) {
    currentMultiplierElement.textContent = `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
    currentMultiplierElement.style.color = isPlaying ? (value >= 0 ? 'var(--color-success-500)' : 'var(--color-error-500)') : 'var(--color-gold)';
}

function toggleControls(enabled) {
    stockBetInput.disabled = !enabled;
    startStockButton.disabled = !enabled;
    btnUp.disabled = !enabled;
    btnDown.disabled = !enabled;
    document.querySelectorAll('.view-btn, .btn-subtle').forEach(b => b.disabled = !enabled);
    if (enabled) {
        btnUp.classList.remove('selected');
        btnDown.classList.remove('selected');
        selectedDirection = null;
    }
}

function resizeCanvas() {
    stockCanvas.width = chartContainer.clientWidth;
    stockCanvas.height = chartContainer.clientHeight;
}

// --- Data Persistence ---
function addToStockHistory(game) {
    const item = document.createElement("div");
    item.className = `stock-history-item ${game.result}`;
    const icon = game.result === 'up' ? SVG_ICON_UP : SVG_ICON_DOWN;
    item.innerHTML = `${icon}<span>${Math.round(game.percentage)}%</span>`;
    stockHistoryContainer.prepend(item);
    if (stockHistoryContainer.children.length > MAX_HISTORY) {
        stockHistoryContainer.removeChild(stockHistoryContainer.lastChild);
    }
    saveStockHistory();
}

function saveStockHistory() {
    const history = Array.from(stockHistoryContainer.children).map(item => item.outerHTML);
    localStorage.setItem("stock_history_v7", JSON.stringify(history));
}

function loadStockHistory() {
    const historyHTML = JSON.parse(localStorage.getItem("stock_history_v7") || "[]");
    stockHistoryContainer.innerHTML = historyHTML.join('');
}

// CRITICAL FIX: Save the entire array, not just one path.
function saveGameData(path) {
    pastGamesData.unshift(path);
    if (pastGamesData.length > MAX_HISTORY) pastGamesData.pop();
    localStorage.setItem('stock_past_games_v7', JSON.stringify(pastGamesData));
}

function loadPastGamesData() {
    pastGamesData = JSON.parse(localStorage.getItem('stock_past_games_v7') || "[]");
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("stock-screen")) initializeStock();
});