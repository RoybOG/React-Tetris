import React from 'react';
import GameObject from '../classes/gameObject.jsx';
import { BLOCK_PX_SIZE, COLORS } from '../constents';

const Block = React.memo(
  function ({ block_x = 0, block_y = 0, color = 0 }) {
    console.log(`block at (${block_x},${block_y}) rendered`)
    return (
      <GameObject x={BLOCK_PX_SIZE * block_x} y={BLOCK_PX_SIZE * block_y}>
        <div
        className={'block'}
        style={{
          backgroundColor: COLORS[color],
          width: BLOCK_PX_SIZE,
        }}
      ></div>
      </GameObject>
  );
});

export default Block;
