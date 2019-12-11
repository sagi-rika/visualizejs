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

    const newString = `${before(id, node)} 
    ${source} 
    ${after(id, node)}`;
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
  const source = JSON.stringify(node.source());
  const loc = JSON.stringify(node.loc);
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

/*
Steps:

1. User writes code, as long as he wishes.
2. We parse the code into an AST.
3. We walk the code recursively, checking node types while doing so.
4. When we want to display something onscreen, we instrument the relevant node by adding code before and after it.
5. The code (which will be executed by a webworker) should use worker.send in order to notify our app of changes (i.e. new Callstack block).
6. When we finish instrumenting every relevant node, we pas the code to a webworker eval.
7. The webworker will run the user's code with our additions, resulting in UI changes while the user's code runs!
8. We should also define plugins for console.logs, DOM queries and Timeouts.

*/
