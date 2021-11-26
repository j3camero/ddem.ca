const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv').config()

class service {
  constructor(fastify) {
    this.fastify = fastify
    this.proposal_list = require('./proposal/list')
    this.proposal_read = require('./proposal/read')
    this.proposal_create = require('./proposal/create')
    this.proposal_update = require('./proposal/update')
    this.proposal_delete = require('./proposal/delete')
    this.ballot_list = require('./ballot/list')
    this.ballot_read = require('./ballot/read')
    this.ballot_create = require('./ballot/create')
    this.ballot_update = require('./ballot/update')
    this.ballot_delete = require('./ballot/delete')
  }
}

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


