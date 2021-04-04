[@divlook/pixel-art](../README.md) / PixelArt

# Class: PixelArt

## Table of contents

### Constructors

- [constructor](pixelart.md#constructor)

### Properties

- [#colorMap](pixelart.md##colormap)
- [#ctx](pixelart.md##ctx)
- [#drawCount](pixelart.md##drawcount)
- [#hooks](pixelart.md##hooks)
- [#imageData](pixelart.md##imagedata)
- [#img](pixelart.md##img)
- [#intervalMs](pixelart.md##intervalms)
- [#isInitialized](pixelart.md##isinitialized)
- [#lastAnimationTimeMs](pixelart.md##lastanimationtimems)
- [#que](pixelart.md##que)
- [#requestAnimationId](pixelart.md##requestanimationid)
- [#shadowCanvas](pixelart.md##shadowcanvas)
- [#shadowCtx](pixelart.md##shadowctx)
- [#unusedCoords](pixelart.md##unusedcoords)
- [alpha](pixelart.md#alpha)
- [canvas](pixelart.md#canvas)
- [imgUrl](pixelart.md#imgurl)
- [level](pixelart.md#level)
- [type](pixelart.md#type)

### Accessors

- [drawCount](pixelart.md#drawcount)
- [pointWidth](pixelart.md#pointwidth)
- [unusedCoordsCount](pixelart.md#unusedcoordscount)

### Methods

- [addHook](pixelart.md#addhook)
- [afterInitialize](pixelart.md#afterinitialize)
- [clear](pixelart.md#clear)
- [createColorMap](pixelart.md#createcolormap)
- [draw](pixelart.md#draw)
- [execHook](pixelart.md#exechook)
- [getRGB](pixelart.md#getrgb)
- [getRandomCoord](pixelart.md#getrandomcoord)
- [init](pixelart.md#init)
- [random](pixelart.md#random)
- [reset](pixelart.md#reset)
- [startAnimation](pixelart.md#startanimation)
- [stopAnimation](pixelart.md#stopanimation)

## Constructors

### constructor

\+ **new PixelArt**(`options`: [*PixelArtOptions*](../interfaces/pixelartoptions.md)): [*PixelArt*](pixelart.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PixelArtOptions*](../interfaces/pixelartoptions.md) |

**Returns:** [*PixelArt*](pixelart.md)

Defined in: [pixel-art.ts:99](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L99)

## Properties

### #colorMap

• `Private` **#colorMap**: [*RGBFormat*](../README.md#rgbformat)[][]

Defined in: [pixel-art.ts:62](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L62)

___

### #ctx

• `Private` **#ctx**: CanvasRenderingContext2D

Defined in: [pixel-art.ts:52](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L52)

___

### #drawCount

• `Private` **#drawCount**: *number*= 0

Defined in: [pixel-art.ts:60](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L60)

___

### #hooks

• `Private` **#hooks**: [*Hook*](../interfaces/hook.md)[]

Defined in: [pixel-art.ts:56](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L56)

___

### #imageData

• `Private` **#imageData**: ImageData

Defined in: [pixel-art.ts:57](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L57)

___

### #img

• `Private` **#img**: HTMLImageElement

Defined in: [pixel-art.ts:53](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L53)

___

### #intervalMs

• `Private` **#intervalMs**: *number*= 100

Defined in: [pixel-art.ts:63](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L63)

___

### #isInitialized

• `Private` **#isInitialized**: *boolean*= false

Defined in: [pixel-art.ts:54](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L54)

___

### #lastAnimationTimeMs

• `Private` **#lastAnimationTimeMs**: *number*= 0

Defined in: [pixel-art.ts:59](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L59)

___

### #que

• `Private` **#que**: [*VoidCallback*](../README.md#voidcallback)[]

Defined in: [pixel-art.ts:55](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L55)

___

### #requestAnimationId

• `Private` **#requestAnimationId**: *null* \| *number*= null

Defined in: [pixel-art.ts:58](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L58)

___

### #shadowCanvas

• `Private` **#shadowCanvas**: HTMLCanvasElement

Defined in: [pixel-art.ts:50](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L50)

___

### #shadowCtx

• `Private` **#shadowCtx**: CanvasRenderingContext2D

Defined in: [pixel-art.ts:51](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L51)

___

### #unusedCoords

• `Private` **#unusedCoords**: [*Coord*](../interfaces/coord.md)[]

Defined in: [pixel-art.ts:61](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L61)

___

### alpha

• **alpha**: *number*

Defined in: [pixel-art.ts:48](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L48)

___

### canvas

• **canvas**: HTMLCanvasElement

Defined in: [pixel-art.ts:44](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L44)

___

### imgUrl

• **imgUrl**: *string*

Defined in: [pixel-art.ts:45](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L45)

___

### level

• **level**: *number*

Defined in: [pixel-art.ts:47](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L47)

___

### type

• **type**: [*ArtType*](../README.md#arttype)

Defined in: [pixel-art.ts:46](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L46)

## Accessors

### drawCount

• get **drawCount**(): *number*

**Returns:** *number*

Defined in: [pixel-art.ts:65](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L65)

___

### pointWidth

• get **pointWidth**(): *number*

**Returns:** *number*

Defined in: [pixel-art.ts:69](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L69)

___

### unusedCoordsCount

• get **unusedCoordsCount**(): *number*

**Returns:** *number*

Defined in: [pixel-art.ts:97](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L97)

## Methods

### addHook

▸ **addHook**(`type`: [*HookType*](../README.md#hooktype), `callback`: [*VoidCallback*](../README.md#voidcallback)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | [*HookType*](../README.md#hooktype) |
`callback` | [*VoidCallback*](../README.md#voidcallback) |

**Returns:** *void*

Defined in: [pixel-art.ts:164](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L164)

___

### afterInitialize

▸ **afterInitialize**<T\>(`callback`: () => T \| *Promise*<T\>): *Promise*<T\>

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *void* |

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | () => T \| *Promise*<T\> |

**Returns:** *Promise*<T\>

Defined in: [pixel-art.ts:151](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L151)

___

### clear

▸ **clear**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:320](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L320)

___

### createColorMap

▸ **createColorMap**(): *Promise*<void\>

**`todo`** 성능 문제때문에 워커로 분리 필요

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:340](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L340)

___

### draw

▸ **draw**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:212](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L212)

___

### execHook

▸ **execHook**(`type`: [*HookType*](../README.md#hooktype)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | [*HookType*](../README.md#hooktype) |

**Returns:** *void*

Defined in: [pixel-art.ts:314](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L314)

___

### getRGB

▸ **getRGB**(`xCoord`: *number*, `yCoord`: *number*): *Promise*<[*RGBFormat*](../README.md#rgbformat)\>

#### Parameters:

Name | Type |
:------ | :------ |
`xCoord` | *number* |
`yCoord` | *number* |

**Returns:** *Promise*<[*RGBFormat*](../README.md#rgbformat)\>

Defined in: [pixel-art.ts:196](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L196)

___

### getRandomCoord

▸ **getRandomCoord**(): *Promise*<[*Coord*](../interfaces/coord.md)\>

**Returns:** *Promise*<[*Coord*](../interfaces/coord.md)\>

Defined in: [pixel-art.ts:176](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L176)

___

### init

▸ **init**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:111](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L111)

___

### random

▸ **random**(`min`: *number*, `max`: *number*, `isIncludingMaximum?`: *boolean*): *number*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`min` | *number* | - |
`max` | *number* | - |
`isIncludingMaximum` | *boolean* | false |

**Returns:** *number*

Defined in: [pixel-art.ts:168](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L168)

___

### reset

▸ **reset**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:329](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L329)

___

### startAnimation

▸ **startAnimation**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:269](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L269)

___

### stopAnimation

▸ **stopAnimation**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:302](https://github.com/divlook/pixel-art/blob/3e0c209/libs/pixel-art.ts#L302)
