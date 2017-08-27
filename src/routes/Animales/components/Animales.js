import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Menu } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import Mostrar from './Mostrar/Mostrar';
import CrearAnimal from './Crear/Crear';

class Animales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'mostrar',
    }
  }

  componentDidMount() {
    this.props.getAnimales();
  } 

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu compact icon='labeled' vertical style={{ left: 0, position: 'fixed', display: 'block' }}>
          <Menu.Item name='mostrar' active={activeItem === 'mostrar'} onClick={this.handleItemClick}>
            <FontAwesome className='fa-newspaper-o' name='fa-newspaper-o' size='2x' />
            Mostrar animales
          </Menu.Item>
          <Menu.Item name='crear' active={activeItem === 'crear'} onClick={this.handleItemClick}>
            <FontAwesome className='fa-plus-square-o' name='fa-plus-square-o' size='2x' />
            Añadir animal
          </Menu.Item>
        </Menu>
        <div style={{ margin: 'auto', width: 'auto' }}>
          {
            this.state.activeItem === 'mostrar' ? <Mostrar
              getAnimals={this.props.getAnimales}
              animales={this.props.animales.animales.animales[0]}
              eliminar={this.props.eliminarAnimal}
            /> : <CrearAnimal crear={this.props.crearAnimal} estado={this.props.animales} />
          }
        </div>
      </div>
    )
  }
}

Animales.propTypes = {
  animales: PropTypes.object.isRequired,
  crearAnimal: PropTypes.func.isRequired,
  getAnimales: PropTypes.func.isRequired,
  eliminarAnimal: PropTypes.func.isRequired
}

export default Animales;
