import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import Mostrar from './Mostrar/Mostrar';
import CrearNoticia from './Crear/Crear';

class Noticias extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'mostrar',
    }
  }

  componentDidMount() {
    this.props.getNoticias();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu compact icon='labeled' vertical style={{ left: 0, position: 'fixed', display: 'block' }}>
          <Menu.Item name='mostrar' active={activeItem === 'mostrar'} onClick={this.handleItemClick}>
            <FontAwesome className='fa-newspaper-o' name='fa-newspaper-o' size='2x' />
            Mostrar noticias
          </Menu.Item>
          <Menu.Item name='crear' active={activeItem === 'crear'} onClick={this.handleItemClick}>
            <FontAwesome className='fa-plus-square-o' name='fa-plus-square-o' size='2x' />
            Crear Noticia
          </Menu.Item>
        </Menu>
        <div style={{ margin: 'auto', width: 'auto' }}>
          {
            this.state.activeItem === 'mostrar' ? <Mostrar
              getNotis={this.props.getNoticias}
              noticias={this.props.noticias.noticias.noticias[0]}
              eliminar={this.props.eliminarNoticia}
            /> : <CrearNoticia crear={this.props.crearNoticia} estado={this.props.noticias} />
          }
        </div>
      </div>
    )
  }
}

Noticias.propTypes = {
  noticias: PropTypes.object.isRequired,
  crearNoticia: PropTypes.func.isRequired,
  getNoticias: PropTypes.func.isRequired,
  eliminarNoticia: PropTypes.func.isRequired
}

export default Noticias;
