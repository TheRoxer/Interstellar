
require("dotenv").config();

const HypixelAPIReborn = require('hypixel-api-reborn');
const hypixel = new HypixelAPIReborn.Client(process.env.HYPIXEL_API, { cache: true });
const errors = HypixelAPIReborn.Errors

module.exports.hypixel = hypixel;
module.exports.errors = errors;