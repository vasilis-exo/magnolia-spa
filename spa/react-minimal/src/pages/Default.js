import React from 'react';
import { Area } from '@magnolia/react-renderer';

const Default = props => {
  const { main } = props;

  return (
    <div className="Default">
      <h2 className="hint">[Default Page]</h2>
      {main && <Area className="Area" content={main} />}
    </div>
  ) 
};

export default Default;
