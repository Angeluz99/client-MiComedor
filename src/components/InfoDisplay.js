import React from "react";

function InfoDisplay() {
  return (
    <div className="InfoDisplay">
      <h2>REGISTRO</h2>
      <p className="outFooter">
        Para registrarse es necesario un nombre de usuario, una contraseña, un
        correo electrónico -en esta versión puede ser un correo falso, solo
        asegurar que contenga un arroba '@'- y el nombre del restaurante. Si el
        restaurante no ha sido registrado, el código creado se ligará al nuevo
        restaurante. Si el restaurante ya existe, asegúrate de tener el código
        para poder unirte.
      </p>
      <h2>USO</h2>
      <p>La applicación tiene 4 secciones.</p>
      <p className="outFooter">
        <strong>Mis Mesas:</strong> Muestra las mesas abiertas del usuario
        registrado. Contiene un campo para nombrar una nueva mesa y el botón
        para crearla -no puede tener el mismo nombre que otra mesa aún abierta-.
        Para agregar artículos a la cuenta, presiona el botón Agregar Platillos.
        Para cerrar una mesa presiona Cerrar Mesa
      </p>
      <p className="outFooter">
        <strong>Platillos:</strong> Muestra los platillos disponibles separados
        en tres secciones. Contiene una forma para crear un nuevo artículo,
        definiendo su nombre, precio y categoría. Si hay una mesa seleccionada
        en el panel izquierdo, cada platillo seleccionado se añade a la cuenta
        después de confirmar la acción en el botón CONFIRMAR NUEVOS ARTÍCULOS,
        si desea cancelar la acción y/o remover la mesa seleccionada, use el
        botón QUITAR en el mismo panel.
      </p>
      <p className="outFooter">
        <strong>Mesas Abiertas:</strong> Muestra todas las mesas abiertas de
        todos los usuarios del restaurante.
      </p>
      <p className="outFooter">
        <strong>Mesas Cerradas:</strong> Muestra todas las mesas cerradas de
        todos los usuarios del restaurante. Contiene un botón para borrar todas
        las mesas cerradas. Las mesas borradas no se pueden recuperar
      </p>
      <h2>ADVERTENCIA</h2>
      <p className="outFooter">
        Esta es una prueba de la applicación. Si deseas usarla en tu negocio,
        contáctanos para crear una acorde a tus necesidades.
      </p>
      <section>
        <a href="https://angeluz99.github.io/Portfolio/indexEsp.html">
          CONTACTO
        </a>
      </section>
    </div>
  );
}

export default InfoDisplay;
