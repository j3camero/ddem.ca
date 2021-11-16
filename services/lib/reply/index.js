const replySuccess = async function(reply, data, code = 200) {
	return reply.code(code).send(data)
}

const replyError = async function(reply, code = 500) {
	if(code == 400) {
		return reply.code(400).send('Invalid Request')
	} else if(code == 401) {
		return reply.code(401).send('Unauthorized')
	} else {
		return reply.code(500).send('Internal Error')
	}
}

module.exports = { replySuccess, replyError }
