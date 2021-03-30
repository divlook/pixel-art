import { NextPage } from 'next'
import { Container, makeStyles, Paper } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { Ceremony } from '~/libs/ceremony'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
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
    const ceremonyRef = useRef<Ceremony>()

    useEffect(() => {
        ;(async () => {
            if (!canvasRef.current) {
                return
            }

            ceremonyRef.current = new Ceremony({
                canvas: canvasRef.current,
                imgUrl: '/img/iu.jpg',
            })

            await ceremonyRef.current.init()
            await ceremonyRef.current.startAnimation()
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
