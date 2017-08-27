import { connect } from 'react-redux';
import { crearAnimal, getAnimales, eliminarAnimal } from '../modules/animales';
import Animales from '../components/Animales';

const mapDispatchToProps = {
    crearAnimal: (req) => crearAnimal(req),
    getAnimales,
    eliminarAnimal: (id) => eliminarAnimal(id)
}

const mapStateToProps = (state) => ({
    animales: { animales: state.animales }
})

export default connect(mapStateToProps, mapDispatchToProps)(Animales);
