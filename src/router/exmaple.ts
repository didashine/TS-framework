import Koa from "koa";
import { Controller, Http } from '../decorator/http'
import Redis from '../service/redis'
import { ResSuccess, ResError } from '../util/response'
import appService from '../service/Service'
@Controller("/a")
export default class ExampleRouter {

	@Http({
		url: "/b",
		method: "post",
		validate: {
			name: {
				type: String,
				required: true
			}

		}
	})
	async facewarp (ctx: Koa.Context) {
		// console.log(1111, ctx.request.query)
		// appService.pageLimit()
		Redis.getInstance().set('name', 'cd')
		ctx.body = "asdasd"
	}
}
