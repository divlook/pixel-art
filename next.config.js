const ASSET_PREFIX = process.env.ASSET_PREFIX || '/'

module.exports = {
    env: {
        ASSET_PREFIX,
    },
    assetPrefix: ASSET_PREFIX,
}
