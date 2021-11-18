const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');

const utils = require('../utils')

const { hgetAllAsync, redisClient } = require('./redis');
const intro = chalk.blueBright(
    figlet.textSync("BIENVENUE CHEZ TRUSK ", { horizontalLayout: "full" })
);
console.log(intro);
async function getName() {
    let data = await hgetAllAsync('user');
    let name = data && data.name;

    if (!name) {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Quel est votre nom?'
            }
        ]);

        if (answer.name === '' || !utils.validation.checkIfName(answer.name)) {
            return await getName();
        } else {
            name = answer.name;
            redisClient.hset('user', 'name', name);
        }
    }

    return name;
}

exports.getName = getName;
