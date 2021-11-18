
const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();
const hgetAllAsync = promisify(redisClient.hgetall).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const smembersAsync = promisify(redisClient.smembers).bind(redisClient);
const lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
const lremAsync = promisify(redisClient.lrem).bind(redisClient);
// const rpopAsync = promisify(redisClient.rpop).bind(redisClient);

module.exports = {
    hgetAllAsync,
    smembersAsync,
    lrangeAsync,
    lremAsync,
    redisClient
};