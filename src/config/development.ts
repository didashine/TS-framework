
module.exports = {
	db: {
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: '123456',
			db: 0
		},
		mongo: 'mongodb://127.0.0.1:27017/dbs',
	},
	protocol: 'http', // https
	tls: {
		key: 'path',
		cert: 'path'
	},
	port: 3000,
}

// 导出对象里面有 config
// exports.config = {
// 	db: {
// 		redis: {
// 			host: '127.0.0.1',
// 			port: 6379,
// 			password: '',
// 			db: 0
// 		},
// 		mongo: '',
// 	},
// 	protocol: 'http', // https
// 	tls: {
// 		key: 'path',
// 		cert: 'path'
// 	},
// 	port: 9527,
// };



// nodejs 默认的
// module.exports.con = {}

// == module.exports  导出默认值
// export = "asdasd"



// type script 里面的 导出 {default:{} }
// export default {
// 	asdasd: 'asdasd'
// }

// typescript 里面的
// export class adasd { }