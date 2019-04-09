module.exports = {
	db: {
		redis: {
			host: '',
			port: 6379,
			password: '',
			db: 0
		},
		mongo: '',
	},
	protocol: 'http', // https
	tls: {
		key: 'path',
		cert: 'path'
	},
	port: 9527,
};
