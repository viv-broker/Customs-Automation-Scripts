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
      input_id = '1ncsBHDtFkDeTazr09n60-INrOlh7SuVf5smaFhWwY7k';
      output_id = '1wBWqoYCpvPyTNlziJR83EZ1llwbTRv6DskHLMbGHoTM';
      break;
    case "ChenXiao":
      input_id = '1wx7cmWUEtBQBZCHDV01lrymg2pyDQIzN_W2vYrkBcaQ';
      output_id = '1-NN89Erz0MpydxObLrL5UZ5pa7R1j-pUfWnpP1yKYXc';
      break;
    case "Jingyi":
      input_id = '1VO8rDHSlmNprktcxysNelGmRj_eDv0e1D6-tQooNAHg';
      output_id = '1PgFm5G1MOcOwCBEDyKujVzMVga_Z3f_RQKh_2D4st_o';
      break;
    case "Yiran":
      input_id = '1foRcsfKr2BZFaWEPanE9QU2xZqFtewKWpmEEQkJ5k9g';
      output_id = '1xJZjMyisT7nwpp2yWkr9qn8o-NBZlO4805JVXwulIFI';
      break;
    
    default:
      return ContentService.createTextOutput("Unknown user: " + user);
  }

  processEntry(user, input_id, output_id);
  
  return ContentService.createTextOutput(`Complete`);
}
