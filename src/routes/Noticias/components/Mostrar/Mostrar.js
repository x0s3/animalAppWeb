import React, { Component } from 'react';
import { Button, Card, Image, Header, Modal, Confirm } from 'semantic-ui-react';

class Eliminar extends Component {
    state = { modalOpen: false }

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    });

    render() {
        return (
            <Modal
                trigger={<Button basic color='red' onClick={this.handleOpen}>Eliminar</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                style={{ width: '50%', height: '30%' }}
                size={"small"}
            >
                <Modal.Header>Eliminar Noticia NOMBRE DE LA NOTICIA</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p><strong>¿Desea eliminar esta noticia?</strong></p>
                        <p>Una vez eliminada no podrá recuperarse.</p>
                        <Modal.Actions>
                            <Button onClick={this.handleClose}>Cancelar</Button>
                            <Button color='red' onClick={() => {
                                this.props.eliminar(this.props._id);
                                this.handleClose();
                            }}>Eliminar</Button>
                        </Modal.Actions>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}


const NoticiaCompleta = ({ titulo, autor, fecha, descripcion, likes, imagen }) => (
    <Modal trigger={<Button basic color='green'>Noticia completa</Button>}>
        <Modal.Header>Título de la noticia: {titulo}</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Header>Autor: {autor}{' · '}Fecha: {fecha}{' · '}Likes: {likes}</Header>
                <p>{descripcion}</p>
                <img src={imagen} height={500}/>
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

class Mostrar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: this.props.noticias
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ noticias: nextProps.noticias });
    }

    componentDidMount() {
        this.props.getNotis();
    }

    render() {
        const noticias = <Card.Group>
            {
                this.state.noticias != undefined ? this.state.noticias.map((noticiaActual, key) => {
                    return <Card
                        key={key}
                        header={noticiaActual.autor}
                        meta={noticiaActual.localidad == 'bnv' ? "Bonavista" : 'Babilonia'}
                        description={noticiaActual.contenido}
                        extra={
                            <div className='ui two buttons'>
                                <NoticiaCompleta
                                    noticias={this.state.noticias}
                                    titulo={noticiaActual.titulo}
                                    descripcion={noticiaActual.contenido}
                                    autor={noticiaActual.autor}
                                    fecha={noticiaActual.fecha}
                                    likes={noticiaActual.likes}
                                    imagen={noticiaActual.imagen}
                                />
                                <Eliminar eliminar={this.props.eliminar} _id={noticiaActual._id} />
                            </div>
                        }
                    />
                }) : ''
            }
        </Card.Group>;
        return (
            <div style={{ position: 'absolute', paddingTop: 10, marginLeft: '15%' }}>
                {
                    noticias
                }
            </div>
        );
    }
}

export default Mostrar;