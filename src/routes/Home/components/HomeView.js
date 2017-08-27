import React from 'react';
import { Header, Accordion } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';

const panels = [
  {
    title: "¿La aplicación está completa?",
    content: "No para nada, simplemente es una demo para poder mostrar el potencial de esta misma."
  },
  {
    title: "¿Y tú que ganas haciendo esto Xose?",
    content: "Nada, aunque agradecería ganar algo para poder seguir produciendo aplicaciones de este calibre."
  },
  {
    title: "El porqué de esta aplicación",
    content: "Viendo las necesidades que veo me he propuesto echar un cable a todo ese grupo de personas que se esfuerza por ayudar a los demás."
  },
  {
    title: "¿Tienes intención de acabar esta app?",
    content: `Para mí supone un esfuerzo y muchas horas poder desarrollar este tipo de aplicaciónes, cabe decir que todo está desarrollado con la última tecnologia
              por ello si el ayuntamiento está dispuesto a colaborar no tengo ningún problema en acabarla.`
  }].map((frase) => ({
    title: frase.title,
    content: frase.content,
  }));

export const HomeView = () => (
  <div>
    <Header as='h2'>
      <FontAwesome className='fa-cogs' name='fa-cogs' size='5x' style={{ display: 'block', paddingTop: 15 }} />
      Panel de administración
      <Header.Subheader>
        Desde aquí podrás añadir y actualizar cualquier cosa de la applicación móvil.
      </Header.Subheader>
    </Header>
    <Accordion panels={panels} styled style={{ margin: '0 auto' }} />
  </div>
);

export default HomeView;
