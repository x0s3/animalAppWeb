import axios from 'axios';

const CREAR_NOTICIA = 'CREAR_NOTICIA';
const GET_NOTICIAS = 'GET_NOTICIAS';
const ELIMINAR_NOTICIA = 'ELIMINAR_NOTICIA';

export const crearNoticia = (req) => (dispatch) => {
  axios.post("http://192.168.1.43:3000/noticias/crearNoticia", req).then((responseData) => {
    const { data, status, headers } = responseData;
    if (data.response == 200)
      dispatch({ type: CREAR_NOTICIA, payload: 200 });
    else
      dispatch({ type: CREAR_NOTICIA, payload: 0 })
  });
}

export const eliminarNoticia = (id) => (dispatch) => {
  axios.delete('http://192.168.1.43:3000/noticias/eliminarNoticia/' + id).then((responseData) => {
    const { data, status, headers } = responseData;
    if (data.response == 200)
      dispatch({ type: ELIMINAR_NOTICIA, payload: id });
  });
}

export const getNoticias = () => (dispatch) => {
  axios.get('http://192.168.1.43:3000/noticias/noticias').then((responseData) => {
    const { data, status, headers } = responseData;
    dispatch({ type: GET_NOTICIAS, payload: data })
  });
}


export const actions = {
  crearNoticia,
  getNoticias,
  eliminarNoticia
}


const ACTION_HANDLERS = {
  [CREAR_NOTICIA]: (state, action) => {
    return Object.assign({}, state, { estado: action.payload });
  },
  [GET_NOTICIAS]: (state, action) => {
    return Object.assign({}, state, { noticias: [action.payload] });
  },
  [ELIMINAR_NOTICIA]: (state, action) => {
    let noticias = state.noticias[0].filter((noticiaActual) => {
      if (noticiaActual._id !== action.payload)
        return noticiaActual;
    });
    return Object.assign({}, state, (state.noticias = [noticias]));
  }
}

const initialState = { noticias: [] }
export default function noticiasReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
