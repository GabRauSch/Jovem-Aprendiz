import { Request, Response } from "express";
import data from '../challenges/c1.json';



export const connectToBancation = (){
    connectar(process.env.DBSERVER)
}

export const loadPage = (req: Request, res: Response) => {
    let { id }= req.params;

    let challenges = data.challenges[parseInt(id) -1];

    let linkBefore;
    let linkAfter;

    console.log(process.env.TMP)
    console.log(data.challenges[parseInt(id)]);
    linkBefore = data.challenges[parseInt(id) - 2] ? `<a style="color: #fff;text-decoration: none;" href="/challenge/${parseInt(id)-1}">Anterior</a>` : '<a></a>'
    linkAfter = data.challenges[parseInt(id)] ? `<a style="color: #fff;text-decoration: none;" href="/challenge/${parseInt(id)+1}">Próximo</a>` : '<a></a>'

    if(!challenges){
        res.send('Este número de desafio não existe')
        return;
    }

    let tipsDisplay= "";
    
    challenges.tips.forEach((el: string)=>{
        tipsDisplay +=` 
        <div class='secret hidding'>${el}</div>
        <hr>`})

    
    let hard = challenges.hard ? '#8C0000' : '#005A8C'

    let styleCSS =  `
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
    section{
        padding: 20px;
        box-shadow: 2px 2px 4px #000;
        margin: 0 auto;
        width: 1200px;
    }

    div{
        margin: 10px;
    }

    .secret{
        user-select: none;
        border-radius: 10px;
        
    }
    .hidding{
        background-color: #000;
        content:none;
        cursor: pointer;
    }

    body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        background-color: ${hard};
        overflow-x: hidden
    }

    header {
        background-color: ${hard};
        color: #FFF;
        padding: 20px;
        box-shadow: 5px 0px 20px #000;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }

    section {
        max-width: 100vw;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .problem {
        margin-bottom: 40px;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    .problem h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .problem p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
    }

    .problem u {
        font-weight: bold;
    }

    .problem i {
        font-style: italic;
        font-size: 20px;
        color: #555;
    }

    .problem hr {
        border: none;
        border-top: 1px solid #eee;
        margin: 20px 0;
    }

    /* Heading styles */
    h3 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    u {
        text-decoration: underline;
    }

    i {
        font-style: italic;
    }

    /* Secret message styles */
    .secret {
        color: #eee;
        background-color: ${hard};
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        cursor: pointer; 
        user-select: none;
        transition: all 0.2s ease-in-out;
        border: 1px dashed #444;
    }

    .hidding {
        background-color: #eee;
    }

    /* Animation styles */
    .secret:hover {
        transform: scale(1.05);
    }

    /* Additional styles */
    div {
        margin-bottom: 20px;
    }

    .solveProblem{
        display: flex;
        justify-content: flex-end;
        align-items: center
    }

    .solve-problem-button{
        background-color: #350;
        border-radius: 20px;
        padding: 10px;
        cursor: pointer;
        color: #fff
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
    .pageAlterns{
        display: flex;
        justify-content: space-between;
    }
    .pageAlterns a{
        background-color: #005A8C;
        padding: 5px;
        border-radius: 10px;
        color: #fff;
        text-size: 18px
    }
    </style>
</head>`;
    let htmlPage;
    if(challenges.resolved){
        htmlPage = `
        <header style="background-color: #538a00">
            <h1>${id} - Você resolveu este desafio!</h1>
        </header>
        <body style="background-color: #538A00"> 
            <section style="text-align: center">
                <div class='pageAlterns'>
                    ${linkBefore}
                    ${linkAfter}
                </div>
                <div class='code'>
                    Se por algum motivo você queira revê-lo (seja la o porque caralhos) basta mudar o resolved para false no nosso c1.json
                </div>
            </section>
            
        </body>
        </html>`
    } else {
        htmlPage = `
        <body>
        <header style="background-color: ${hard + '22'}">
            <h1>Desafio ${id} - ${challenges.title}!</h1>
        </header>
        <section >
            <div> 
                <div class='pageAlterns'>
                    ${linkBefore}
                    ${linkAfter}
                </div>
                <div class="problem">
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
           
            <!--<div class="solveProblem">
                <div class="solve-problem-button">Finalizar desafio</div>
            </div>-->
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
    }


    let createdHTML = styleCSS + htmlPage 
   


    res.send(createdHTML);
    return;
}