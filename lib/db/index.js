const pageQuery = async function(limit=100, last, sort='date_updated', order='ASC', filter={}, knex, subquery) {

  let query = knex.select('*')
    .from(subquery.as('t1'))
    .limit(limit)
    .orderBy(sort, order)

  for (const field in filter) {
    query.andWhere(field, filter[field]['op'], filter[field]['val'])
  }

  if(last) {
    query.andWhere(sort, order === 'ASC' ? '>' : '<', last)
  }

  return await query
}

module.exports = { pageQuery }
