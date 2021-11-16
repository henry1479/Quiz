import React from 'react'
import classes from './AnswerItem.module.css';

export const AnswerItem = props => {
    

    const cls = [classes.AnswerItem];
    // подсветка ответов
    // правильный - зеленым
    // неправильный - красным


    if(props.state) {
        cls.push(classes[props.state])
    }

    // console.log(props.state)
    return (
        <li className={cls.join(' ')}  
        onClick={()=> props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
            </li>
    )
}