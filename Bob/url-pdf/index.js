const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.listen(33000, ()=>{
    console.log("Server Started");
})

const url="https://icanhazdadjoke.com/";

async function htmlToPDF(){
    const browser = await puppeteer.launch();
    const webpage = await browser.newPage();

    await webpage.goto(url, {
        waitUntil: "networkidle0"
    })

    await webpage.pdf({
        printBackground: true,
        displayHeaderFooter: true,
        path: "webpage.pdf",
        format: "Letter",
        landscape: true,
        margin:{
            top: "10px",
            bottom: "10px",
            left: "10px",
            right: "10px"
        }
    }).then( _ => {
        console.log("File Downloaded");
    }).catch (e => {
        console.log(e);
    })

    await browser.close()
}

htmlToPDF();