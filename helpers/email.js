const nodemailer= require( "nodemailer");

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"SUPPORT SATELITAL DEALER" <cuentas@supportsatelital.com>',
    to: email,
    subject: "SUPPORT SATELITAL DEALER - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en SUPPORT SATELITAL DEALER",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en SUPPORT SATELITAL DEALER</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"SUPPORT SATELITAL DEALER" <cuentas@supportsatelital.com>',
    to: email,
    subject: "SUPPORT SATELITAL DEALER - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

const agendarCita = async (datos,dato_usuario) => {
    //const { email, nombre, fecha, hora, servicio, nombre_cliente, telefono_cliente } = datos;
    const {id_user, fecha, id_servicio, id_turno, id_esteticista,}= datos;
    const {nombre, usuario}= dato_usuario;
   // console.log(dato_usuario);
    console.log(datos);
   // console.log(usuario);
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const info = await transport.sendMail({
        from: '"DALCY SPA" <cuentas@dalcyspa.com>',
        to: usuario,
        subject: "CITA AGENDADA",
        text: "Has agendado una cita",
        html: `<p>Hola: ${nombre} has agendado una cita correctamente</p>
    
        <p>Tu cita es el ${fecha} a las ${id_turno} horas, con el servicio de ${id_servicio} a cargo de el esteticista ${id_esteticista}</p> 
    
        
        
        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        
        
        `,
      });
}

module.exports={
    agendarCita
}
