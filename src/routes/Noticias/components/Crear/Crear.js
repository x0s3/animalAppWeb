import React, { Component } from 'react';
import { Button, Checkbox, Form, TextArea, Dropdown, Message } from 'semantic-ui-react';


class CrearNoticia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            local: '',
            contenido: '',
            imagen:null,
            loading: false,
            mensaje: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.estado.noticias.estado == 200) {
            this.setState({
                mensaje: <Message
                    success
                    header={'Creada satisfactoriamente'}
                    content={'La noticia creada ya es visible en la applicación móvil. :)'}
                />
            });
        }
        if (nextProps.estado.noticias.estado == 0) {
            this.setState({
                mensaje: <Message
                    error
                    header={'Error'}
                    content={'No se ha podido procesar correctamente la noticia vuelva a intentarlo de nuevo o pónganse en contacto con el programador'}
                />
            });
        }
        delete this.props.estado.noticias.estado;
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
        const { local, contenido, titulo, imagen } = this.state;
        const noticia = { local, contenido, titulo, imagen }
        e.preventDefault();
        this.setState({ loading: true });
        this.props.crear(noticia);
        setTimeout(() => {
            this.setState({
                loading: false,
                local: '',
                contenido: '',
                titulo: '',
                imagen:null
            })
        }, 2000);
    }

    render() {
        const { titulo, local, contenido, imagen } = this.state;
        return (
            <div style={{ maxWidth: '70%', display: 'block', margin: '0 auto' }}>
                <Form loading={this.state.loading} onSubmit={this.handleSend}>
                    <Form.Input
                        required
                        label='Título'
                        name='titulo'
                        placeholder='Título descriptivo de la noticia'
                        value={titulo}
                        onChange={this.handleChange}
                    />
                    <Form.Dropdown
                        required
                        label='Localización'
                        search
                        selection
                        options={[{ key: 'tgn', value: 'tgn', text: 'Tarragona' }, { key: 'reu', value: 'reu', text: 'Reus' }, { key: 'bnv', value: 'bnv', text: 'Bonavista' }]}
                        name='local'
                        placeholder='Lugar de la noticia'
                        value={local}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        required
                        type="file"
                        label='Foto del animal'
                        name='foto'
                        onChange={this.handleFile}
                    />
                    <Form.TextArea
                        required
                        autoHeight
                        label='Contenido de la noticia'
                        name='contenido'
                        placeholder='Redacta aquí todo el contenido de la noticia'
                        value={contenido}
                        onChange={this.handleChange}
                    />
                    <Button type='submit' size='big' color='teal'>Crear</Button>
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

export default CrearNoticia;