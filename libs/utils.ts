import { ASSET_PREFIX } from '~/libs/env'

export const asset = (pathname: string) => {
    const prefix = ASSET_PREFIX.replace(/\/$/, '')
    pathname = pathname.replace(/^\//, '')
    return prefix + pathname
}
