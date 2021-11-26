const { queryDB } = require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess, replyError } = require('@j3camero/ddem-libs-api-reply')

const proposal_delete = async function(request, reply) {
	const { proposal_id } = reqData(request)
	const rows = await queryDB(this, 'DELETE FROM proposal WHERE id = $1 RETURNING id;', [proposal_id])
	request.log.info('Proposal/Delete: Success('+proposal_id+')')
	return replySuccess(reply, {}, 204)
}

module.exports = proposal_delete
