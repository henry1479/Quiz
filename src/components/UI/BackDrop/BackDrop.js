import React from 'react';
import classes from './BackDrop.module.css';

export const BackDrop = props => {
    return(
        <div className={classes.BackDrop}
        onClick={props.onClick}/>
    )
}