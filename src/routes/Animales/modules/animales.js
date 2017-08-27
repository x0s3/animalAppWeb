import axios from 'axios';

const CREAR_ANIMAL = 'CREAR_ANIMAL';
const GET_ANIMALES = 'GET_ANIMALES';
const ELIMINAR_ANIMAL = 'ELIMINAR_ANIMAL';

export const crearAnimal = (req) => (dispatch) => {
    axios.post("http://192.168.1.43:3000/animales/crearAnimal", req).then((responseData) => {
        const { data, status, headers } = responseData;
        if (data.response == 200)
            dispatch({ type: CREAR_ANIMAL, payload: 200 });
        else
            dispatch({ type: CREAR_ANIMAL, payload: 0 })
    });
}

export const eliminarAnimal = (id) => (dispatch) => {
    axios.delete('http://192.168.1.43:3000/animales/eliminarAnimal/' + id).then((responseData) => {
        const { data, status, headers } = responseData;
        if (data.response == 200)
            dispatch({ type: ELIMINAR_ANIMAL, payload: id });
    });
}

export const getAnimales = () => (dispatch) => {
    axios.get('http://192.168.1.43:3000/animales/animales').then((responseData) => {
        const { data, status, headers } = responseData;
        dispatch({ type: GET_ANIMALES, payload: data })
    });
}


export const actions = {
    crearAnimal,
    getAnimales,
    eliminarAnimal
}


const ACTION_HANDLERS = {
    [CREAR_ANIMAL]: (state, action) => {
        return Object.assign({}, state, { estado: action.payload });
    },
    [GET_ANIMALES]: (state, action) => {
        return Object.assign({}, state, { animales: [action.payload] });
    },
    [ELIMINAR_ANIMAL]: (state, action) => {
        let animales = state.animales[0].filter((animalActual) => {
            if (animalActual._id !== action.payload)
                return animalActual;
        });
        return Object.assign({}, state, (state.animales = [animales]));
    }
}

const initialState = { animales: [] }
export default function animalesReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
