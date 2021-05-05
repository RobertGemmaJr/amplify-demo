import { AppBar, Container, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    header: {
      backgroundColor: theme.palette.grey[500],
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      margin: theme.spacing(0, 2),
    },
}))

export default function Header(props) {
    const classes = useStyles();

    return (
      <header className={classes.header}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography component="h4" variant="h4" className={classes.title}>
                Apple Blossom Health Check
              </Typography>
              <Button variant="contained" className={classes.menuButton}>
                Reset
              </Button>
              <Button variant="contained" className={classes.menuButton}>
                Menu
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

      </header>
    )
}