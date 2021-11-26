const { queryDB } =  require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess, replyError } = require('@j3camero/ddem-libs-api-reply')
const api_democracy_client = require('@j3camero/ddem-api-democracy-client')

const proposal_create = async function(request, reply) {
	const { proposal_name, proposal_description, proposal_target, proposal_changes, democracy_id } = reqData(request)

	// check the democracy_id is valid
	try {
		const dem_check = await api_democracy_client.democracy_read({ democracy_id })
	} catch (e) {
		request.log.info('Proposal/Create: Failure(invalid democracy'+democracy_id+')')
		return replyError(reply, 400)
	}

	// save the proposal
	const rows = await queryDB(this, 'INSERT INTO proposal(democracy_id, name, description, target, changes) VALUES ($1, $2, $3, $4, $5) RETURNING id AS proposal_id, democracy_id, name AS proposal_name, description AS proposal_description, target AS proposal_target, changes AS proposal_changes, date_created, date_updated;', [democracy_id, proposal_name, proposal_description, proposal_target, proposal_changes])
	if(!rows || rows.length < 1) {
		request.log.error('Proposal/Create: Failure')
		return replyError(reply, 400)
  }
	request.log.info('Proposal/Create: Success('+rows[0].proposal_id+')')
	return replySuccess(reply, rows[0], 201)
}

module.exports = proposal_create
