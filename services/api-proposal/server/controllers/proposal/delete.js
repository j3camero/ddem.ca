const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const proposal_delete = async function(request, reply) {
	const { proposal_id } = reqData(request)

	const check = await queryDB(this, 'SELECT date_deleted FROM proposal WHERE id = $1;', [proposal_id])
	if(!check || check.length < 1 || !!check[0].date_deleted) {
		request.log.error('Proposal/Delete: Failure('+proposal_id+')')
		return replyError(reply, 400)
	}

	const rows = await queryDB(this, 'DELETE FROM proposal WHERE id = $1 RETURNING id;', [proposal_id])
	request.log.info('Proposal/Delete: Success('+proposal_id+')')
	return replySuccess(reply, {}, 204)
}

module.exports = proposal_delete
