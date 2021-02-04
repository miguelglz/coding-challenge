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

module.exports = {
  getPositionIndex,
};
