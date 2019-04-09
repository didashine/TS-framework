import "reflect-metadata";
import config from './config'
import logger from './util/log'
import body from "koa-body";
import glob from 'glob';
import path from "path";
import koa_static from "koa-static";
import compose from 'koa-compose';
import fs from 'fs';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import mongoose from 'mongoose'
import ReqLog from './middlewares/reqLog'
import Redis from './service/redis'
import ErrorHandler from './middlewares/errorHandler'
const app = new Koa()
logger.info('Loading config:' + JSON.stringify(config))

// init middlewares
const middlewares = [
	ReqLog(),
	ErrorHandler(),
	body({
		multipart: true,
		// formidable: {
		// 	maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
		// }
	}),
	koa_static(__dirname + '/public') // static public
]
app.use(compose(middlewares));

// register router
glob.sync(__dirname + '/router/*.*{ts,js}').forEach(item => {
	const Router = require(item).default
	if (!Router) {
		throw new Error(item + " no default")
	}
	const router = new Router()
	app.use(router.routes()).use(router.allowedMethods())
});

// mongo
mongoose.connect(config.db.mongo, { useNewUrlParser: true })

// redis
Redis.init()

// listening
if (config.protocol === 'http') {
	http.createServer(app.callback()).listen(config.port)
} else if (config.protocol === 'https') {
	https.createServer({
		key: fs.readFileSync(config.tls.key),
		cert: fs.readFileSync(config.tls.cert)
	}, app.callback()).listen(config.port);
} else {
	throw new Error('config.protocol is null')
}
logger.info('protocol: ' + config.protocol + ' listening: ' + config.port)