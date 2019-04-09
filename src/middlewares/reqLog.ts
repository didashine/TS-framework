import Koa from 'koa'
import logger from '../util/log'
export default function ReqLog() {
	return async (ctx: Koa.Context, next: Function) => {
		logger.info(`${ctx.method} ${ctx.url} ${ctx.request.querystring}`)
		await next();
	}
}
