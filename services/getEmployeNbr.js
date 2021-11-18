const inquirer = require('inquirer');

const { hgetAllAsync, redisClient } = require('./redis');

async function getEmployeNbr() {
    let data = await hgetAllAsync('user');
    let employesNumber = data && data.employesNumber;

    if (!employesNumber) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'employesNumber',
            value: 'number',
            message: 'Combien d\'employés avez-vous?'
        });

        if (answer.employesNumber === '' || isNaN(answer.employesNumber)) {
            return await getEmployeNbr();
        } else {
            employesNumber = answer.employesNumber * 1;
            redisClient.hset('user', 'employesNumber', employesNumber);
        }
    }

    return employesNumber;
}

exports.getEmployeNbr = getEmployeNbr;
