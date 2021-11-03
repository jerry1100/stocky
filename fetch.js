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

module.exports = fetch;
