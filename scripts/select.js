const { query } = require('./utils.js')

const select = async (table, conditions) => {
	let error
	if(!table || typeof table !== 'string') {
		error = 'Table name required passed in as a string on the first argument'
	}
	if(conditions && typeof conditions !== 'object') {
		error = 'Conditions must be an object with key-value pairs reprseting the column:value parameters'
	}
	if(error) {
		console.log(error)
		return error
	}

	const conditionCols = Object.keys(conditions)

	const sqlConditions = (
		conditionCols.length 
		? ` WHERE ${
			conditionCols.map((key, i) => `${key}="${conditions[key]}"`).join(' AND ')
		}`
		: ''
	)

	const sql = `SELECT * FROM \`${table}\`${sqlConditions};`

	return await query(sql)
}

module.exports = select