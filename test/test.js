const api_democracy_client = require('@AluminumOxide/direct-democracy-api-democracy-client')
const api_proposal_client = require('@AluminumOxide/direct-democracy-api-proposal-client')


const root_id = 'a062d797-8b6a-499c-9d8b-9a0cdf0871bf' // TODO
const dem_id = '51a9a676-3b1e-47eb-845b-2784ccdd1d59' // TODO

test('test_root_democracy_add_democracy', async () => {
	const proposal = await api_proposal_client.proposal_create({
		democracy_id: root_id,
		proposal_name: 'testy mctestface',
		proposal_description: 'test test test test',
		proposal_target: 'rules.democracies',
		proposal_changes: {"add": { "test":{"name": "foo","description": "bar","rules": {"a": "c","g": {"h": "i"}},"metas": {"metas": {"add": {"approval_percent_minimum": 80},"delete": {"approval_percent_minimum": 80},"update": {"approval_percent_minimum": 80}},"rules": {"add": {"approval_percent_minimum": 60},"delete": {"approval_percent_minimum": 60},"update": {"approval_percent_minimum": 60}}}}},"update": {},"delete": []}	})
	for(let i in [...Array(10)]) {
		let ballot = await api_proposal_client.ballot_create({
			democracy_id: root_id,
			proposal_id: proposal.proposal_id,
			is_approved: true,
			ballot_comments: 'test'
		})
	}
	const apply = await api_democracy_client.apply_proposal({
		democracy_id: root_id,
		proposal_id: proposal.proposal_id
	})
	await new Promise(resolve => setTimeout(resolve, 100)) // TODO why do i need this?
	const updated = await api_democracy_client.democracy_read({
		democracy_id: root_id
	})
	expect(updated.democracy_rules.democracies.test.name).toBe('foo');
})


test('test_democracy_modify', async () => {
	const proposal = await api_proposal_client.proposal_create({
		democracy_id: dem_id,
		proposal_name: 'testy mctestface',
		proposal_description: 'test test test test',
		proposal_target: 'rules',
		proposal_changes: {"add": {"j":"k"},"update": {"a":"z"},"delete": ["g"]}	})
	for(let i in [...Array(10)]) {
		let ballot = await api_proposal_client.ballot_create({
			democracy_id: dem_id,
			proposal_id: proposal.proposal_id,
			is_approved: true,
			ballot_comments: 'test'
		})
	}
	const apply = await api_democracy_client.apply_proposal({
		democracy_id: dem_id,
		proposal_id: proposal.proposal_id
	})
	const updated = await api_democracy_client.democracy_read({
		democracy_id: dem_id
	})
	expect(updated.democracy_rules.a).toBe('z');
	expect(updated.democracy_rules.j).toBe('k');
})
