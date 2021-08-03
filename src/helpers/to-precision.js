const DOT = '.';

const addZeroes = (amount) => {
  if (amount === 0) {
    return '0';
  }
  return new Array(amount).fill(0).join('');
}

// value without exponent
const toPrecision = (value = '0.0', precision = 0) => {
  const valueNum = Number(value);

  if (Number.isNaN(valueNum) || Number.isNaN(precision) || precision < 0) {
    return value;
  }

  const dotIndex = value.indexOf(DOT);

  if (dotIndex === -1) {
    return `${value}${DOT}${addZeroes(precision)}`;
  }

  let integer = value.substring(0, dotIndex);
  let decimal = value.substring(dotIndex + 1);

  if (precision === 0) {
    return `${integer}${DOT}`;
  }

  if (decimal.length > precision) {
    return `${integer}${DOT}${decimal.substring(0, precision)}...`;
  }

  if (decimal.length < precision) {
    return `${integer}${DOT}${decimal}${addZeroes(precision - decimal.length)}`;
  }

  return value;
};

export default toPrecision;
