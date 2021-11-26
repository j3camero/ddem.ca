const { queryDB } = require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess, replyError } = require('@j3camero/ddem-libs-api-reply')

const ballot_delete = async function(request, reply) {
	const { ballot_id, proposal_id } = reqData(request)
	const rows = await queryDB(this, 'DELETE FROM ballot WHERE id = $1 RETURNING id;', [ballot_id])
	request.log.info('Ballot/Delete: Success('+ballot_id+')')
	return replySuccess(reply, {}, 204)
}

module.exports = ballot_delete
