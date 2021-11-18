const inquirer = require('inquirer');

const { hgetAllAsync, redisClient } = require('./redis');

async function getTrucksVolume(index) {
    let data = await hgetAllAsync('user');
    let volume = data && data[`volume${index}`];

    if (!volume) {
        const answer = await inquirer.prompt(
            {
                type: 'input',
                name: 'volume',
                message: `De quel volume dispose le camion ${index + 1}`,
            }
        );

        if (answer.volume === '' || isNaN(answer.volume)) {
            return await getTrucksVolume(index);
        } else {
            volume = answer.volume * 1;
            redisClient.hset('user', `volume${index}`, volume);
        }
    }

    return volume;
}

exports.getTrucksVolume = getTrucksVolume;
