#!/usr/bin/env node
const { main } = require("./main");
const { validationResult } = require("./services/validationResult");

(async function start() {
    let data = await main();
    validationResult(data, start);
})();
