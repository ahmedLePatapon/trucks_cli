const inquirer = require('inquirer');

const { hgetAllAsync, redisClient } = require('./redis');

async function getCompanyName() {
    let data = await hgetAllAsync('user');
    let companyName = data && data.companyName;
    if (!companyName) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'companyName',
            message: 'Quel est le nom de votre société?'
        });

        if (answer.companyName === '' || !utils.validation.checkIfName(answer.companyName)) {
            return await getCompanyName();
        } else {
            companyName = answer.companyName;
            redisClient.hset('user', 'companyName', companyName);
        }
    }
    return companyName;
}

exports.getCompanyName = getCompanyName;
