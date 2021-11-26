const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv').config()

class service {
	constructor(fastify) {
		this.fastify = fastify
		this.democracy_list = require('./democracy/list')
		this.democracy_read = require('./democracy/read')
		this.apply_proposal = require('./democracy/apply_proposal')
	}
}

fastify.register(require('fastify-postgres'), {
	connectionString: 'postgres://'+process.env.DB_DEMOCRACY_USER+':'+process.env.DB_DEMOCRACY_PASSWORD+'@'+process.env.DB_NAME+':'+process.env.DB_PORT+'/'+process.env.DB_DEMOCRACY_DB 
})

fastify.register(require('fastify-openapi-glue'), {
	specification: 'openapi.json',
	service: new service(fastify),
	prefix: "v1"
})

const start = async() => {
	try {
		await fastify.listen(process.env.API_DEMOCRACY_PORT, '0.0.0.0')
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()


