import { NextPage } from 'next'
import { Container, makeStyles, Paper, Typography } from '@material-ui/core'

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
    image: {
        display: 'block',
        width: '100%',
    },
}))

const HomePage: NextPage = () => {
    const classes = useStyles()

    return (
        <>
            <main className={classes.root}>
                <Container className={classes.container} maxWidth="lg">
                    <Paper className={classes.paper} elevation={10}>
                        <Typography className={classes.typography} variant="h1">
                            Welcome to new office
                        </Typography>

                        <img
                            className={classes.image}
                            src="/img/iu.jpg"
                            alt="IU"
                        />
                    </Paper>
                </Container>
            </main>
        </>
    )
}

export default HomePage
