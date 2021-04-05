export interface PixelArtOptions {
    canvas: HTMLCanvasElement
    imgUrl: string
    /**
     * @default 'mosaic'
     */
    type?: ArtType
    /**
     * level이 높을수록 point 크기가 커집니다.
     * 1 ~ 5까지 입력할 수 있습니다.
     *
     * @default 2
     */
    level?: number
    /**
     * point 투명도
     *
     * - 범위 : 0 ~ 1
     *
     * @default 0.2
     */
    alpha?: number
}

export type VoidCallback = () => void

export interface Coord {
    x: number
    y: number
}

export type RGBFormat = [number, number, number]

export interface Hook {
    type: HookType
    callback: VoidCallback
}

export type HookType = 'initialize' | 'beforeDraw' | 'afterDraw'

export type ArtType = 'mosaic' | 'pointillism'

export class PixelArt {
    canvas!: HTMLCanvasElement
    imgUrl!: string
    type!: ArtType
    level!: number
    alpha!: number

    #shadowCanvas!: HTMLCanvasElement
    #shadowCtx!: CanvasRenderingContext2D
    #ctx!: CanvasRenderingContext2D
    #img!: HTMLImageElement
    #isInitialized = false
    #que: VoidCallback[] = []
    #hooks: Hook[] = []
    #imageData!: ImageData
    #animationQue: number[] = []
    #lastAnimationTimeMs = 0
    #drawCount = 0
    #unusedCoords: Coord[] = []
    #colorMap: RGBFormat[][] = []
    #intervalMs = 100

    get drawCount() {
        return this.#drawCount
    }

    get pointWidth() {
        let pointWidth = this.canvas.width

        switch (this.level) {
            case 1:
                pointWidth *= 1 / 300
                break

            case 2:
                pointWidth *= 1 / 120
                break

            case 4:
                pointWidth *= 1 / 40
                break

            case 5:
                pointWidth *= 1 / 30
                break

            default:
                pointWidth *= 1 / 60
                break
        }

        return Math.ceil(pointWidth)
    }

    get unusedCoordsCount() {
        return this.#unusedCoords.length
    }

    constructor(options: PixelArtOptions) {
        this.canvas = options.canvas
        this.imgUrl = options.imgUrl
        this.type = options.type ?? 'mosaic'
        this.level = Math.min(Math.max(1, options.level ?? 2), 5)
        this.alpha = options.alpha ?? 0.2

        this.#shadowCanvas = document.createElement('canvas')
    }

    init() {
        const img = new Image()
        const onLoad = async (resolve: VoidCallback) => {
            const ratio = img.naturalHeight / img.naturalWidth

            const width = this.canvas.clientWidth
            const height = this.canvas.clientWidth * ratio
            this.canvas.width = width
            this.canvas.height = height
            this.#shadowCanvas.width = width
            this.#shadowCanvas.height = height

            const ctx = this.canvas.getContext('2d')
            const shadowCtx = this.#shadowCanvas.getContext('2d')
            if (!ctx || !shadowCtx) return

            this.#ctx = ctx
            this.#shadowCtx = shadowCtx
            this.#isInitialized = true
            this.#img = img
            this.#shadowCtx.drawImage(this.#img, 0, 0, width, height)
            this.#imageData = this.#shadowCtx.getImageData(0, 0, width, height)

            await this.createColorMap()

            this.execHook('initialize')

            while (this.#que.length > 0) {
                await this.#que.shift()?.()
            }

            resolve()
        }

        return new Promise<void>((resolve) => {
            img.src = this.imgUrl
            img.onload = () => onLoad(resolve)
        })
    }

    afterInitialize<T = void>(callback: () => T | Promise<T>) {
        return new Promise<T>(async (resolve) => {
            if (!this.#isInitialized) {
                this.#que.push(async () => {
                    resolve(await callback())
                })
                return
            }

            resolve(await callback())
        })
    }

    addHook(type: HookType, callback: VoidCallback) {
        this.#hooks.push({ type, callback })
    }

    random(min: number, max: number, isIncludingMaximum = false) {
        min = Math.ceil(min)
        max = Math.floor(max)
        const addition = isIncludingMaximum ? 1 : 0

        return Math.floor(Math.random() * (max - min + addition)) + min
    }

    getRandomCoord() {
        return this.afterInitialize<Coord>(() => {
            if (this.unusedCoordsCount) {
                const index = this.random(0, this.unusedCoordsCount)

                return this.#unusedCoords.splice(index, 1)[0]
            }

            const cols = Math.ceil(this.canvas.width / this.pointWidth)
            const rows = Math.ceil(this.canvas.height / this.pointWidth)

            const coord: Coord = {
                x: this.random(0, cols) * this.pointWidth,
                y: this.random(0, rows) * this.pointWidth,
            }

            return coord
        })
    }

    getRGB(xCoord: number, yCoord: number) {
        return this.afterInitialize<RGBFormat>(() => {
            const image = this.#imageData.data
            const redIndex = yCoord * (this.#imageData.width * 4) + xCoord * 4
            const greenIndex = redIndex + 1
            const blueIndex = redIndex + 2
            const rgb: RGBFormat = [
                image[redIndex],
                image[greenIndex],
                image[blueIndex],
            ]

            return rgb
        })
    }

    draw() {
        return this.afterInitialize(async () => {
            this.execHook('beforeDraw')
            const random = this.random.bind(this)

            let width = this.pointWidth

            switch (this.type) {
                case 'pointillism': {
                    width = random(width, width * 1.5, true)
                    break
                }
                case 'mosaic': {
                    width = this.pointWidth
                    break
                }
            }

            let { x, y } = await this.getRandomCoord()
            const rgb = await this.getRGB(x, y)
            const radius = Math.round(width / 2)
            const shadowColor = `rgb(${rgb.join(',')})`
            const fillStyle = `rgba(${rgb.join(',')}, ${this.alpha})`

            switch (this.type) {
                case 'pointillism': {

                    const correctionValue = width / 1.5

                    x = random(Math.abs(x - correctionValue), x + correctionValue, true)
                    y = random(Math.abs(y - correctionValue), y + correctionValue, true)

                    this.#ctx.shadowBlur = 20
                    this.#ctx.shadowColor = shadowColor
                    this.#ctx.fillStyle = fillStyle
                    this.#ctx.beginPath()
                    this.#ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
                    this.#ctx.fill()
                    break
                }
                case 'mosaic': {
                    this.#ctx.shadowBlur = 0
                    this.#ctx.shadowColor = ''
                    this.#ctx.fillStyle = fillStyle
                    this.#ctx.beginPath()
                    this.#ctx.rect(x, y, width, width)
                    this.#ctx.fill()
                    break
                }
            }

            this.#drawCount++

            this.execHook('afterDraw')
        })
    }

    startAnimation() {
        return this.afterInitialize(() => {
            const requestAnimationId = requestAnimationFrame((time) => {
                this.#animationQue.shift()

                if (!this.#lastAnimationTimeMs) {
                    this.#lastAnimationTimeMs = time
                }

                if (time - this.#lastAnimationTimeMs >= this.#intervalMs) {
                    this.#lastAnimationTimeMs = time

                    /**
                     * TODO: duration에 따라 계산해야됨
                     * TODO: 성능 테스트 필요
                     */
                    for (let i = 0; i < 100; i++) {
                        this.draw()
                    }
                }

                switch (this.type) {
                    case 'mosaic': {
                        if (this.unusedCoordsCount === 0) {
                            return
                        }
                        break
                    }
                }

                this.startAnimation()
            })

            this.#animationQue.push(requestAnimationId)
        })
    }

    stopAnimation() {
        return this.afterInitialize(() => {
            while (true) {
                if (this.#animationQue.length === 0) {
                    break
                }

                const animationId = this.#animationQue.shift() ?? null

                if (animationId !== null) {
                    cancelAnimationFrame(animationId)
                }
            }

            this.#lastAnimationTimeMs = 0
        })
    }

    execHook(type: HookType) {
        this.#hooks
            .filter((hook) => hook.type === type)
            .forEach(async (hook) => await hook.callback())
    }

    clear() {
        return this.afterInitialize(async () => {
            this.#ctx.fillStyle = `white`
            this.#ctx.beginPath()
            this.#ctx.rect(0, 0, this.canvas.width, this.canvas.height)
            this.#ctx.fill()
        })
    }

    reset() {
        return this.afterInitialize(async () => {
            await this.stopAnimation()
            await this.clear()
            await this.init()
        })
    }

    /**
     * @todo 성능 문제때문에 워커로 분리 필요
     */
    createColorMap() {
        return this.afterInitialize(async () => {
            const cols = Math.ceil(this.canvas.width / this.pointWidth)
            const rows = Math.ceil(this.canvas.height / this.pointWidth)
            const que: Promise<void>[] = []
            const multiple = Math.ceil(1 / this.alpha) * 10

            this.#unusedCoords = []
            this.#colorMap = Array(rows)
                .fill(null)
                .map((_, row) => {
                    return Array(cols)
                        .fill(null)
                        .map((_, col) => {
                            const x = col * this.pointWidth
                            const y = row * this.pointWidth

                            for (let i = 0; i < multiple; i++) {
                                this.#unusedCoords.push({ x, y })
                            }

                            que.push(
                                this.getRGB(col, row).then((rgb) => {
                                    this.#colorMap[row][col] = rgb
                                })
                            )

                            return [0, 0, 0]
                        })
                })

            await Promise.all(que)
        })
    }
}
