const path = require('path');
const buildPaths = {
	buildPathHtml: 'file:///home/rocky/Desktop/NodeFS_lab/build.html', // page.goto - needs "file:///" in the path or you get security issues
    //buildPathPdf: 'file:///home/rocky/Desktop/NodeFS_lab/build.pdf'
	//buildPathHtml: path.resolve('build.html'),
	buildPathPdf: path.resolve('build.pdf')
};

module.exports = buildPaths;