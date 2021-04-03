import { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Drawer,
    Fab,
    Grid,
    makeStyles,
    Paper,
    TextField,
} from '@material-ui/core'
import { PixelArt, PixelArtOptions, Shape } from '~/libs/pixel-art'
import { asset } from '~/libs/utils.cjs'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${asset('/img/iu.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(50px)',
            transform: 'scale(1.5)',
            zIndex: -1,
            content: '""',
        },
    },
    container: {
        padding: theme.spacing(2),
    },
    paper: {
        height: '100%',
    },
    typography: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    canvas: {
        display: 'block',
        width: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    drawerContents: {
        padding: theme.spacing(2),
    },
}))

const HomePage: NextPage = () => {
    const classes = useStyles()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pixelArtRef = useRef<PixelArt>()
    const [isOpenBottomSheet, openBottomSheet] = useState(false)
    const [canvasState, setCanvasState] = useState<Partial<PixelArtOptions>>({
        minSize: 10,
        maxSize: 20,
        intervalMs: 10,
        initialDrawCount: 10000,
        shape: 'square',
    })
    const shapes: Shape[] = ['circle', 'square']

    const startAnimation = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.startAnimation()
    }, [])

    const cancelAnimation = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.cancelAnimation()
    }, [])

    const clearCanvas = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.clear()
    }, [])

    const resetCanvas = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.reset()
    }, [])

    useEffect(() => {
        ;(async () => {
            if (!canvasRef.current) {
                return
            }

            pixelArtRef.current = new PixelArt({
                canvas: canvasRef.current,
                imgUrl: asset('/img/iu.jpg'),
                minSize: canvasState.minSize,
                maxSize: canvasState.maxSize,
                intervalMs: canvasState.intervalMs,
                initialDrawCount: canvasState.initialDrawCount,
                shape: canvasState.shape,
            })

            pixelArtRef.current.addHook('initialize', () => {
                console.log('initialize')
            })

            await pixelArtRef.current.init()
            await pixelArtRef.current.startAnimation()
        })()
    }, [])

    useEffect(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.afterInitialize(() => {
            if (canvasState.minSize !== undefined) {
                pixelArt.minSize = canvasState.minSize
            }
            if (canvasState.maxSize !== undefined) {
                pixelArt.maxSize = canvasState.maxSize
            }
            if (canvasState.intervalMs !== undefined) {
                pixelArt.intervalMs = canvasState.intervalMs
            }
            if (canvasState.initialDrawCount !== undefined) {
                pixelArt.initialDrawCount = canvasState.initialDrawCount
            }
            if (canvasState.shape) pixelArt.shape = canvasState.shape
        })
    }, [canvasState])

    return (
        <>
            <main className={classes.root}>
                <Container className={classes.container} maxWidth="lg">
                    <Paper className={classes.paper} elevation={16}>
                        <canvas ref={canvasRef} className={classes.canvas} />
                    </Paper>
                </Container>

                <Fab
                    className={classes.fab}
                    color="secondary"
                    onClick={() => openBottomSheet(true)}
                >
                    <MenuIcon />
                </Fab>
            </main>

            <Drawer
                anchor="bottom"
                open={isOpenBottomSheet}
                onClose={() => openBottomSheet(false)}
            >
                <Box className={classes.drawerContents}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md>
                            <TextField
                                type="number"
                                label="Min size (px)"
                                defaultValue={canvasState.minSize}
                                fullWidth
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        minSize: parseInt(e.target.value) || 0,
                                    }))
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md>
                            <TextField
                                type="number"
                                label="Max size (px)"
                                defaultValue={canvasState.maxSize}
                                fullWidth
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        maxSize: parseInt(e.target.value) || 0,
                                    }))
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md>
                            <TextField
                                type="number"
                                label="Interval (ms)"
                                defaultValue={canvasState.intervalMs}
                                fullWidth
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        intervalMs:
                                            parseInt(e.target.value) || 0,
                                    }))
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md>
                            <TextField
                                type="number"
                                label="Initial draw count"
                                defaultValue={canvasState.initialDrawCount}
                                fullWidth
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        initialDrawCount:
                                            parseInt(e.target.value) || 0,
                                    }))
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md>
                            <TextField
                                select
                                label="Shape"
                                value={canvasState.shape}
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        shape: e.target.value as Shape,
                                    }))
                                }}
                            >
                                {shapes.map((shape) => (
                                    <option key={shape} value={shape}>
                                        {shape}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            justify="flex-end"
                        >
                            <ButtonGroup color="primary">
                                <Button onClick={startAnimation}>Start</Button>
                                <Button onClick={cancelAnimation}>Stop</Button>
                                <Button onClick={clearCanvas}>Clear</Button>
                                <Button onClick={resetCanvas}>Reset</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}

export default HomePage
