let regexName = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/

const checkIfName = (str) => regexName.test(str);

module.exports = {
    checkIfName
}