import React from "react";
import classes from './Drawer.module.css';
import { BackDrop } from "../../UI/BackDrop/BackDrop";
import { NavLink } from "react-router-dom";

const links = [
    {
        to: '/',
        label: 'Quiz List',
        exact: true
    },
    {
        to: '/auth',
        label: 'Auth',
        exact: false,
    },
    {
        to: '/quiz-creator',
        label: 'Quiz Creator',
        exact: false
    }
]


class Drawer extends React.Component {
    clickHandler = () => {
        this.props.onClose()
    }  

    renderLinks() {
        return links.map((link,index)=>{
            return(
                <li key={index}>
                   <NavLink
                   to={link.to}
                   exact={link.exact}
                   activeClassName={classes.active}
                   onClick={this.clickHandler}
                   >{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]
        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        return(
           <>
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
            {this.props.isOpen?<BackDrop onClick={this.props.onClose}/>:null}
           </>
        )
    }

}

export default Drawer