import "reflect-metadata";
import Router from 'koa-router'
import Koa from 'koa'
import Schema from 'validate'
import { ValidateError } from '../util/response'
// export function USE (url: string): MethodDecorator {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata(key, {
//             path: url,
//             method: 'use',
//             value: descriptor.value
//         }, target);
//     }
// }

// export function POST (url: string): MethodDecorator {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata(key, {
//             path: url,
//             method: 'post',
//             value: descriptor.value
//         }, target);
//     }
// }

// export function GET (url, validate): MethodDecorator {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         const originFunction: Function = descriptor.value;
//         descriptor.value = async function (ctx: Koa.Context) {
//             console.log(ctx.request.query)

//             //     const { error } = validate(ctx.request.query, schema, options);

//             await originFunction.apply(this, arguments);
//         }


//         Reflect.defineMetadata(key, {
//             path: url,
//             method: 'get',
//             value: descriptor.value
//         }, target);
//     }
// }

// export function DELETE (url): MethodDecorator {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata(key, {
//             path: url,
//             method: 'delete',
//             value: descriptor.value
//         }, target);
//     }
// }

// export function PUT (url): MethodDecorator {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata(key, {
//             path: url,
//             method: 'put',
//             value: descriptor.value
//         }, target);
//     }
// }
interface HttpParam {
    url: String,
    method: String,
    validate?: Object,
    typecast?: Boolean
}

export function Http (obj: HttpParam): MethodDecorator {

    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;

        descriptor.value = async function (ctx: Koa.Context) {
            ctx.request.data = Object.assign({}, ctx.request.query, ctx.request.body, ctx.request.files)
            // validate
            if (obj.validate) {
                obj.typecast = obj.typecast ? true : false // obj.typecast === true ? true : false
                const schema = new Schema(obj.validate, {typecast:obj.typecast})
                const result = schema.validate(ctx.request.data)
                if (result.length) {
                    throw new ValidateError(null, result[0].message)
                }
            }
            await originFunction.apply(this, arguments);
        }

        Reflect.defineMetadata(key, {  // below above code
            path: obj.url,
            method: obj.method,
            value: descriptor.value
        }, target);

    }
}

export function Controller (baseurl = '/'): ClassDecorator {

    return function (constructor: any) {
        const originalConstructor = constructor;
        function instanciate (constructor: any, ...args) {
            const instance = new constructor(...args);
            let router: Router = new Router({
                prefix: baseurl
            });
            Reflect.getMetadataKeys(instance).forEach((key) => {
                const config = Reflect.getMetadata(key, instance);
                router[config.method](config.path, config.value.bind(instance));
            })
            return router;
        }

        // the new constructor behaviour
        const newConstructor = function (...args: any[]) {
            return instanciate(originalConstructor, args);
        };

        // copy prototype so instanceof operator still works
        newConstructor.prototype = originalConstructor.prototype;

        // return new constructor (will override original)
        return newConstructor as any;
    }
}