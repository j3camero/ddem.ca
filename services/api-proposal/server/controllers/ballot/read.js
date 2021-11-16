const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const ballot_read = async function(request, reply) {
	const { ballot_id, proposal_id } = reqData(request)
	const rows = await queryDB(this, 'SELECT id as ballot_id, proposal_id, is_approved, comments AS ballot_comments, date_created, date_updated FROM ballot WHERE id = $1 AND proposal_id = $2 AND date_deleted IS NULL;', [ballot_id, proposal_id])
	if(!rows || rows.length < 1) {
		request.log.error('Ballot/Read: Failure('+ballot_id+')')
		return replyError(reply, 400)
        }
	request.log.info('Ballot/Read: Success('+ballot_id+')')
	return replySuccess(reply, rows[0])
}

module.exports = ballot_read
