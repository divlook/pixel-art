# README

## Demo

- https://divlook.github.io/pixel-art

## Usage

### Required

- [NodeJs (LTS)](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)

```bash
$ yarn install

$ yarn dev
> Run : http://localhost:3000
```

## PixelArt Interfaces

### PixelArtOptions

```ts
interface PixelArtOptions {
    canvas: HTMLCanvasElement
    imgUrl: string
    minSize?: number
    maxSize?: number
    intervalMs?: number
    initialDrawCount?: number
    shape?: Shape
    type?: ArtType
}
```

| name             | type                | required | default       | description |
|------------------|---------------------|----------|---------------|-------------|
| canvas           | HTMLCanvasElement   | true     |               |             |
| imgUrl           | string              | true     |               |             |
| minSize          | number              | false    | 10            |             |
| maxSize          | number              | false    | 20            |             |
| intervalMs       | number              | false    | 10            |             |
| initialDrawCount | number              | false    | 0             |             |
| shape            | [Shape](#shape)     | false    | 'square'      |             |
| type             | [ArtType](#arttype) | false    | 'pointillism' |             |

### Shape

```ts
type Shape =  'circle' | 'square'
```

### Coord

```ts
interface Coord {
    x: number
    y: number
}
```

| name | type   | required | default | description |
|------|--------|----------|---------|-------------|
| x    | number | true     | 0       |             |
| y    | number | true     | 0       |             |

### Hook

```ts
interface Hook {
    type: HookType
    callback: VoidCallback
}
```

| name     | type                          | required | default | description |
|----------|-------------------------------|----------|---------|-------------|
| type     | [HookType](#hooktype)         | true     |         |             |
| callback | [VoidCallback](#voidcallback) | true     |         |             |

### HookType

```ts
type HookType = 'initialize' | 'beforeDraw' | 'afterDraw'
```

### VoidCallback

```ts
type VoidCallback = () => void
```

### ArtType

```ts
type ArtType = 'pointillism'
```

## PixelArt Methods

### init

```ts
init(): Promise<void>
```

### addHook

```ts
afterInitialize(callback: VoidCallback): void
```

### addHook

```ts
addHook(type: HookType, callback: VoidCallback): void
```

### random

```ts
random(min: number, max: number, isIncludingMaximum?: boolean): number
```

### getRandomCoord

```ts
getRandomCoord(): Promise<Coord>
```

### getColor

```ts
getColor(xCoord: number, yCoord: number): Promise<RGBA>
```

### draw

```ts
draw(): Promise<void>
```

### startAnimation

```ts
startAnimation(): Promise<void>
```

### cancelAnimation

```ts
cancelAnimation(): Promise<void>
```

### execHook

```ts
execHook(type: HookType): void
```

### clear

```ts
clear(): Promise<void>
```

### reset

```ts
reset(): Promise<void>
```

## Reference

- https://material-ui.com
- https://material-ui.com/components/material-icons
