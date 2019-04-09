import APP from '../model/app'
export default class app {
    public static async pageLimit() {
        const a = await APP.create({ uid: 'asdasd' })
        const doc = await APP.findById('asd');

        console.log(a)
    }
}