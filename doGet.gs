function doGet(e) {
  Logger.log("doGet activated");
  const user = e.parameter.user || "None";
  Logger.log("User: " + user);

  let input_id, output_id;
  
  switch (user) {
    case "Master":
      input_id = '12Rg9lJBf5TJaS9iWpCzlPe8-F5js8Qmhk7j3RWh1tYc';
      output_id = '10HfUqrHUTy3lxkkzE7gn_eGRjDhrgpLxDnl9KH4JWrM';
      break;
    case "Yiqi":
      processYiqiEntry();
      break;
    case "Chen Xiao":
      processChenXiaoEntry();
      break;
    case "Jingyi":
      processJingyiEntry();
      break;
    case "Yiran":
      processYiranEntry();
      break;
    default:
      return ContentService.createTextOutput("Unknown user: " + user);
  }

  processEntry(user, input_id, output_id);
  
  return ContentService.createTextOutput(`Complete`);
}
