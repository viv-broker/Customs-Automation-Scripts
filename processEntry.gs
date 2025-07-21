function processEntry(user, input_id, output_id) {
  const startTime = new Date();
  Logger.log(`[${user}] Start time: ${startTime.toISOString()}`);

  // ===== STEP 0: Clean the cauldron 🧼 =====
  const step0Start = new Date();
  const cauldronFileId = "1NOXOM9vpKykgAMpKP33uxTWMMUUv7MsCMeQFFFLqxy4";
  const cauldronSpreadsheet = SpreadsheetApp.openById(cauldronFileId);
  const cauldronSheet = cauldronSpreadsheet.getSheetByName(user);

  const cauldronInputStartRow = 4;
  const cauldronInputStartCol = 1;
  const cauldronInputNumCols = 12;
  const cauldronMaxRow = cauldronSheet.getLastRow();
  const cauldronRowsToClear = cauldronMaxRow - cauldronInputStartRow + 1;

  if (cauldronRowsToClear > 0) {
    cauldronSheet
      .getRange(cauldronInputStartRow, cauldronInputStartCol, cauldronRowsToClear, cauldronInputNumCols)
      .clearContent();
  }
  Logger.log(`[${user}] Step 0 done in ${(new Date() - step0Start) / 1000}s`);

  // ===== STEP 1: Input → Cauldron =====
  const step1Start = new Date();
  const inputSpreadsheet = SpreadsheetApp.openById(input_id);
  const inputSheet = inputSpreadsheet.getSheetByName("input_CN");

  const startRow = 4;
  const startCol = 1;
  const numCols = 12;
  const lastRow = inputSheet.getLastRow();
  const numRows = lastRow - startRow + 1;

  const inputRange = inputSheet.getRange(startRow, startCol, numRows, numCols);
  const rawData = inputRange.getValues();

  const destinationRange = cauldronSheet.getRange(startRow, startCol, numRows, numCols);
  destinationRange.setValues(rawData);
  Logger.log(`[${user}] Step 1 done in ${(new Date() - step1Start) / 1000}s`);

  // ===== STEP 2: Wait for brew to complete (1s sleep) =====
  const step2Start = new Date();
  Utilities.sleep(1000);
  Logger.log(`[${user}] Step 2 (sleep) done in ${(new Date() - step2Start) / 1000}s`);

  // ===== STEP 3: Cauldron → Output =====
  const step3Start = new Date();
  const outputSpreadsheet = SpreadsheetApp.openById(output_id);
  const outputSheet = outputSpreadsheet.getSheetByName("output");

  const cauldronStartCol = 30; // AD
  const cauldronEndCol = 79;   // BI
  const cauldronNumCols = cauldronEndCol - cauldronStartCol + 1;
  const cauldronStartRow = 5;
  const cauldronLastRow = cauldronSheet.getLastRow();
  const cauldronNumRows = cauldronLastRow - cauldronStartRow + 1;

  const processedData = cauldronSheet
    .getRange(cauldronStartRow, cauldronStartCol, cauldronNumRows, cauldronNumCols)
    .getValues();

  const outputStartRow = 2;
  const outputStartCol = 1;

  const outputMaxRow = outputSheet.getLastRow();
  if (outputMaxRow >= outputStartRow) {
    const rowsToClear = outputMaxRow - outputStartRow + 1;
    outputSheet
      .getRange(outputStartRow, outputStartCol, rowsToClear, cauldronNumCols)
      .clearContent();
  }

  outputSheet
    .getRange(outputStartRow, outputStartCol, cauldronNumRows, cauldronNumCols)
    .setValues(processedData);
  Logger.log(`[${user}] Step 3 done in ${(new Date() - step3Start) / 1000}s`);

  const endTime = new Date();
  Logger.log(`[${user}] Total time: ${(endTime - startTime) / 1000}s`);
}
