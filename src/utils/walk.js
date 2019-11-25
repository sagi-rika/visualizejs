/* eslint-disable no-console */
import { simple } from 'acorn-walk';
import { consoleColor } from './consts';

export const astWalk = tree => {
  console.log(tree);
  simple(tree, {
    CallExpression: node => {
      const { arguments: args, callee } = node;

      if (callee.object.name === 'console') {
        if (callee.property.name === 'log') {
          console[callee.property.name](
            `%c VisualizeJS @ ${node.loc.start.line} >`,
            `color: ${consoleColor}`,
            ...args.map(arg => arg.value)
          );
        } else {
          console[callee.property.name](...args.map(arg => arg.value));
        }
      }
    }
  });
};
