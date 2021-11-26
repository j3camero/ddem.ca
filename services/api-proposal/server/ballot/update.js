const { queryDB } = require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess, replyError } = require('@j3camero/ddem-libs-api-reply')

const ballot_update = async function(request, reply) {
	const { ballot_id, proposal_id, is_approved, ballot_comments } = reqData(request)
	const rows = await queryDB(this, 'UPDATE ballot SET is_approved = $1, comments = $2 WHERE id = $3 AND proposal_id = $4 RETURNING id AS ballot_id, proposal_id, is_approved, comments AS ballot_comments, date_created, date_updated;', [is_approved, ballot_comments, ballot_id, proposal_id])
	if(!rows || rows.length < 1) {
		request.log.error('Ballot/Update: Failure('+ballot_id+')')
		return replyError(reply, 400)
	}
	request.log.info('Ballot/Update: Success('+ballot_id+')')
	return replySuccess(reply, rows[0])
}

module.exports = ballot_update
