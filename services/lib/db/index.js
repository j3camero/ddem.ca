const queryDB = async function(that, query, args = []) {
	const client = await that.fastify.pg.connect()
	const { rows } = await client.query(query, args)
        client.release()
        return rows
}

const pageQuery = function(limit, last, sort, order, table, fields=[], filters={}) {
        let query = 'SELECT'
        let query_args = []
        let sort_field = sort ? sort : 'date_updated'
        let sort_dir = order === 'DESC' ? 'DESC' : 'ASC'
	for(let field of fields) {
		query += ' '+field+','
	}
        query += ' date_created, date_updated FROM '+table+' WHERE date_deleted IS NULL'
	for (const filter in filters) {
		query_args.push(filters[filter])
		query += ' AND '+filter+' = $'+query_args.length
	}
        if(last) {
                query += ' AND '+sort_field+(sort_dir === 'ASC' ? ' > ' : ' < ')+'$1'
                query_args.push(last)
        }
        query += ' ORDER BY '+sort_field+' '+sort_dir
        if(limit) {
                query += ' LIMIT '+limit
        }
	query += ';'
	return { query, query_args }
}


module.exports = { queryDB, pageQuery }
