import React from 'react';
import { Area } from '@magnolia/react-renderer';

const Basic = props => {
  const { main } = props;

  return (
    <div className="Basic">
      <h2 className="hint">[Basic Page]</h2>
      {main && <Area className="Area" content={main} />}
    </div>
  ) 
};

export default Basic;
