const { query } = require('./utils.js')

const update = async (table, values, conditions) => {
	const missing = []

	if(!table) missing.push('table')
	if(!conditions) missing.push('conditions')
	if(!values) missing.push('values')

	const error = (
		missing.length ? `ERROR: missing argument(s) ${missing.join(', ')}`
		: typeof conditions !== 'object' ? 'ERROR: second argument must be an object whose key:value pairs correspond to the col:values to remove'		
		: false
	)

	if(error) {
		console.log(error)
		return error
	}

	const colVals = Object.keys(values).map(col => {
		return `\`${col}\` = ${
			typeof values[col] === 'string'
			? `"${values[col]}"`
			: values[col]
		}`
	})

	const conditionCols = Object.keys(conditions)

	const sqlConditions = `${
		conditionCols.map(key => `\`${key}\`=${
			typeof conditions[key] === 'string' 
			? `"${conditions[key]}"`
			: conditions[key]
		}`).join(' AND ')
	}`

	const sql = `UPDATE \`${
		table
	}\` SET ${
		colVals
	} WHERE ${
		sqlConditions
	};`

	return await query(sql)
}

module.exports = update