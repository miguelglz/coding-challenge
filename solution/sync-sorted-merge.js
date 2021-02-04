"use strict";

// Print all entries, across all of the sources, in chronological order.

const { getPositionIndex } = require("./utils");

module.exports = (logSources, printer) => {
  const mergedEntries = [];

  logSources.forEach((logSource) => {
    let logEntry = logSource.pop();

    while (logEntry) {
      const entryIndex = getPositionIndex(mergedEntries, logEntry.date);
      mergedEntries.splice(entryIndex, 0, logEntry);

      logEntry = logSource.pop();
    }
  });

  mergedEntries.forEach((entry) => {
    printer.print(entry);
  });

  printer.done();
  return console.log("Sync sort complete.");
};
