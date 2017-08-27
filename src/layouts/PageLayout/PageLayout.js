import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';


export default class PageLayout extends React.Component {
  state = { activeItem: 'inicio' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state
    return (
      <div className='container text-center'>
        <Segment color='teal' compact={true} style={{margin:'0 auto'}}>
          <Menu pointing secondary compact={true}>
            <Menu.Item header>AnimalXosing</Menu.Item>
            <Menu.Item name='inicio' active={activeItem === 'inicio'} onClick={this.handleItemClick} ><IndexLink to='/'>Inicio</IndexLink></Menu.Item>
            <Menu.Item name='noticias' active={activeItem === 'noticias'} onClick={this.handleItemClick} ><Link to='/noticias'>Noticias</Link></Menu.Item>
            <Menu.Item name='animales' active={activeItem === 'animales'} onClick={this.handleItemClick} ><Link to='/animales'>Animales</Link></Menu.Item>
            <Menu.Item name='usuarios' active={activeItem === 'usuarios'} onClick={this.handleItemClick} ><Link to='/counter'>Usuarios</Link></Menu.Item>
          </Menu>
        </Segment>
        {
          this.props.children
        }
      </div>
    )
  }
}
PageLayout.propTypes = {
  children: PropTypes.node,
}