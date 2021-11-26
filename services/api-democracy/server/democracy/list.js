const { queryDB, pageQuery } =  require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess } = require('@j3camero/ddem-libs-api-reply')

const democracy_list = async function(request, reply) {
	const { limit, last, sort, order } = reqData(request)
	const { query, query_args } = pageQuery(limit, last, sort, order, 'democracy', ['id AS democracy_id', 'name AS democracy_name', 'description AS democracy_description', 'population AS democracy_population']) 
	const rows = await queryDB(this, query, query_args)
	request.log.info('Democracy/List: Success')
	return replySuccess(reply, rows)
}

module.exports = democracy_list