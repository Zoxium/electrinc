// This code will have some comments to indicate things that might be confusing to new programmers.

var chosenFPS = 60
var msPerFrame = 1000 / chosenFPS

function updateAll() {
    gen = player.generators
    
    player.currencies.electrons = Decimal.add(player.currencies.electrons, Decimal.div(Decimal.mul(gen[1].amount, gen[1].power), chosenFPS))
    player.currencies.elPerSec = Decimal.mul(gen[1].amount, gen[1].power)
    document.getElementById("elAmount").innerHTML = formatValue("Standard", player.currencies.electrons, 2, 2)
    document.getElementById("elPerSec").innerHTML = formatValue("Standard", player.currencies.elPerSec, 2, 2)

    // This part was very confusing for me.

    for (i = 0; i < 4; i++){
        document.getElementById("gen" + (i+1) + "Mult").innerHTML = "x" + gen[i+1].power.toFixed(2)
        document.getElementById("gen" + (i+1) + "AmBht").innerText = "[" + gen[i+1].amount.toFixed(2) + ", " + gen[i+1].bought + "]"
        document.getElementById("gen" + (i+1) + "Cost").innerHTML = formatValue(player.options.notation, gen[i+1].cost, 2, 2)

        if (Decimal.gte(player.currencies.electrons, player.generators[i+1].cost)) { // For your info, "Decimal.gte" means greater than or equal to. If you use break_eternity/infinity.js and just use the regular lesser or greater than sign, this wouldn't work. //
            document.getElementById("buyGen" + (i+1)).className = "buyableBtns"
        } else {
            document.getElementById("buyGen" + (i+1)).className = "unbuyableBtns"
        }
    }
}

function productionLoop() {
    for (let i = 0; i < 3; i++) {
        player.generators[i+1].amount = Decimal.add(player.generators[i+1].amount, Decimal.div(Decimal.mul(player.generators[i+2].amount, player.generators[i+2].power), chosenFPS * 10))
    }
}

function buyPrimGen(num) {
    if (Decimal.gte(player.currencies.electrons, player.generators[num].cost)) {
        player.currencies.electrons = Decimal.sub(player.currencies.electrons, player.generators[num].cost)
        
        player.generators[num].bought += 1
        player.generators[num].amount = Decimal.add(player.generators[num].amount, 1)
        player.generators[num].power = Decimal.mul(player.generators[num].power, 2.5)
        player.generators[num].cost = Decimal.mul(player.generators[num].cost, Decimal.pow(100, num))
    }
}

function allLoop() {
    updateAll()
    productionLoop()
}

setInterval(allLoop, msPerFrame)

