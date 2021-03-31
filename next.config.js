const { asset } = require('./libs/utils.amd')

const ASSET_PREFIX = asset()

module.exports = {
    env: {
        ASSET_PREFIX,
    },
    assetPrefix: ASSET_PREFIX,
}
