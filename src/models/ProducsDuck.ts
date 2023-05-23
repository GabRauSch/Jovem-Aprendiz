import { Model, DataTypes } from "sequelize"; 
import { sequelize } from '../instances/mysql';// conexão, está importando a instancia do mysql

export interface productsInstance extends Model{//type geral da tabela/model productsDuck
    id:number;
    idProduct: number;
    name: string;
    internalid: string;
    qt: number;
    expectedQt: number;
    receiptNumber: number;
    country:string;
    region:string;
    postCode: number;
}

export const productsDuck = sequelize.define<productsInstance>("productsDuck", {//"ensinar" o sequelize a rodar a tabela 
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idProduct:{
        
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    internalid:{
        type: DataTypes.STRING
    },
    qt:{
        type: DataTypes.INTEGER
    },
    expectedQt:{
        type: DataTypes.INTEGER
    },
    receiptNumber:{
        type: DataTypes.INTEGER
    },
    country:{
        type: DataTypes.STRING
    },
    region:{
        type: DataTypes.STRING
    },
    postCode:{
        type: DataTypes.INTEGER
    }
}, {
    tableName:'productsduck',
    timestamps: false// Remove a validação de hora e data, pois não foram criadas colunas que precisem destes valores (createdAt e updatedAt)
}
);