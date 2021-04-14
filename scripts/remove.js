const { query } = require('./utils.js')

const remove = async (table, conditions) => {
	const missing = []

	if(!table) missing.push('table')
	if(!conditions) missing.push('conditions')

	const error = (
		missing.length ? `ERROR: missing argument(s) ${missing.join(', ')}`
		: typeof conditions !== 'object' ? 'ERROR: second argument must be an object whose key:value pairs correspond to the col:values to remove'		
		: false
	)

	if(error) {
		console.log(error)
		return error
	}

	const conditionCols = Object.keys(conditions)

	const sqlConditions = (
		conditionCols.length 
		? ` WHERE ${
			conditionCols.map(key => `\`${key}\`=${
				typeof conditions[key] === 'string' 
				? `"${conditions[key]}"`
				: conditions[key]
			}`).join(' AND ')
		}`
		: ''
	)

	const sql = `DELETE FROM \`${table}\`${sqlConditions};`

	return await query(sql)
}

module.exports = remove