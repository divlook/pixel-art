import { NextPage } from 'next'
import { Container, makeStyles, Paper } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { PixelArt } from '~/libs/pixel-art'
import { asset } from '~/libs/utils.amd'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
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
}))

const HomePage: NextPage = () => {
    const classes = useStyles()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pixelArtRef = useRef<PixelArt>()

    useEffect(() => {
        ;(async () => {
            if (!canvasRef.current) {
                return
            }

            pixelArtRef.current = new PixelArt({
                canvas: canvasRef.current,
                imgUrl: asset('/img/iu.jpg'),
                initialDrawCount: 10000,
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
            </main>
        </>
    )
}

export default HomePage
