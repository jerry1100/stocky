const fetch = require("./fetch");

// Replace body with item-specific logic
(async function checkStock() {
    const response = await fetch("foobar");
    const isAvailable = response.foo.bar;

    if (isAvailable) {
        console.log("Available!!!");
        process.exit(1);
    }

    console.log("Unavailable");
})();
