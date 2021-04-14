const { readFile } = require('fs').promises
const { query } = require('./utils.js')

const init = async () => {
	const createTablesSql = await readFile('../sql/create_tables.sql', 'utf-8')
	const [createSuccess, createResults] = await query(createTablesSql)

	if(!createSuccess) {
		console.log('Table create failed! Error: ', createResults)
		return
	}

	console.log('Tables created!')

	const connectTablesSql = await readFile('../sql/connect_tables.sql', 'utf-8')
	const [connectSucces, connectResults] = await query(connectTablesSql, true)

	if(!connectSucces) {
		console.log('Table connect failed! :( Error: ', connectResults)
		return
	}

	console.log('Tables connected! :) Database ready for use.')
	return
}

init()
