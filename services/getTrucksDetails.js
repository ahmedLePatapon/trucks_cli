const { getTrucksType } = require("./getTrucksType");
const { getTrucksVolume } = require("./getTrucksVolume");

async function getTrucksDetails(index) {
    let truckDetails = {};

    if (!truckDetails.volume || truckDetails.volume !== undefined) {
        truckDetails.volume = await getTrucksVolume(index);
    }

    if (!truckDetails.type || truckDetails.type !== undefined) {
        truckDetails.type = await getTrucksType(index);
    }

    return truckDetails
};

exports.getTrucksDetails = getTrucksDetails;
