var pdfreader = require('pdfreader');
const fs = require('fs');

var rows = []; // indexed by y-position
var values = {}

function getAllText() {
  var data = []
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    //.forEach((y) => console.log((rows[y] || []).join('')));
    .forEach((y) => {
       data.push((rows[y] || []).join(''))
    })
    return data.join('')
}

new pdfreader.PdfReader().parseFileItems('origin.pdf', function(err, item){
  if (item) {
    rows.push(item.text)
  } else {
    rows = rows.join('')
    var valuesMLSini = rows.indexOf('MLS#:')
    var valuesMLSEnd = rows.indexOf('ActiveList')
    values['MLS'] = rows.slice(valuesMLSini + 5, valuesMLSEnd)

    var valuesAddrini = rows.indexOf('Addr:')
    var valuesAddrEnd = rows.indexOf('PO:')
    values['ADDR'] = rows.slice(valuesAddrini + 5, valuesAddrEnd)

    var valuesPOini = rows.indexOf('PO:')
    var valuesPOEnd = rows.indexOf('County:')
    values['PO'] = rows.slice(valuesPOini + 3, valuesPOEnd)

    var valuesCityTownini = rows.indexOf('City/Town:')
    var valuesCityTownEnd = rows.indexOf('Zip:')
    values['CITY_TOWN'] = rows.slice(valuesCityTownini + 10, valuesCityTownEnd)

    var valuesVillageini = rows.indexOf('Village:')
    var valuesVillageEnd = rows.indexOf('Hamlet/Loc.:')
    values['VILLAGE'] = rows.slice(valuesVillageini + 8, valuesVillageEnd)

    var valuesPriceini = rows.indexOf('List Price:')
    var valuesPriceEnd = rows.indexOf('Addr:')
    values['LIST_PRICE'] = rows.slice(valuesPriceini + 11, valuesPriceEnd)

    var valuesCountyini = rows.indexOf('County:')
    var valuesCountyEnd = rows.indexOf('City/Town:')
    values['COUNTY'] = rows.slice(valuesCountyini + 7, valuesCountyEnd)

    var valuesTaxIdini = rows.indexOf('Tax ID#:')
    var valuesTaxIdEnd = rows.indexOf('Tax:')
    values['TAX_ID'] = rows.slice(valuesTaxIdini + 7, valuesTaxIdEnd)

    var valuesLAini = rows.indexOf('LA:')
    var valuesLAEnd = rows.indexOf('LA Ph:')
    values['LA_NAME'] = rows.slice(valuesLAini + 3, valuesLAEnd)

    var content = JSON.stringify(values);
    fs.writeFile("origin.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });
    console.log(values)
  }
});
