const ApiClient = require('@j3camero/ddem-libs-api-client')
const spec = require('./openapi.json')
const api_client = new ApiClient(spec)
module.exports = api_client
