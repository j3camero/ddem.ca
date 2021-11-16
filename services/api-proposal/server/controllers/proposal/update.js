const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')
const api_democracy_client = require('@AluminumOxide/direct-democracy-api-democracy-client')

const proposal_update = async function(request, reply) {
	const { proposal_id, proposal_name, proposal_description, proposal_target, proposal_changes, democracy_id } = reqData(request)

	// check the democracy_id is valid
	try {
	        const dem_check = await api_democracy_client.democracy_read({ democracy_id })
	} catch (e) {
	        request.log.info('Proposal/Update: Failure(invalid democracy'+democracy_id+' for '+proposal_id+')')
	        return replyError(reply, 400)
	}

	// check that no votes have been cast
	const vote_check = await queryDB(this, 'SELECT * FROM ballot WHERE proposal_id = $1;', [proposal_id])
	if(!!vote_check && vote_check.length > 0) {
		request.log.info('Proposal/Update: Failure(ballots already cast for '+proposal_id+')')
		return replyError(reply, 400)
	}

	// update proposal
	const rows = await queryDB(this, 'UPDATE proposal SET name = $1, description = $2, changes = $3, democracy_id = $4, target = $5 WHERE id = $6 RETURNING id AS proposal_id, democracy_id, name AS proposal_name, description AS proposal_description, target AS proposal_target, changes AS proposal_changes, date_created, date_updated;', [proposal_name, proposal_description, proposal_changes, democracy_id, proposal_target, proposal_id])
	if(!rows || rows.length < 1) {
		request.log.error('Proposal/Update: Failure('+proposal_id+')')
		return replyError(reply, 400)
	}
	request.log.info('Proposal/Update: Success('+proposal_id+')')
	return replySuccess(reply, rows[0])
}

module.exports = proposal_update
