function doGet() {
  var template = HtmlService.createTemplateFromFile('index')
  var colors = getColors();
  template.message = '';
  template.colors = colors;
  return template.evaluate()
    .setTitle('Formulário')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
}

function uploadFilesToGoogleDrive(data, name, type, inputName, inputSetor, textarea, color, fruit) {
  var datafile = Utilities.base64Decode(data)
  var blob2 = Utilities.newBlob(datafile, type, name);
  var folder = DriveApp.getFolderById("1W6XKxYraHlrpzXeJDTV86uSkdJRJkDXv");
  var newFile = folder.createFile(blob2);

  var rowData = [
    newFile.getDateCreated(),
    inputName,
    inputSetor,
    color,
    fruit,
    textarea,
    // newFile.getName(),
    // newFile.getId(),
    newFile.getUrl(),
    // newFile.getSize(),
    
  ];
  SpreadsheetApp.getActive().getSheetByName("DATA").appendRow(rowData);

  return newFile.getUrl()
}



function uploadFilesToGoogleDriveNothingFile(inputName, inputSetor, textarea, color, fruit) {

  let hour = new Date
  hour.toLocaleString('en-GB').slice(11, 20)
  var rowData = [
    hour,
    inputName,
    inputSetor,
    color,
    fruit,
    textarea,
    '',
    
  ];
  SpreadsheetApp.getActive().getSheetByName("DATA").appendRow(rowData);

  return
}

//PEGAR CATEGORIAS 

function getColors() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var lovSheet = ss.getSheetByName("CATEGORY_SUB");
  var getLastRow = lovSheet.getLastRow();
  var return_array = [];
  for (var i = 2; i <= getLastRow; i++) {
    if (return_array.indexOf(lovSheet.getRange(i, 1).getValue()) === -1) {
      return_array.push(lovSheet.getRange(i, 1).getValue());
    }
  }


  return return_array;
}

function getCategorias(color) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var lovSheet = ss.getSheetByName("CATEGORY_SUB");
  var getLastRow = lovSheet.getLastRow();
  var return_array = [];
  for (var i = 2; i <= getLastRow; i++) {
    if (lovSheet.getRange(i, 1).getValue() === color) {
      return_array.push(lovSheet.getRange(i, 2).getValue());
    }
  }


  return return_array;
}

//PEGAR CATEGORIA

//AUTOCOMPLETE FUNCTIONS
function getNameForAutoComplete() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statesSheet = ss.getSheetByName("AUTOCOMPLETES");
  var statesRange = statesSheet.getRange("A2:A");
  var statesValues = statesRange.getValues();
  return statesValues;

}
function getSetorForAutoComplete() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var setorSheet = ss.getSheetByName("AUTOCOMPLETES");
  var setorRange = setorSheet.getRange("C2:C");
  var setorValues = setorRange.getValues();
  return setorValues;
}

function getOptions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var setorSheet = ss.getSheetByName("AUTOCOMPLETES");
  let data = setorSheet.getRange("C2:C").getValues().filter(item => item[0] !== "")

  let newArr = data.map(item => item[0])
  let unique = []
  newArr.map(r => {
    if (unique.indexOf(r) === -1) {
      unique.push(r)
    }
  })
  // return data
  return unique.sort()
}

let options = getOptions().map(item => "<option>" + item + "</option>").join("")





























