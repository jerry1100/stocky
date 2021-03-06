const fetch = require("./fetch");

(async function checkStock() {
    const model = "MM0Y3ZM/A";
    const url = `https://www.apple.com/shop/fulfillment-messages?searchNearby=true&parts.0=${model}&store=R073`;
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
