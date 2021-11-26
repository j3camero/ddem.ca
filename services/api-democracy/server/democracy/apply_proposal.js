const { queryDB, pageQuery } =  require('@j3camero/ddem-libs-api-db')
const { reqData } = require('@j3camero/ddem-libs-api-request')
const { replySuccess, replyError } = require('@j3camero/ddem-libs-api-reply')
const api_proposal_client = require('@j3camero/ddem-api-proposal-client')

const get_proposal_target = function(target, democracy, op) {
	let rules = democracy.metas
	for (let branch of target.split('.')) {
		if(branch in rules) {
			rules = rules[branch]
		} else {
			break
		}
	}	
	if(op in rules) {
		return rules[op]
	} else {
		return {}
	}
}

const democracy_create = async function(that, { name, description, rules, metas }) {
  const rows = await queryDB(that, 'INSERT INTO democracy(name, description, rules, metas) VALUES ($1, $2, $3, $4) RETURNING id AS democracy_id, name AS democracy_name, description as democracy_description, population as democracy_population, rules as democracy_rules, metas as democracy_metas, date_created, date_updated;', [name, description, rules, metas])
  if(!rows || rows.length < 1) {
                return
        }
  return
}

const democracy_update = async function(that, { democracy_id, democracy_name, democracy_description, democracy_population, democracy_rules, democracy_metas }) {
  const rows = await queryDB(that, 'UPDATE democracy SET name = $1, description = $2, rules = $3, metas = $4, population = $5 WHERE id = $6 RETURNING id AS democracy_id, name AS democracy_name, description AS democracy_description, population as democracy_population, rules AS democracy_rules, metas as democracy_metas, date_created, date_updated;', [democracy_name, democracy_description, democracy_rules, democracy_metas, democracy_population, democracy_id])
  if(!rows || rows.length < 1) {
    return
  }
  return
}

const democracy_delete = async function(that, democracy_id) {
  const rows = await queryDB(that, 'DELETE FROM democracy WHERE id = $1 RETURNING id;', [democracy_id])
	return
}

const apply_proposal = async function(request, reply) {
	const { democracy_id, proposal_id } = reqData(request)

	// get democracy, root democracy and proposal
	let rows = await queryDB(this, 'SELECT * FROM democracy WHERE id = $1', [democracy_id])
	let democracy = rows[0]
	let root_democracy = democracy
	if(!!democracy.parent_id) {
		rows = await queryDB(this, 'SELECT * FROM democracy WHERE id = $1', [democracy.parent_id])
		root_democracy = rows[0]
	}
	const proposal = await api_proposal_client.proposal_read({proposal_id})
		
	// get proposal votes stats
	const approved_votes = proposal.proposal_votes['yes']
	const disapproved_votes = proposal.proposal_votes['no']
	const democracy_population = democracy.population
	const date_last = proposal.date_updated ? proposal.date_updated : proposal.date_created	

	// check if proposal passes	
	for (let op of ['add','update','delete']) {
		if(proposal.proposal_changes[op]) {
			for (let [rule, value] of Object.entries(get_proposal_target(proposal.proposal_target, democracy, op))) {
				if(!(eval(root_democracy.rules.rules[rule]))) {
					return replyError(reply, 400)
				}
			}
		}
	}

	// apply proposal
	let democracy_path = (proposal.proposal_target.split('.').reduce((a,b) => a[b], democracy))
	if(proposal.proposal_changes['delete']) {
		for (let rule of proposal.proposal_changes['delete']) {
			delete democracy_path[rule]
			if(democracy.id == root_democracy.id && proposal.proposal_target == 'rules.democracies') {
				democracy_delete(this, rule)
			}
		}	
	}
	if(proposal.proposal_changes['add']) {
		for(let rule in proposal.proposal_changes['add']) {
			democracy_path[rule] = proposal.proposal_changes['add'][rule]
			if(democracy.id == root_democracy.id && proposal.proposal_target == 'rules.democracies') {
				democracy_create(this, proposal.proposal_changes['add'][rule])
			}
		}
	}
	if(proposal.proposal_changes['update']) {
		for(let rule in proposal.proposal_changes['update']) {
			democracy_path[rule] = proposal.proposal_changes['update'][rule]
			if(democracy.id == root_democracy.id && proposal.proposal_target == 'rules.democracies') {
				democracy_update(this, proposal.proposal_changes['update'][rule])
			}
		}
	}

	// save updates
	const updates = queryDB(this, 'UPDATE democracy SET rules = $1, metas = $2 WHERE id = $3', [democracy.rules, democracy.metas, democracy.id])	
	if(!updates || updates.length < 1) {
		request.log.error('Democracy/Apply: Failure')
		return replyError(reply, 400)
	}

	request.log.info('Democracy/Apply: Success('+democracy.id+')')
	return replySuccess(reply, {})
}

module.exports = apply_proposal
