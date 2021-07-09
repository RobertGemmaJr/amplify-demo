import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { FORM } from "../../../constants/enum"
import { Content } from "../../../models";

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    alignContent: "center",
    margin: theme.spacing(1),
  },
  media: {
    height: 300,
  },
  text: {
    fontWeight: "bold"
  }
}))

export default function HomeCard(props) {
  const classes = useStyles();
  const {setContent, setForm, form, image, text} = props;

  function handleCardClick(form) {
    setForm(form)
    switch(form) {
      case FORM.FAMILY:
        setContent(Content.KEYPAD);
        break;
      case FORM.STAFF:
        setContent(Content.KEYPAD);
        break;
      case FORM.MANUAL:
        setContent(Content.MANUAL);
        break;
      default:
          console.error("Invalid form code: ", form)
          break;
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => handleCardClick(form)}>
        <CardMedia 
          className={classes.media}
          image={image}
        />
      </CardActionArea>
      <CardContent>
        <Typography align="center" component="h3" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
    </Card>    
  )
}