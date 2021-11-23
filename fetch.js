const https = require("https");

function fetch(url, { data, headers, notJson } = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            url,
            {
                method: data ? "POST" : "GET",
                timeout: 3000,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            },
            (res) => {
                let body = "";
                res.on("data", (data) => (body += data));
                res.on("end", () => resolve(notJson ? body : JSON.parse(body)));
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
