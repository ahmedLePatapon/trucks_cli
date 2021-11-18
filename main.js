const utils = require("./utils");
const { getName } = require("./services/getName");
const { getCompanyName } = require("./services/getCompanyName");
const { getEmployeNbr } = require("./services/getEmployeNbr");
const { getEmployeName } = require("./services/getEmployeName");
const { getTrucksDetails } = require("./services/getTrucksDetails");
const { getTrucksNbr } = require("./services/getTrucksNbr");
const { validationResult } = require("./services/validationResult");

async function main() {
    let output = {};
    if (!output.name) {
        output.name = await getName();
    }

    if (!output.companyName) {
        output.companyName = await getCompanyName();
    }

    if (!output.employesNumber) {
        output.employesNumber = await getEmployeNbr();
    }

    if (!output.employeNames) {
        output.employeNames = utils.arrayifyNbr.arrayifyNbr(output.employesNumber);
        for (const employe of output.employeNames) {
            let employeNames = await getEmployeName(employe);
            output.employeNames[employe] = employeNames;
        }
    }

    if (!output.trucksNumber) {
        output.trucksNumber = await getTrucksNbr();
    }

    if (!output.trucks) {
        output.trucks = utils.arrayifyNbr.arrayifyNbr(output.trucksNumber);
        for (const truck of output.trucks) {
            let trucks = await getTrucksDetails(truck);
            output.trucks[truck] = trucks;
        }
    }
    return output;
}

exports.main = main;
