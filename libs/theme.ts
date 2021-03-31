import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1565c0',
        },
        secondary: {
            main: '#333',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
})

export default theme
