const mysql = require('mysql')

const connect = () => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'SecureMD',
		multipleStatements: true
	})

	connection.connect()

	return connection
}

const splitSqlStatements = sql => {
	return sql.split(';').reduce((statements,statement) => {
		statement = statement.trim()
		if(statement) {
			statements.push(`${statement};`)
		}
		return statements
	}, [])
}

const execQuery = (connection, sql) => new Promise(resolve => {
	connection.query(
		sql, 
		(err, res) => {
			if(err) {
				console.log('')
			}
			resolve([!err, err ? err : res])
		}
	)
})

const execQueries = async (connection, sql) => {
	const sqlStatements = (
		typeof sql === 'string' ? splitSqlStatements(sql)
		: sql && Array.isArray(sql) ? sql
		: []
	)

	const results = []
	let i = 0, successful = true

	while(i < sqlStatements.length) {
		let [success, res] = await execQuery(connection, sqlStatements[i])
		if(!success) {
			i = sqlStatements.length
			successful = false
		} else {
			results.push(res)
			i++
		}
	}

	return [successful, results]
}

const query = async (sql, sequential) => {
	const connection = connect()
	const results = await (
		sequential 
		? execQueries(connection, sql)
		: execQuery(connection, sql)
	)
	connection.end()

	return results
}

module.exports = {
	query
}