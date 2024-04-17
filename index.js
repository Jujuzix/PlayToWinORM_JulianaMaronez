require('dotenv').config();
const conn = require('./db/conn');
const Jogos = require("./models/Jogos")
/*const Usuario = require('./models/Usuario');*/

conn
   .sync()
   .then(() => {
    console.log('Está conectado e sincronizado corretamente com o banco de dados!');
})
.catch((err)=>{
    console.log('Ocorreu um erro e não está sendo sincronizado mais'+ err);
})




/*conn
.authenticate()
.then(() => {
    console.log('Está conectado com sucesso!');

})
.catch((err)=>{
    console.log('Ocorreu um erro'+ err);
})
*/