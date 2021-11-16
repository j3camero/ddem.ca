const fastify = require('fastify')({ logger: true })
const service = require('./controllers/index')
const dotenv = require('dotenv').config()

fastify.register(require('fastify-postgres'), {
	connectionString: 'postgres://'+process.env.DB_PROPOSAL_USER+':'+process.env.DB_PROPOSAL_PASSWORD+'@'+process.env.DB_NAME+':'+process.env.DB_PORT+'/'+process.env.DB_PROPOSAL_DB 
})

fastify.register(require('fastify-openapi-glue'), {
	specification: 'openapi.json',
	service: new service(fastify),
	prefix: "v1"
})

const start = async() => {
	try {
		await fastify.listen(process.env.API_PROPOSAL_PORT, '0.0.0.0')
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()


