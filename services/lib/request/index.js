const reqData = function(request) {
	const data = { ...request.params, ...request.body, ...request.query }
	for(const param in data) {
		if(param.indexOf('[') > 0) {
			let objname, paramname, splits
			splits = param.split('[')
			objname = splits[0]
			splits = splits[1].split(']')
			paramname = splits[0]
			if(!(objname in data)) {
				data[objname] = {}
			}
			data[objname][paramname]  = data[param]
			delete data[param]
		}
	}
	return data
}

module.exports = { reqData }
