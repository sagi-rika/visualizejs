const min = arr => Math.min(arr);

const REGEXES = {
  functionOpening: /^function\s*\((.*)\)[^{]{/,
  arrowFnOpening: /^\(?([^)\n]*)\)?\s*=>\s*{?/
};

const isArrowFn = fnStr => fnStr.includes('=>');

const getArgumentNames = str => {
  let argStr;
  argStr = isArrowFn(str)
    ? str.match(REGEXES.arrowFnOpening)
    : (argStr = str.match(REGEXES.functionOpening));
  return argStr[1].split(',').map(s => s.trim());
};

const removeFunctionWrapper = str => {
  // remove opening function bit
  str = isArrowFn(str)
    ? str.replace(REGEXES.arrowFnOpening, '')
    : str.replace(REGEXES.functionOpening, '');

  // remove closing function brace
  const closingBraceIdx = str.lastIndexOf('}');
  if (closingBraceIdx > 0) {
    str = str.slice(0, closingBraceIdx - 1);
  }

  // If there was no code on opening wrapper line, remove it
  str = str.replace(/^[^\S\n]*\n/, '');

  // If there was no code on final line, remove it
  const finalNewlineIdx = str.lastIndexOf('\n');
  const lastLine = str.slice(finalNewlineIdx);
  if (lastLine.trim() === '') str = str.slice(0, finalNewlineIdx);

  return str;
};

// Reset indent on the code to minimum possible
const dedent = str => {
  let lines = str.split('\n');
  const indent = min(lines.map(line => line.match(/^\s*/)[0].length));
  lines = lines.map(line => line.slice(indent));
  return lines.join('\n');
};

const interpolate = (str, argNames, args) => {
  argNames.forEach((name, i) => {
    const regex = new RegExp(`\\$${name}\\$`, 'g');
    str = str.replace(regex, args[i]);
  });
  return str;
};

module.exports = (fn, ...interpolateArgs) => {
  let str = fn.toString();
  let argNames;
  if (interpolateArgs.length) {
    argNames = getArgumentNames(str);
  }
  str = removeFunctionWrapper(str);
  str = dedent(str);
  if (argNames && argNames.length) {
    str = interpolate(str, argNames, interpolateArgs);
  }
  return str;
};
