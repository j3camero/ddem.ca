const { queryDB, pageQuery } =  require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess } = require('@j3camero/ddem-libs-api-reply')

const ballot_list = async function(request, reply) {
	const { limit, last, sort, order } = reqData(request)
	const { query, query_args } = pageQuery(limit, last, sort, order, 'ballot', ['id AS ballot_id', 'proposal_id', 'is_approved', 'comments AS ballot_comments' ]) 
	const rows = await queryDB(this, query, query_args)
	request.log.info('Ballot/List: Success')
	return replySuccess(reply, rows)
}

module.exports = ballot_list
