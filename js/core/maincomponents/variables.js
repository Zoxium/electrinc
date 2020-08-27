var player = {
    currencies: {
        electrons: new Decimal(10),
        elPerSec: new Decimal(0),
    },

    generators: {
        1: {
            cost: new Decimal(1e1),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        2: {
            cost: new Decimal(1e2),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        3: {
            cost: new Decimal(1e4),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        4: {
            cost: new Decimal(1e7),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        5: {
            cost: new Decimal(1e11),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        6: {
            cost: new Decimal(1e16),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },

        7: {
            cost: new Decimal(1e22),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },
        
        8: {
            cost: new Decimal(1e29),
            amount: new Decimal(0),
            bought: 0,
            power: 1,
        },
    },

    options: {
        notation: "Standard",
        currentTab: "generators"
    },
}
