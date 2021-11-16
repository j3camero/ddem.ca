const { queryDB } = require('@AluminumOxide/direct-democracy-tools-api-db')
const { reqData } = require('@AluminumOxide/direct-democracy-tools-api-request')
const { replySuccess, replyError } = require('@AluminumOxide/direct-democracy-tools-api-reply')

const proposal_read = async function(request, reply) {
	const { proposal_id } = reqData(request)
	const rows = await queryDB(this, 'SELECT id as proposal_id, democracy_id, name as proposal_name, description as proposal_description, target as proposal_target, changes as proposal_changes, date_created, date_updated FROM proposal WHERE id = $1 AND date_deleted IS NULL;', [proposal_id])
	if(!rows || rows.length < 1) {
		request.log.error('Proposal/Read: Failure('+proposal_id+')')
		return replyError(reply, 400)
        }
	let proposal = rows[0]
	const counts = await queryDB(this, 'SELECT is_approved, COUNT(*) as cnt FROM ballot WHERE proposal_id = $1 AND date_deleted IS NULL GROUP BY is_approved ORDER BY is_approved', [proposal_id])
	if(!counts || counts.length < 1) {
		proposal.proposal_votes = {'yes': 0, 'no': 0}
	} else {
		proposal.proposal_votes = {'yes': counts[0].cnt, 'no': counts.length > 1 ? counts[1].cnt : 0}
	}

	request.log.info('Proposal/Read: Success('+proposal_id+')')
	return replySuccess(reply, proposal)
}

module.exports = proposal_read
