/* eslint-disable */
import falafel from 'falafel';
import * as acorn from 'acorn';
import stringify from './stringify';

const instruments = {
  ExpressionStatement: (id, node) => {
    node.update(`${node.source()}`);
  },
  CallExpression: (id, node, before, after) => {
    let source = node.source();

    if (node.callee.source() === 'console.log') {
      source = `_console.log(${node.loc.start.line}, ${node.arguments
        .map(arg => arg.source())
        .join(', ')})`;
    }

    let newString;

    // If function has no block (no parentheses)
    if (node.parent.type === 'ArrowFunctionExpression') {
      newString = `{${before(id, node)} 
      ${source} 
      ${after(id, node)}}`;
    } else {
      newString = `${before(id, node)} 
      ${source} 
      ${after(id, node)}`;
    }

    node.update(newString);
  },
  BinaryExpression: (id, node, before, after) => {
    const newString = `${before(id, node)} ${after(id, node)} ${node.source()}`;
    node.update(newString);
  }
};

const isInstrumentable = node => !!instruments[node.type];

const instrumentNode = (id, node, before, after) => {
  instruments[node.type](id, node, before, after);
};

const before = (id, node) => {
  let source = JSON.stringify(node.source());
  const loc = JSON.stringify(node.loc);

  if (node.type === 'CallExpression') {
    node.arguments.forEach(argNode => {
      if (['ArrowFunctionExpression', 'FunctionExpression'].includes(argNode.type)) {
        source = `'${node.callee.name}(${argNode.id ? argNode.id.name : 'anonymous'}())'`;
      }
    });
  }

  return stringify(
    (id, type, source, loc) => {
      boss.send('node:before', { id: $id$, type: '$type$', source: $source$, loc: $loc$ }), delay();
    },
    id,
    node.type,
    source,
    loc
  );
};

const after = (id, node) => {
  return stringify(id => {
    boss.send('node:after', { id: $id$ }), delay();
  }, id);
};

export default code => {
  const insertionPoints = [];
  let id = 1;
  const instrumented = falafel(code, { parser: acorn, locations: true, range: true }, node => {
    if (node.type === 'Program') console.log(node);
    if (!isInstrumentable(node)) return;
    insertionPoints.push({
      id,
      type: 'start',
      loc: node.loc.start
    });
    insertionPoints.push({
      id,
      type: 'end',
      loc: node.loc.end
    });
    instrumentNode(id, node, before, after);
    id++;
  });

  insertionPoints.sort((a, b) =>
    a.loc.line === b.loc.line ? a.loc.column - b.loc.column : a.loc.line - b.loc.line
  );

  return {
    code: instrumented,
    insertionPoints
  };
};
