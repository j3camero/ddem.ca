class ClientApi {
	constructor(spec) {
		const OASRequest = require('oas-request')(spec)
		this.request = new OASRequest({server: { url: spec.servers[0].url}})
		this.request.options.server = spec.servers[0].url // Why do I need this???
		for (const route in spec.paths){
			for (const op in spec.paths[route]) {
				const defn = spec.paths[route][op]
				const op_id = defn.operationId
				this[op_id] = async function(args) {
					let request = {params:{}, query:{}}
					if('parameters' in defn) {
						for(const i in defn.parameters) {
							const param = defn.parameters[i].name
							const loc = defn.parameters[i].in
							if(!!args && param in args) {
								if(loc == 'path') {
									request.params[param] = args[param]
								} else if(loc == 'query') {
									request.query[param] = args[param]
								}

							}
						}
					}
					if('requestBody' in defn) {
						request.body = {}
						request.headers = {'Content-Type':'application/json'}
						const props = defn.requestBody.content['application/json'].schema.properties
						for(const prop in props) {
							if(!!args && prop in args) {
								request.body[prop] = args[prop]
							}
						}
						request.body = JSON.stringify(request.body)
					}
					const response = await this.request[op_id](request)
					if(response.status >= 400) {
						throw new Error(response.statusText);
					}
					const data = await response.json()
					return data 
				}
			}
		}
	}
}
module.exports = ClientApi
