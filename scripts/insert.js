const { query } = require('./utils.js')

const insert = async (table, values) => {
	const missing = []

	if(!table) missing.push('table')
	if(!values) missing.push('values')

	const error = (
		missing.length ? `ERROR: missing argument(s) ${missing.join(', ')}`
		: typeof values !== 'object' ? 'ERROR: second argument must be an object whose key:value pairs correspond to the col:values to insert'		
		: false
	)

	if(error) {
		console.log(error)
		return error
	}

	const cols = Object.keys(values).map(col => ('`' + col + '`'))
	const colValues = Object.values(values).map(val => {
		return (
			typeof val === 'string' 
			? `"${val}"`
			: val
		)
	})

	const sql = `INSERT INTO \`${
		table
	}\` (${
		cols.join(', ')
	}) VALUES (${
		colValues.join(', ')
	});`

	return await query(sql)
}

module.exports = insert