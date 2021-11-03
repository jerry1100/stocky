const fetch = require("./fetch");

(async function checkStock() {
    const response = await fetch(
        "https://inv.mp.microsoft.com/v2.0/inventory/US?mode=continueOnError",
        [
            {
                condition: "IsOutOfStock1",
                productId: "8WJ714N3RBTL",
                skuId: "490G",
                inventorySkuId: "RRT-00001",
                availabilityId: "8WFTS4MLK3L9",
                distributorId: "9000000013",
            },
        ]
    );

    const isAvailable = response.inStock !== "False";

    if (isAvailable) {
        process.exit(1);
    }
})();
