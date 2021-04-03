[@divlook/pixel-art](../README.md) / PixelArt

# Class: PixelArt

## Table of contents

### Constructors

- [constructor](pixelart.md#constructor)

### Properties

- [#ctx](pixelart.md##ctx)
- [#drawCount](pixelart.md##drawcount)
- [#hooks](pixelart.md##hooks)
- [#imageData](pixelart.md##imagedata)
- [#img](pixelart.md##img)
- [#isInitialized](pixelart.md##isinitialized)
- [#lastAnimationTimeMs](pixelart.md##lastanimationtimems)
- [#que](pixelart.md##que)
- [#requestAnimationId](pixelart.md##requestanimationid)
- [#shadowCanvas](pixelart.md##shadowcanvas)
- [#shadowCtx](pixelart.md##shadowctx)
- [canvas](pixelart.md#canvas)
- [imgUrl](pixelart.md#imgurl)
- [initialDrawCount](pixelart.md#initialdrawcount)
- [intervalMs](pixelart.md#intervalms)
- [maxSize](pixelart.md#maxsize)
- [minSize](pixelart.md#minsize)
- [shape](pixelart.md#shape)
- [type](pixelart.md#type)

### Accessors

- [drawCount](pixelart.md#drawcount)

### Methods

- [addHook](pixelart.md#addhook)
- [afterInitialize](pixelart.md#afterinitialize)
- [cancelAnimation](pixelart.md#cancelanimation)
- [clear](pixelart.md#clear)
- [draw](pixelart.md#draw)
- [execHook](pixelart.md#exechook)
- [getColor](pixelart.md#getcolor)
- [getRandomCoord](pixelart.md#getrandomcoord)
- [init](pixelart.md#init)
- [random](pixelart.md#random)
- [reset](pixelart.md#reset)
- [startAnimation](pixelart.md#startanimation)

## Constructors

### constructor

\+ **new PixelArt**(`options`: [*PixelArtOptions*](../interfaces/pixelartoptions.md)): [*PixelArt*](pixelart.md)

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PixelArtOptions*](../interfaces/pixelartoptions.md) |

**Returns:** [*PixelArt*](pixelart.md)

Defined in: [pixel-art.ts:74](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L74)

## Properties

### #ctx

• `Private` **#ctx**: CanvasRenderingContext2D

Defined in: [pixel-art.ts:62](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L62)

___

### #drawCount

• `Private` **#drawCount**: *number*= 0

Defined in: [pixel-art.ts:70](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L70)

___

### #hooks

• `Private` **#hooks**: [*Hook*](../interfaces/hook.md)[]

Defined in: [pixel-art.ts:66](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L66)

___

### #imageData

• `Private` **#imageData**: ImageData

Defined in: [pixel-art.ts:67](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L67)

___

### #img

• `Private` **#img**: HTMLImageElement

Defined in: [pixel-art.ts:63](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L63)

___

### #isInitialized

• `Private` **#isInitialized**: *boolean*= false

Defined in: [pixel-art.ts:64](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L64)

___

### #lastAnimationTimeMs

• `Private` **#lastAnimationTimeMs**: *number*= 0

Defined in: [pixel-art.ts:69](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L69)

___

### #que

• `Private` **#que**: [*VoidCallback*](../README.md#voidcallback)[]

Defined in: [pixel-art.ts:65](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L65)

___

### #requestAnimationId

• `Private` **#requestAnimationId**: *null* \| *number*= null

Defined in: [pixel-art.ts:68](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L68)

___

### #shadowCanvas

• `Private` **#shadowCanvas**: HTMLCanvasElement

Defined in: [pixel-art.ts:60](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L60)

___

### #shadowCtx

• `Private` **#shadowCtx**: CanvasRenderingContext2D

Defined in: [pixel-art.ts:61](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L61)

___

### canvas

• **canvas**: HTMLCanvasElement

Defined in: [pixel-art.ts:51](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L51)

___

### imgUrl

• **imgUrl**: *string*

Defined in: [pixel-art.ts:52](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L52)

___

### initialDrawCount

• **initialDrawCount**: *number*

Defined in: [pixel-art.ts:56](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L56)

___

### intervalMs

• **intervalMs**: *number*

Defined in: [pixel-art.ts:55](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L55)

___

### maxSize

• **maxSize**: *number*

Defined in: [pixel-art.ts:54](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L54)

___

### minSize

• **minSize**: *number*

Defined in: [pixel-art.ts:53](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L53)

___

### shape

• **shape**: [*Shape*](../README.md#shape)

Defined in: [pixel-art.ts:57](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L57)

___

### type

• **type**: *pointillism*

Defined in: [pixel-art.ts:58](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L58)

## Accessors

### drawCount

• get **drawCount**(): *number*

**Returns:** *number*

Defined in: [pixel-art.ts:72](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L72)

## Methods

### addHook

▸ **addHook**(`type`: [*HookType*](../README.md#hooktype), `callback`: [*VoidCallback*](../README.md#voidcallback)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | [*HookType*](../README.md#hooktype) |
`callback` | [*VoidCallback*](../README.md#voidcallback) |

**Returns:** *void*

Defined in: [pixel-art.ts:140](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L140)

___

### afterInitialize

▸ **afterInitialize**(`callback`: [*VoidCallback*](../README.md#voidcallback)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | [*VoidCallback*](../README.md#voidcallback) |

**Returns:** *void*

Defined in: [pixel-art.ts:131](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L131)

___

### cancelAnimation

▸ **cancelAnimation**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:234](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L234)

___

### clear

▸ **clear**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:256](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L256)

___

### draw

▸ **draw**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:185](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L185)

___

### execHook

▸ **execHook**(`type`: [*HookType*](../README.md#hooktype)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`type` | [*HookType*](../README.md#hooktype) |

**Returns:** *void*

Defined in: [pixel-art.ts:250](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L250)

___

### getColor

▸ **getColor**(`xCoord`: *number*, `yCoord`: *number*): *Promise*<[*RGBA*](../README.md#rgba)\>

#### Parameters:

Name | Type |
:------ | :------ |
`xCoord` | *number* |
`yCoord` | *number* |

**Returns:** *Promise*<[*RGBA*](../README.md#rgba)\>

Defined in: [pixel-art.ts:165](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L165)

___

### getRandomCoord

▸ **getRandomCoord**(): *Promise*<[*Coord*](../interfaces/coord.md)\>

**Returns:** *Promise*<[*Coord*](../interfaces/coord.md)\>

Defined in: [pixel-art.ts:152](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L152)

___

### init

▸ **init**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:89](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L89)

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

Defined in: [pixel-art.ts:144](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L144)

___

### reset

▸ **reset**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:268](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L268)

___

### startAnimation

▸ **startAnimation**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [pixel-art.ts:214](https://github.com/divlook/pixel-art/blob/07be79c/libs/pixel-art.ts#L214)
