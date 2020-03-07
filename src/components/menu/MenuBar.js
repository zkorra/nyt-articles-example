import React, { Component } from 'react'
import { Menu, Header, Image } from 'semantic-ui-react'

export default class MenuBar extends Component {
    render() {
        return (
            <Menu size='tiny'>
                <Menu.Item href='/' link>
                    <Image src={require('../img/newspaper.png')} size='mini' />
                </Menu.Item>
                <Menu.Item href='/' link>
                    <Header size='small'>Discover</Header>
                </Menu.Item>
            </Menu>
        );
    }

}