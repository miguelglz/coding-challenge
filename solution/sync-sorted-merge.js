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
  const logEntries = [];
  let logEntry = logSources.pop();
  while (logEntry) {
    const newIndex = getPositionIndex(logEntries, logEntry.last.date);
    logEntries.splice(newIndex, 0, logEntry.last);
    logEntry = logSources.pop();
  }
  logEntries.forEach((logEntry) => {
    printer.print(logEntry);
  });
  return printer.done();
};
