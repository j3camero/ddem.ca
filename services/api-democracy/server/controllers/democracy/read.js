const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const democracy_read = async function(request, reply) {
	const { democracy_id } = reqData(request)
	const rows = await queryDB(this, 'SELECT id as democracy_id, name as democracy_name, description as democracy_description, population as democracy_population, rules as democracy_rules, metas as democracy_metas, date_created, date_updated FROM democracy WHERE id = $1 AND date_deleted IS NULL;', [democracy_id])
	if(!rows || rows.length < 1) {
		request.log.error('Democracy/Read: Failure('+democracy_id+')')
		return replyError(reply, 400)
        }
	request.log.info('Democracy/Read: Success('+democracy_id+')')
	return replySuccess(reply, rows[0])
}

module.exports = democracy_read
