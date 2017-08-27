import React, { Component } from 'react';
import { Button, Checkbox, Form, TextArea, Dropdown, Message } from 'semantic-ui-react';


class CrearAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            local: '',
            informacion: '',
            loading: false,
            mensaje: null,
            imagen: null,
            raza: '',
            edad: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.estado.animales.estado == 200) {
            this.setState({
                mensaje: <Message
                    success
                    header={'Añadido satisfactoriamente'}
                    content={'Se ha añadido en la base de datos correctamente ya es visible en la applicación móvil. :)'}
                />
            });
        }
        if (nextProps.estado.animales.estado == 0) {
            this.setState({
                mensaje: <Message
                    error
                    header={'Error'}
                    content={'No se ha podido añadir correctamente vuelva a intentarlo de nuevo o pónganse en contacto con el programador'}
                />
            });
            delete this.props.estado.animales.estado;
        }
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagen: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    handleSend(e) {
        const { nombre, local, informacion, imagen, raza, edad } = this.state;
        const animal = { nombre, local, informacion, imagen, raza, edad }
        e.preventDefault();
        this.setState({ loading: true });
        this.props.crear(animal);
        setTimeout(() => {
            this.setState({
                nombre: '',
                local: '',
                informacion: '',
                loading: false,
                mensaje: null,
                imagen: null,
                raza: '',
                edad: 0
            });
        }, 1500);
    }

    render() {
        const { nombre, local, informacion, raza, edad } = this.state;
        return (
            <div style={{ maxWidth: '70%', display: 'block', margin: '0 auto' }}>
                <Form loading={this.state.loading} onSubmit={this.handleSend}>
                    <Form.Input
                        required
                        label='Nombre'
                        name='nombre'
                        placeholder='Nombre del animal'
                        value={nombre}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        required
                        type="file"
                        label='Foto del animal'
                        name='foto'
                        onChange={this.handleFile}
                    />
                    <Form.Input
                        required
                        label='Raza'
                        name='raza'
                        placeholder='Raza del animal'
                        value={raza}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        required
                        label='Edad'
                        name='edad'
                        type='number'
                        placeholder='Edad del animal'
                        value={edad}
                        onChange={this.handleChange}
                    />
                    <Form.Dropdown
                        required
                        label='Localización'
                        search
                        selection
                        options={[{ key: 'tgn', value: 'tgn', text: 'Tarragona' }, { key: 'reu', value: 'reu', text: 'Reus' }, { key: 'bnv', value: 'bnv', text: 'Bonavista' }]}
                        name='local'
                        placeholder='Lugar donde se encuentra el animal'
                        value={local}
                        onChange={this.handleChange}
                    />
                    <Form.TextArea
                        required
                        autoHeight
                        label='Información del animal'
                        name='informacion'
                        placeholder='Redacta aquí lo que quieras sobre el animal'
                        value={informacion}
                        onChange={this.handleChange}
                    />
                    <Button type='submit' size='big' color='teal'>Añadir</Button>
                </Form>
                {
                    this.state.mensaje == null ? '' : this.state.mensaje
                }
                {
                    this.state.imagen == null ? '' : <img style={{ marginTop: 10, marginBottom: 10 }} src={`${this.state.imagen}`} height={500} />
                }
            </div>
        );
    }
}

export default CrearAnimal;