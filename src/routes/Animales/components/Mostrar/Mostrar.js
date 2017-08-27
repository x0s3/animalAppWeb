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
                <Modal.Header>Eliminar Animal de la base de datos: {this.props.nombre}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p><strong>¿Desea eliminar este animal?</strong></p>
                        <p>Una vez eliminado no podrá recuperarse.</p>
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


const AnimalCompleto = ({ nombre, raza, edad, descripcion, lugar, imagen }) => (
    <Modal trigger={<Button basic color='green'>Información detallada</Button>}>
        <Modal.Header>Nombre: {nombre}</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Header>Nombre: {nombre}{' · '}Edad: {edad}{' · '}Raza: {raza}</Header>
                <p>{descripcion}</p>
                <img src={`${imagen}`} height={500} />
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

class Mostrar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animales: this.props.animales
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ animales: nextProps.animales });
    }

    componentDidMount() {
        this.props.getAnimals();
    }

    render() {
        const animales = <Card.Group>
            {
                this.state.animales != undefined ? this.state.animales.map((animalActual, key) => {
                    
                    return <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src={animalActual.imagen} />
                            <Card.Header>
                                {animalActual.nombre}
                            </Card.Header>
                            <Card.Meta>
                                Edad: {animalActual.edad} Raza: {animalActual.raza}
                            </Card.Meta>
                            <Card.Description>
                                {animalActual.descripcion}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <AnimalCompleto
                                    animales={this.state.animales}
                                    lugar={animalActual.lugar}
                                    nombre={animalActual.nombre}
                                    raza={animalActual.raza}
                                    descripcion={animalActual.descripcion}
                                    edad={animalActual.edad}
                                    imagen={animalActual.imagen}
                                />
                                <Eliminar eliminar={this.props.eliminar} nombre={animalActual.nombre} _id={animalActual._id} />
                            </div>
                        </Card.Content>
                    </Card>
                }) : ''
            }
        </Card.Group>;
        return (
            <div style={{ position: 'absolute', paddingTop: 10, marginLeft: '15%' }}>
                {
                    animales
                }
            </div>
        );
    }
}

export default Mostrar;