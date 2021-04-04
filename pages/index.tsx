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
import { ArtType, PixelArt, PixelArtOptions } from '~/libs/pixel-art'
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
        level: 2,
        type: 'pointillism',
    })
    const artTypes: ArtType[] = ['pointillism', 'mosaic']

    const startAnimation = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.startAnimation()
    }, [])

    const stopAnimation = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.stopAnimation()
    }, [])

    const resetCanvas = useCallback(() => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.reset()
    }, [])

    const restartCanvas = useCallback(async () => {
        const pixelArt = pixelArtRef.current
        if (!pixelArt) return

        pixelArt.afterInitialize(async () => {
            if (canvasState.level !== undefined) {
                pixelArt.level = canvasState.level
            }

            if (canvasState.type && canvasState.type !== pixelArt.type) {
                pixelArt.type = canvasState.type
                await pixelArt.reset()
                await pixelArt.startAnimation()
            }
        })
    }, [canvasState])

    useEffect(() => {
        ;(async () => {
            if (!canvasRef.current) {
                return
            }

            pixelArtRef.current = new PixelArt({
                canvas: canvasRef.current,
                imgUrl: asset('/img/iu.jpg'),
                level: canvasState.level,
                type: canvasState.type,
            })

            pixelArtRef.current.addHook('initialize', () => {
                console.log('initialize')
            })

            await pixelArtRef.current.init()
            await pixelArtRef.current.startAnimation()
        })()
    }, [])

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
                                select
                                label="Level"
                                value={canvasState.level}
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        level: parseInt(e.target.value) || 0,
                                    }))
                                }}
                            >
                                {Array(5).fill(null).map((_, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        {/* TODO: duration으로 변경 */}
                        {/* <Grid item xs={12} md>
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
                        </Grid> */}

                        <Grid item xs={12} md>
                            <TextField
                                select
                                label="ArtType"
                                value={canvasState.type}
                                fullWidth
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={(e) => {
                                    setCanvasState((prevState) => ({
                                        ...prevState,
                                        type: e.target.value as ArtType,
                                    }))
                                }}
                            >
                                {artTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            justify="flex-end"
                        >
                            <ButtonGroup color="primary">
                                <Button onClick={startAnimation}>Play</Button>
                                <Button onClick={stopAnimation}>Pause</Button>
                                <Button onClick={resetCanvas}>Reset</Button>
                                <Button onClick={restartCanvas} variant="contained">Apply</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}

export default HomePage
