function doGet() {
  var template = HtmlService.createTemplateFromFile("index");
  var colors = getColors();
  template.message = "";
  template.colors = colors;
  return template
    .evaluate()
    .setTitle("Forms")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function uploadFileInGoogleDrive(
  data,
  name,
  type,
  nameValue,
  funcaoValue,
  setorValue,
  categoriaValue,
  subCategoriaValue,
  textareaValue
) {
  var datafile = Utilities.base64Decode(data);
  var blob2 = Utilities.newBlob(datafile, type, name);
  var folder = DriveApp.getFolderById("1W6XKxYraHlrpzXeJDTV86uSkdJRJkDXv");
  var newFile = folder.createFile(blob2);

  var rowData = [
    newFile.getDateCreated(),
    nameValue,
    funcaoValue,
    setorValue,
    categoriaValue,
    subCategoriaValue,
    textareaValue,
    // newFile.getName(),
    // newFile.getId(),
    newFile.getUrl(),
    // newFile.getSize(),
  ];
  SpreadsheetApp.getActive().getSheetByName("DATA").appendRow(rowData);

  return newFile.getUrl();
}

function nothingFile(
  nameValue,
  funcaoValue,
  setorValue,
  categoriaValue,
  subCategoriaValue,
  textareaValue
) {
  let hour = new Date();
  hour.toLocaleString("en-GB").slice(11, 20);
  var rowData = [
    hour,
    nameValue,
    funcaoValue,
    setorValue,
    categoriaValue,
    subCategoriaValue,
    textareaValue,
    "",
  ];
  SpreadsheetApp.getActive().getSheetByName("DATA").appendRow(rowData);

  return;
}

function getNameForAutoComplete() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statesSheet = ss.getSheetByName("AUTO");
  let values = statesSheet
    .getRange("A2:B")
    .getValues()
    .filter((item) => item[0] != "");
  return values;
}

function getOptions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var setorSheet = ss.getSheetByName("AUTO");
  let data = setorSheet
    .getRange("C2:C")
    .getValues()
    .filter((item) => item[0] !== "");

  let newArr = data.map((item) => item[0]);
  let unique = [];
  newArr.map((r) => {
    if (unique.indexOf(r) === -1) {
      unique.push(r);
    }
  });
  // return data
  return unique.sort();
}

let options = getOptions()
  .map((item) => "<option " + item + "</option>")
  .join("");

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