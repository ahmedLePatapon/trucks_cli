const inquirer = require('inquirer');

const { hgetAllAsync, redisClient } = require('./redis');

async function getTrucksType(index) {
    let data = await hgetAllAsync('user');
    let type = data && data[`type${index}`];

    if (!type) {
        const answer = await inquirer.prompt(
            {
                type: 'input',
                name: 'type',
                message: `De quel type de camion s'agit-il?`,
                when(answer) {
                    console.log(`Toujour pour le camion ${index + 1}`);
                    return answer;
                }
            }
        );

        if (answer.type === '' || !utils.validation.checkIfName(answer.type)) {
            return await getTrucksType(index);
        } else {
            type = answer.type;
            redisClient.hset('user', `type${index}`, type);
        }
    }

    return type;
}

exports.getTrucksType = getTrucksType;
