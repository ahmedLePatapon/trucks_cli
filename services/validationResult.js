
const inquirer = require('inquirer');
const { redisClient } = require('./redis');
const chalk = require('chalk');

exports.validationResult = async function(data, start) {
    console.log('Voici ce que vous nous avez dis:')
    console.log('Nom : ', data.name);
    console.log('Société : ', data.companyName);
    console.log('Employés : ', data.employeNames.join(', '));
    data.trucks.forEach((truck, i) => console.log(`camions ${i+1} de type ${truck.type} d'un volume de ${truck.volume} m3`, ))

    const answer = await inquirer.prompt(
        {
            type: 'confirm',
            name: 'confirmation',
            message: `Confirmez-vous ces informations ?`,
        }
    );

    if (answer.confirmation === true) {
        redisClient.flushall();
        console.log('Merci de votre inscription, vous serez contacté dans les plus bref delais.');
        process.exit(1);
    } else {
        redisClient.flushall();
        start();
    }
}
