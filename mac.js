const fetch = require("./fetch");

(async function checkStock() {
    const model = "MKGQ3LL/A";
    const url = `https://www.apple.com/shop/fulfillment-messages?parts.0=${model}&searchNearby=true&mt=regular&store=R073&_=1636885372303`;
    const response = await fetch(url);

    const stores = response.body.content.pickupMessage.stores.map((store) => ({
        name: store.storeName,
        available: store.partsAvailability[model].pickupDisplay === "available",
    }));

    const availableStores = stores
        .filter((store) => store.available)
        .map((store) => store.name);

    if (availableStores.length) {
        console.log("Available!!!", availableStores);
        process.exit(1);
    }

    const unavailableStores = stores
        .filter((store) => !store.available)
        .map((store) => store.name);

    console.log("Unavailable", unavailableStores);
})();
