import React from 'react';
import classes from './ActiveQuiz.module.css'
import { AnswersList } from './AnswersList/AnswersList';

export const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.questionNumber}</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.questionNumber} of {props.questionsNumber}</small>
        </p>
        <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}/>
    </div>
)