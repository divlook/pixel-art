export interface CeremonyOptions {
    canvas: HTMLCanvasElement
    imgUrl: string
    minSize?: number
    maxSize?: number
    intervalMs?: number
    shape?: Shape
}

export interface InitializeCallback {
    (): void
}

export interface Coord {
    x: number
    y: number
}

export type Shape =  'circle' | 'square'

export type RGBA = [number, number, number, number]

export class Ceremony {
    canvas!: HTMLCanvasElement
    imgUrl!: string
    minSize!: number
    maxSize!: number
    intervalMs!: number
    shape!: Shape

    #shadowCanvas!: HTMLCanvasElement
    #shadowCtx!: CanvasRenderingContext2D
    #ctx!: CanvasRenderingContext2D
    #img!: HTMLImageElement
    #isInitialized = false
    #que: InitializeCallback[] = []
    #imageData!: ImageData
    #requestAnimationId: number | null = null
    #lastAnimationTimeMs = 0

    constructor(options: CeremonyOptions) {
        this.canvas = options.canvas
        this.imgUrl = options.imgUrl
        this.minSize = options.minSize ?? 10
        this.maxSize = options.maxSize ?? 20
        this.intervalMs = options.intervalMs ?? 10
        this.shape = options.shape ?? 'square'

        this.#shadowCanvas = document.createElement('canvas')
    }

    init() {
        const img = new Image()
        const onLoad = () => {
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
            this.#que.forEach(async (cb) => await cb())
        }

        return new Promise<void>((resolve) => {
            img.src = this.imgUrl
            img.onload = () => {
                onLoad()
                resolve()
            }
        })
    }

    afterInitialization(callback: InitializeCallback) {
        if (!this.#isInitialized) {
            this.#que.push(callback)
            return
        }

        callback()
    }

    random(min: number, max: number, isIncludingMaximum = false) {
        min = Math.ceil(min)
        max = Math.floor(max)
        const addition = isIncludingMaximum ? 1 : 0

        return Math.floor(Math.random() * (max - min + addition)) + min
    }

    getRandomCoord() {
        return new Promise<Coord>((resolve) => {
            this.afterInitialization(() => {
                const coord: Coord = {
                    x: this.random(0, this.canvas.width),
                    y: this.random(0, this.canvas.height),
                }

                resolve(coord)
            })
        })
    }

    getColor(xCoord: number, yCoord: number) {
        return new Promise<RGBA>((resolve) => {
            this.afterInitialization(() => {
                const image = this.#imageData.data
                const redIndex = yCoord * (this.canvas.width * 4) + xCoord * 4
                const greenIndex = redIndex + 1
                const blueIndex = redIndex + 2
                const alphaIndex = redIndex + 3
                const rgba: RGBA = [
                    image[redIndex],
                    image[greenIndex],
                    image[blueIndex],
                    image[alphaIndex],
                ]

                resolve(rgba)
            })
        })
    }

    draw() {
        return new Promise<void>((resolve) => {
            this.afterInitialization(async () => {
                const { x, y } = await this.getRandomCoord()
                const rgba = await this.getColor(x, y)
                const diameter = this.random(this.minSize, this.maxSize, true)
                const radius = Math.round(diameter / 2)

                this.#ctx.shadowBlur = 20
                this.#ctx.shadowColor = `rgba(${rgba.join(',')})`
                this.#ctx.fillStyle = `rgba(${rgba.slice(0, 3).join(',')}, 0.2)`
                this.#ctx.beginPath()
                if (this.shape === 'circle') {
                    this.#ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2)
                } else {
                    this.#ctx.rect(x - radius, y - radius, diameter, diameter)
                }
                this.#ctx.fill()

                resolve()
            })
        })
    }

    startAnimation() {
        return new Promise<void>((resolve) => {
            this.afterInitialization(() => {
                this.#requestAnimationId = requestAnimationFrame((time) => {
                    if (!this.#lastAnimationTimeMs) {
                        this.#lastAnimationTimeMs = time
                    }

                    if (time - this.#lastAnimationTimeMs >= this.intervalMs) {
                        this.#lastAnimationTimeMs = time
                        this.draw()
                    }

                    this.startAnimation()
                })
                resolve()
            })
        })
    }

    cancelAnimation() {
        return new Promise<void>((resolve) => {
            this.afterInitialization(() => {
                this.#lastAnimationTimeMs = 0

                if (this.#requestAnimationId === null) {
                    resolve()
                    return
                }

                cancelAnimationFrame(this.#requestAnimationId)
                resolve()
            })
        })
    }
}
