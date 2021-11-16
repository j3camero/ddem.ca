const ApiClient = require('@AluminumOxide/direct-democracy-tools-api-client')
const spec = require('./openapi.json')
const api_client = new ApiClient(spec)
module.exports = api_client
