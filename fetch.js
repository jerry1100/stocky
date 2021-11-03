const https = require("https");

function fetch(url, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            url,
            {
                method: data ? "POST" : "GET",
                timeout: 3000,
                headers: {
                    "Content-Type": "application/json",
                },
            },
            (res) => {
                let body = "";
                res.on("data", (data) => (body += data));
                res.on("end", () => resolve(JSON.parse(body)));
            }
        );

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.on("error", (error) => reject(error));
        req.end();
    });
}

module.exports = fetch;
