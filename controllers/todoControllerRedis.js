const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const redis = require('redis');

const _createClient = () => {
    const client = redis.createClient('6379', 'localhost');
    //记录redis错误
    client.on("error", function (err) {
        console.log("redis链接失败 " + err);
    });
    return client;
};
const redisClient = _createClient();

function setItem(key, value, exprires) {
    redisClient.set(key, value);
    //设置过期 单位：秒
    if (exprires) {
        redisClient.expire(key, exprires);
    }
}
async function getItem(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err)
            }
            resolve(val);
        })
    })
}

module.exports = {
    redisClient,
    setItem,
    getItem
};