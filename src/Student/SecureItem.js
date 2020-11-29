import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    maxHeight: 200,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#dbdbdb',
    }
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper2: {
    textAlign: 'right',
    position:'relative', 
    bottom:'-10px', right:'-10px'
  }
}));

export default function SecureItem(props) {
  const classes = useStyles();

  const text = () => {
    const txt = props.secure.secName;
    if(txt.length>=15) return(
      <div>
      <Typography variant="h5">
          {txt.substring(0,15)}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {txt.substring(15)}
      </Typography>
      </div>
    )
    else return(
      <div>
      <Typography variant="h5">&nbsp;</Typography>
        <Typography variant="h5" gutterBottom>
          {txt}
      </Typography>
      </div>
    )
  }

  const handleClick = () => {
    console.log('clicked');
    window.location.href=`/student/problem/${props.secure.secId}?language=${props.language}?languageId=${props.languageId}`;
    console.log(props)
  }

  return (
    <Card className={classes.root} style={{cursor:'pointer'}} onClick={handleClick}>
      <CardContent>
        {text()}
          <Typography variant="body2" color="textSecondary" component="p">
            {props.secure.scategoryName}
          </Typography>
      </CardContent>
      <CardActions>
        <Grid container item xs={12} spacing={1}>
        <Grid item xs={4}>
          <div className={classes.paper}></div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper}>
          <Typography variant="button" display="block" style={{color:'#2F96EB'}}>
            문제 갯수
        </Typography>
        <Typography variant="subtitle" display="block">
            {props.secure.count}개
        </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.paper2}>
          <IconButton aria-label="enter">
        <ExitToAppIcon style={{float:'right', color:'#2F96EB'}}/>
        </IconButton>
          </div>
        </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
