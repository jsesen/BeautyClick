const {Router}= require ('express')
const nodemailer = require('nodemailer');
const router = Router();


//**Aqui creo la ruta SEND-EMAIL: */
router.post('/send-email', async(req, res) =>{
    //console.log (req.body);     ya no hace falta ver los datos por consola, creare un emaily se los envio a el usuario o a mi correo
   //ahora desde el request.body en una constante voy a guardar las variables de los objetos del formulario
   //asi estoy requiriendo los datos que estan dentro del body 
   const{name, email, phone,message }= req.body;
   //ahora creo una estructura de html que me permita ver esto
   contentHTML = `
        <h1>Datos del usuario</h1>
        <ul>
        <li>Nombre y apellido:${name}</li>
        <li>Dirección email: ${email}</li>
        <li>Telefono de contacto: ${phone}</li>
        </ul>
        <p>Contenido del mensaje: ${message}</p>
   `;
  // console.log(contentHTML)
  //aqui voy  a configurar 2 cosas un transport con los valores y luego configuro para enviar un email
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "8c889b7ecd7a8c",
      pass: "f83b537c6704da"
    }
  });
  //cuando obtenga la respuesta guardare los resultados en info
  const info= await transporter.sendMail({
    from: "'mailtrap'<8c889b7ecd7a8c>",
    to : 'su.alba@hotmail.com',
    subject: "formulario de contacto de mi App",
    html: contentHTML
  })
    console.log ('message sent',info.messageId);
   // res.send("recibido"); en vez de enviar un recibido vamos a redireccionarlo hacia el archivo llamado sucess.html
   res.redirect('/sucess.html');

});

module.exports = router;
