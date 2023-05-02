import express from 'express';
import Challenges from './routes/Challenges';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(Challenges);

server.listen(process.env.PORT, () => {
    console.log('Servidor iniciado, tentando rodar na porta 3000 ;-;.Porcaria de senai.')
});
