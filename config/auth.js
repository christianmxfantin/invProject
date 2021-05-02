const generator = require('generate-password')

let secret = generator.generate({
    length: 64,
    numbers: true,
    symbols: true,
    excludeSimilarCharacters: true
})

module.exports = {
    secret: process.env.AUTH_SECRET || secret,
    expires: process.env.AUTH_EXPIRES || '1d',
    rounds: process.env.AUTH_ROUNDS || 10
}