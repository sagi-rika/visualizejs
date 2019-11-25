import { simple } from 'acorn-walk';

export const astWalk = tree => {
  console.log(tree);
  simple(tree, {
    Literal(node) {
      console.log(`Found a literal: ${node.value}`);
    }
  });
};
