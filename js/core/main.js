var player = {
    currencies: {
        electrons: new Decimal(10),
    },

    generators: {
        1: {
            cost: new Decimal(10),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        2: {
            cost: new Decimal(100),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        3: {
            cost: new Decimal(10000),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },
    },

    options: {
        notation: "Standard",
    },
}

var chosenFPS = 60
var msPerFrame = 1000 / chosenFPS

function updateAll() {
    gen = player.generators
    document.getElementById("elAmount").innerHTML = player.currencies.electrons.toStringWithDecimalPlaces(2)
    document.getElementById("elPerSec").innerHTML = Decimal.mul(gen[1].amount, gen[1].power).toFixed(2) + "/sec"
    player.currencies.electrons = Decimal.add(player.currencies.electrons, Decimal.div(Decimal.mul(gen[1].amount, gen[1].power), chosenFPS))
    for (i = 0; i < 3; i++){
        document.getElementById("gen" + (i+1) + "Mult").innerHTML = "x" + gen[i+1].power.toFixed(2)
        document.getElementById("gen" + (i+1) + "AmBht").innerText = "[" + gen[i+1].amount.toFixed(2) + ", " + gen[i+1].bought + "]"
        document.getElementById("gen" + (i+1) + "Cost").innerHTML = formatValue(player.options.notation, gen[i+1].cost, 2, 1)
    }
}

function productionLoop() {
    for (let i = 0; i < 2; i++) {
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