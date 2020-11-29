import React from 'react';
import CodeTable from './CodeTable';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '16px',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: "#054A91"
  },
  heading1: {
    position: 'relative',
    top: '20%',
    fontSize: '16px',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: "#054A91"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: "black",
  },
}));

export default function DescAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div className={classes.root} >
      <Accordion style={{backgroundColor: '#DBE4EE',boxShadow: '0px 0px 0px 0px black' }}expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"#054A91"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}> 문제 선택 &nbsp; </Typography>
          <Typography className={classes.heading} > 문제{props.problemNumber}</Typography>
        </AccordionSummary>

          <CodeTable secId={props.secId} problemNumber={props.problemNumber} handleSelectProblem={props.handleSelectProblem} lists={props.lists}/>

      </Accordion>
    </div>
  );
}