const { queryDB, pageQuery } =  require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess } = require('@j3camero/ddem-libs-api-reply')

const proposal_list = async function(request, reply) {
	const { limit, last, sort, order, filter } = reqData(request)
	const { query, query_args } = pageQuery(limit, last, sort, order, 'proposal', ['id AS proposal_id', 'name AS proposal_name', 'description AS proposal_description', 'target AS proposal_target', 'changes AS proposal_changes', 'democracy_id'], filter) 
	const rows = await queryDB(this, query, query_args)
	request.log.info('Proposal/List: Success')
	return replySuccess(reply, rows)
}

module.exports = proposal_list
