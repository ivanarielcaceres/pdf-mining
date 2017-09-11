var pdfreader = require('pdfreader');
const hummus = require('hummus');
const fs = require('fs');

var origin = JSON.parse(fs.readFileSync('origin.json', 'utf8'));

var pdfWriter = hummus.createWriterToModify('checklist.pdf', {
	modifiedFilePath: 'output/checklist-output.pdf',
  log: 'output/log/checklist-output.log'
});
console.log(pdfWriter);
var pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
console.log(pageModifier);

//Write address
pageModifier.startContext().getContext().writeText(
	origin['ADDR'],
	170, 690,
	{font:pdfWriter.getFontForFile(__dirname + '/courier.ttf'),size:11,colorspace:'gray',color:0x00}
);

//Write tax id
pageModifier.startContext().getContext().writeText(
	origin['TAX_ID'],
	170, 665,
	{font:pdfWriter.getFontForFile(__dirname + '/courier.ttf'),size:11,colorspace:'gray',color:0x00}
);

//Write LA name
pageModifier.startContext().getContext().writeText(
	origin['LA_NAME'],
	195, 640,
	{font:pdfWriter.getFontForFile(__dirname + '/courier.ttf'),size:11,colorspace:'gray',color:0x00}
);

pageModifier.endContext().writePage();
pdfWriter.end();
