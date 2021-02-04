"use strict";
// Print all entries, across all of the sources, in chronological order.

function getPositionIndex(array, value) {
  let low = 0;
  let high = array.length;

  while (low < high) {
    let mid = (low + high) >>> 1;
    if (array[mid].date < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

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

  return printer.done();
};
