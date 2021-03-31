const { ASSET_PREFIX } = require('./env.amd')

const asset = (pathname = '') => {
    const segments = []
    const prefix = ASSET_PREFIX
        // pipe
        .trim()
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .trim()

    pathname = pathname
        // pipe
        .trim()
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .trim()

    if (prefix) segments.push(prefix)
    if (pathname) segments.push(pathname)

    const resultPathname = `/${segments.join('/')}`

    return resultPathname
}

module.exports = {
    asset,
}
