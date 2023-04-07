import { Request, Response } from "express";
import data from '../challenges/c1.json';
import fs from 'fs-extra';
import path from 'path'

export const loadPage = (req: Request, res: Response) => {
    let { id }= req.params;

    let challenges = data.challenges[parseInt(id) -1];

    let linkBefore;
    let linkAfter;

    console.log(data.challenges[parseInt(id)]);
    linkBefore = data.challenges[parseInt(id) - 2] ? `<a style="color: #000;text-decoration: none;" href="/challenge/${parseInt(id)-1}">Anterior</a>` : '<a></a>'
    linkAfter = data.challenges[parseInt(id)] ? `<a style="color: #000;text-decoration: none;" href="/challenge/${parseInt(id)+1}">Próximo</a>` : '<a></a>'

    if(!challenges){
        res.send('Este número de desafio não existe')
        return;
    }

    if(challenges.resolved){
        res.send('<h1 style="text-align: center">Você resolveu este desafio!</h1>'
        +'<div style="text-align: center">Se por algum motivo você queira revê-lo (seja la o porque caralhos) basta mudar o resolved para false no nosso c1.json'
        +`</div><div style="width:90vw; margin:auto;display:flex;justify-content:space-around;">`
        +`${linkBefore}`
        +`${linkAfter}`);
        return;
    } 

    let tipsDisplay= "";


    challenges.tips.forEach((el: string)=>{
        tipsDisplay +=` 
        <div class='secret hidding'>${el}</div>
        <hr>`})

    let createdHTML = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Desafio ${id}</title>
    <link href="index.css" rel="stylesheet" >
    <style>
    
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    body{
        overflow-x: hidden;
    }
    header{
        width: 100vw;
        display: flex;
        justify-content: center;
        padding: 20px;
    }
    section{
        padding: 20px;
        box-shadow: 2px 1px 4px #333;
        margin: 0 auto;
        width: 1200px;
    }
    .pageAlterns{
        display: flex;
        justify-content: space-between;
    }
    
    div{
        margin: 20px;
    }
    a{
        color: #000;
        text-decoration: none;
    }
    .secret{
        user-select: none;
        border-radius: 10px;
        font-size: 23px;
        background-color: #39c739;
        transition: all ease 1s;
        padding: 15px;
        line-height: 35px;
    }
    .hidding{
        background-color: #000;
        cursor: pointer;
    }
    .codeTitle{
        font-size: 15px;
    }

    .code {
        font-family: Consolas,"courier new";
        color: crimson;
        background-color: #111;
        font-size: 105%;
        padding: 20px;
        margin: 0;
    }
    
    
    </style>
</head>
<body>
    <header>
        <h1>Desafio ${id} - ${challenges.title}!</h1>
    </header>
    <section>
        <div>
            <div>
                <u>O problema:</u>
                <i>
                    ${challenges.problem}
                </i>
            </div> 

            <div>
                <u>Dicas:</u>
                    ${tipsDisplay}
            </div>
        </div>
        <div class='pageAlterns'>
           ${linkBefore}
           ${linkAfter}
        </div>
        
    </section>
    <script>
        let secret = document.querySelectorAll('.secret');
        secret.forEach((el)=>el.addEventListener('click', (e)=>{
            el.querySelectorAll('div').forEach((element)=>{element.classList.contains('codeHide') ? element.classList.add('code') : null});
            el.classList.remove('hidding');
        }))
    </script>
</body>
</html>`

    res.send(createdHTML);
    return;
}

export const listChallenges = (req: Request, res: Response) => {
    let dir = __dirname.replace(/\\/g, '/').replace('controllers', 'challenges');

    let fileContent = fs.readFileSync(dir+ '/c1.json').toString();
    let jsonFileContent = JSON.parse(fileContent);

    let challenges = jsonFileContent.challenges;
    let data: object[] = [];
    
    challenges.forEach((el: any)=>{
        data.push({
            title: el.title,
            problem: el.problem
        });
    });


    res.json({data})
}