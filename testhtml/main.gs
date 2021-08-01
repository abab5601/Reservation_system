function myFunction(){
  return 0
}
function doPost(e){
  //開啟資料表
  var app = SpreadsheetApp.openById("1UUTYomzP0ZMk-KSm9J264vIi6bQ29TREEXV8aW_yIAA");
  //傳入資料
  var parameter = e.parameter;
  /*
  資料結構  // *為必要選項
  結構用符號：
  ┌─┬─┐
  │ │ │
  ├─┼─┤
  │ │ │
  └─┴─┘
  parameter
  ├  method      //*執行模式
  │  ├  Societies_list_Get  //社團列表Get
  │  │  ├
  ├  username    //*使用者名字
  ├  
  */
  //社團列表Get
  if(parameter.method == "Societies_list_Get"){
    //取得社團列表資料表
    var list = app.getSheetByName("社團列表");
    //取得設全部社團資料表列數
    var row = list.getLastRow() - 1;
    //取得全社團列表
    allDATA = list.getRange(2,1,row,1).getValue();
    return 0 
  }
  // If the request want to read data.
  if(parameter.method == "read"){
    var sheet = app.getSheetByName("社團列表");
    // return the text response of the value of the cell(1A).
    return ContentService.createTextOutput(sheet.getRange(1, 1).getValue());
  }

 
  }

