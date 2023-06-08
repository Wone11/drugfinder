const crypto    =  require('crypto')

const accessToken  = crypto.randomBytes(32).toString('hex')
const refreshToken = crypto.randomBytes(32).toString('hex')

console.log("access Token : " + accessToken ,`\n` + "refresh Token :" + refreshToken);

module.exports.exports = {accessToken,refreshToken}