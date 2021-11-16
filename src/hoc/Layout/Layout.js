import React from 'react'
import classes from './Layout.module.css'
import {MenuToggle} from '../../components/Navigation/MenuToggLe/MenuToggle'
import  Drawer  from '../../components/Navigation/Drawer/Drawer';

export class Layout extends React.Component {

    state={
        menu:false,
    }


    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                isOpen={this.state.menu}
                onClose={this.toggleMenuHandler}
                />

                <MenuToggle
                onToggle={this.toggleMenuHandler}
                isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}