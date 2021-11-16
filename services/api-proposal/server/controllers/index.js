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

module.exports = service
