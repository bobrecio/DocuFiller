const fs = require('fs');
const puppeteer = require('puppeteer');
const {buildPathHtml, buildPathPdf} = require('./buildPaths');

const printPdf = async () => {
    console.log('Starting');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(buildPathHtml);

    const pdf = await page.pdf({
        format: 'Letter',
        landscape: true,
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	});
    
    await browser.close();
    console.log('Ending', pdf.length);
    return pdf;
};

const init = async() => {
    try {
        const pdf = await printPdf();
        fs.writeFileSync(buildPathPdf, pdf);
        console.log('Successfully created PDF')
    }catch (error) {
        console.log(error);
    }
};

init();