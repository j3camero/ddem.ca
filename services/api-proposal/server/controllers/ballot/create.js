const { queryDB } =  require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const ballot_create = async function(request, reply) {
	const { proposal_id, is_approved, ballot_comments } = reqData(request)
	const rows = await queryDB(this, 'INSERT INTO ballot(proposal_id, is_approved, comments) VALUES ($1, $2, $3) RETURNING id AS ballot_id, proposal_id, is_approved, comments AS ballot_comments, date_created, date_updated;', [proposal_id, is_approved, ballot_comments])
	if(!rows || rows.length < 1) {
		request.log.error('Ballot/Create: Failure')
                return replyError(reply, 400)
        }
	request.log.info('Ballot/Create: Success('+rows[0].ballot_id+')')
	return replySuccess(reply, rows[0], 201)
}

module.exports = ballot_create
