const reqData = function(request) {
	const data = { ...request.params, ...request.body, ...request.query }
	return data
}

module.exports = { reqData }
