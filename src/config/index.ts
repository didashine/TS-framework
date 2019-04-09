const env: string = process.env.NODE_ENV.trim()
const config = require('./' + env + '.ts')
export default config