// import { Schema, model, Model, Document } from 'mongoose';
// import { Apps } from '../dataType/models';

// interface AppModel extends Apps, Document { };

// let Bundles: Schema = new Schema({
//     name: { type: String },
//     itemID: { type: String },
//     type: { type: String }
// }, {
//         timestamps: true
//     })

// let App: Schema = new Schema({
//     uid: { type: String, index: true }, //用户唯一标识
//     key: { type: String, index: true }, //用户Key
//     bundles: [Bundles],
//     name: { type: String },
//     secret: { type: String },
//     type: { type: String },
//     platform: { type: Array },
//     describe: { type: String },
//     env: { type: Boolean },
//     times: { type: Number },
//     enable: { type: Boolean },
//     delete: { type: Boolean }, //是否被删除
//     expire: { type: Date }, //过期时间戳
// }, {
//         timestamps: true
//     });

// let AppModel: Model<AppModel> = model<AppModel>('apps', App, 'apps');
// export { AppModel }

// import { Schema, model } from 'mongoose';

// let _schema: Schema = new Schema(
//     {
//         uid: {
//             type: String,
//             index: true
//         },
//     },
//     {
//         timestamps: true
//     }
// )
// let AppModel = model('App', _schema, 'apps')

// export default AppModel


import { prop, Typegoose, ModelType, InstanceType, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';



class User extends Typegoose {
    @prop()
    name?: string;

    @arrayProp({ items: String })
    age?: Number

}

const UserModel = new User().getModelForClass(User);

export default UserModel