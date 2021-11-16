class service {
	constructor(fastify) {
		this.fastify = fastify
		this.democracy_list = require('./democracy/list')
		this.democracy_read = require('./democracy/read')
		this.apply_proposal = require('./democracy/apply_proposal')
	}
}

module.exports = service
