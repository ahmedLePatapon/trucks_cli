const inquirer = require('inquirer');

const { hgetAllAsync, lrangeAsync, redisClient } = require('./redis');

async function getEmployeName(index) {
    // let data = await lrangeAsync('employeNames', 0, -1);
    // let employeName = data[index];
    let data = await hgetAllAsync('user');
    let employeName = data && data[`employeName${index}`];

    if(!employeName) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'employeName',
            message: `Quel est le nom de votre employé ${index + 1}?`,
            when(answer) {
                if (data.length > 0) {
                    console.log(`Voici les employé déjà ajouter: ${[...data]}`);
                }
                return answer
            }
        });
        if (answer.employeName === '' || !utils.validation.checkIfName(answer.employeName)) {
            return await getEmployeName(index);
        } else {
            employeName = answer.employeName;
            redisClient.hset('user', `employeName${index}`, employeName);
        }
    }

    return employeName;
}

exports.getEmployeName = getEmployeName;
