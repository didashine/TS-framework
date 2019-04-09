import Koa from 'koa'
import { ValidateError, ResError } from '../util/response'
import logger from '../util/log'
export default function errorHandler() {
	return async (ctx: Koa.Context, next: Function) => {
		try {
			await next()
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error)
				ctx.body = new ResError()
			} else {
				ctx.body = error
			}
		}
	};
};
