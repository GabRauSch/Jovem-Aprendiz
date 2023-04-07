import express from 'express';
import Challenges from './routes/Challenges'

const server = express();


server.use(Challenges);



server.listen(3000,()=>{
    console.log('Servidor iniciado, rodando na porta 2000')
});