import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';




const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 10,
  },
  active: {
    '& $line': {
      backgroundColor : '#F17300',
    },
  },
  completed: {
    '& $line': {
      backgroundColor : '#F17300',
    },
  },
  line: {
    height: 2,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 25,
    height: 25,
    fontSize: '15px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#cccccc',
  },
  completed: {
    backgroundColor: '#F17300',
    zIndex: 1,
    color: '#fff',
    width: 25,
    height: 25,
    fontSize: '15px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: "",
    2: "",
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      { completed? <Check className={classes.completed}/> : icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [ ['Step 1','보안 약점 진단'], ['Step 2', '보안 대응 코딩']];
}

export default function CodeStepper(props) {
  const classes = useStyles();
  const steps = getSteps();



  return (
    <div className={classes.root}>
      
      <Stepper alternativeLabel activeStep={props.step-1} connector={<ColorlibConnector />} style={{backgroundColor: '#DBE4EE'}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}><div style={{ fontSize: "12px",color:"black"}}>{label[0]}<br/>{label[1]}</div></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
      </div>
    </div>
  );
}
