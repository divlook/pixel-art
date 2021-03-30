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
        flex: 1,
        padding: theme.spacing(2),
        height: '100%',
    },
    paper: {
        height: '100%',
    },
    typography: {
        padding: theme.spacing(1),
    },
}))

const HomePage: NextPage = () => {
    const classes = useStyles()

    return (
        <>
            <main className={classes.root}>
                <Container className={classes.container} maxWidth="lg">
                    <Paper className={classes.paper} elevation={3}>
                        <Typography
                            className={classes.typography}
                            component="div"
                        >
                            Hello World
                        </Typography>
                    </Paper>
                </Container>
            </main>
        </>
    )
}

export default HomePage
