require('dotenv').config();
const conexacao = require('./db/conexacao');

conexacao
.authenticate()
.then(() => {
    console.log('Está conectado com sucesso!');

})
.catch((err)=>{
    console.log('Ocorreu um erro'+ err);
})