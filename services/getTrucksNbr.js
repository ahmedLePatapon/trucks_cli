const inquirer = require('inquirer');

const { hgetAllAsync, redisClient } = require('./redis');

async function getTrucksNbr() {
    let data = await hgetAllAsync('user');
    let trucksNumber = data && data.trucksNumber;

    if (!trucksNumber) {
        let answer = await inquirer.prompt({
            type: 'input',
            name: 'trucksNumber',
            value: 'number',
            message: 'Combien avez-vous de camions?'
        });

        if (answer.trucksNumber === '' || isNaN(answer.trucksNumber)) {
            return await getTrucksNbr();
        } else {
            trucksNumber = answer.trucksNumber * 1;
            redisClient.hset('user', 'trucksNumber', trucksNumber);
        }
    }

    return trucksNumber
}

exports.getTrucksNbr = getTrucksNbr;
