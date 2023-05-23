import { Response, Request } from 'express';
import { productsDuck } from '../models/ProducsDuck'

export const modelConsult = async (req: Request, res: Response) => {//Depende do banco de dados, async
    console.log("thethe");
        let products = await productsDuck.findAll(); //findAll, tem a função de pegar todos os dados
    // let joinhaParceiro = JSON.stringify(products);

    res.json({feijaum: products});
};



