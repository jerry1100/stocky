const https = require("https");

function fetch(url) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Timeout"), 5000);

        https.get(url, (res) => {
            res.setEncoding("utf8");

            let body = "";
            res.on("data", (data) => (body += data));

            res.on("end", () => {
                clearTimeout(timeout);

                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
}

(async function iPhone13Pro() {
    const model = "MG8W3LL/A";
    const url = `https://www.apple.com/shop/fulfillment-messages?pl=true&mt=compact&cppart=UNLOCKED/US&parts.0=${model}&searchNearby=true&store=R210`;
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
