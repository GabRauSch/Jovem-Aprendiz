//Faz a conexão com o bd

import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD )
 export const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT as string)
    }
    
);


