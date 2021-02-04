"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

const { getPositionIndex } = require("./utils");

module.exports = async (logSources, printer) => {
  const mergedEntries = [];
  await Promise.all(
    logSources.map(async (logSource) => {
      let logEntry = await logSource.popAsync();

      while (logEntry) {
        const entryIndex = getPositionIndex(mergedEntries, logEntry.date);
        mergedEntries.splice(entryIndex, 0, logEntry);

        logEntry = await logSource.popAsync();
      }
    })
  ).then(() => mergedEntries.forEach((entry) => printer.print(entry)));

  return new Promise((resolve) => {
    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
