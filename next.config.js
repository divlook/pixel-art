const { asset } = require('./libs/utils.cjs')

const ASSET_PREFIX = asset()

module.exports = {
    env: {
        ASSET_PREFIX,
    },
    assetPrefix: ASSET_PREFIX,
}
