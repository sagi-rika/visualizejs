/* eslint-disable no-console */
import falafel from 'falafel';
import * as acorn from 'acorn';
import stringify from './stringify';

export const astWalk = code => {
  const instrumented = falafel(code, { parser: acorn, locations: true, range: true }, node => {
    console.log(node.type);
  });
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
