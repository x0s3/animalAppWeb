import { connect } from 'react-redux';
import { crearNoticia, getNoticias, eliminarNoticia } from '../modules/noticias';
import Noticias from '../components/Noticias';

const mapDispatchToProps = {
  crearNoticia: (req) => crearNoticia(req),
  getNoticias,
  eliminarNoticia: (id) => eliminarNoticia(id)
}

const mapStateToProps = (state) => ({
  noticias: { noticias: state.noticias }
})

export default connect(mapStateToProps, mapDispatchToProps)(Noticias);
