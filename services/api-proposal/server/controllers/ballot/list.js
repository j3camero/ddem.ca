const { queryDB, pageQuery } =  require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const ballot_list = async function(request, reply) {
	const { limit, last, sort, order } = reqData(request)
	const { query, query_args } = pageQuery(limit, last, sort, order, 'ballot', ['id AS ballot_id', 'proposal_id', 'is_approved', 'comments AS ballot_comments' ]) 
	const rows = await queryDB(this, query, query_args)
	request.log.info('Ballot/List: Success')
	return replySuccess(reply, rows)
}

module.exports = ballot_list
