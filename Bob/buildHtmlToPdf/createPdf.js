const fs = require('fs');
const puppeteer = require('puppeteer');
// Build paths
const { buildPathHtml, buildPathPdf } = require('./buildPaths');

const printPdf = async () => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	/** Launch a headleass browser */
	const browser = await puppeteer.launch();//({headless:false});

	/* 1- Create a newPage() object. It is created in default browser context. */
	const page = await browser.newPage();

	console.log("HTML: ", buildPathHtml);
	console.log("PDF: ", buildPathPdf);

	/* 2- Will open our generated `.html` file in the new Page instance. */
	await page.goto(buildPathHtml, { waitUntil: 'networkidle0' });

	/* 3- Take a snapshot of the PDF */
	const pdf = await page.pdf({
		//path: `${buildPathPdf}`,
		format: 'Letter',
		landscape: true,
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	});

	/* 4- Cleanup: close browser. */
	await browser.close();
	console.log('Ending: Generating PDF Process', pdf.length);
	return pdf;
};

const init = async () => {
	try {
		const pdf = await printPdf();
		fs.writeFileSync(buildPathPdf, pdf);
		console.log('Succesfully created an PDF table');
	} catch (error) {
		console.log('Error generating PDF', error);
	}
};

init();
