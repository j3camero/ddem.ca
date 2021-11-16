const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const ballot_delete = async function(request, reply) {
	const { ballot_id, proposal_id } = reqData(request)

	const check = await queryDB(this, 'SELECT date_deleted FROM ballot WHERE id = $1 AND proposal_id = $2;', [ballot_id, proposal_id])
	if(!check || check.length < 1 || !!check[0].date_deleted) {
		request.log.error('Ballot/Delete: Failure('+ballot_id+')')
		return replyError(reply, 400)
	}

	const rows = await queryDB(this, 'DELETE FROM ballot WHERE id = $1 RETURNING id;', [ballot_id])
	request.log.info('Ballot/Delete: Success('+ballot_id+')')
	return replySuccess(reply, {}, 204)
}

module.exports = ballot_delete
