import React from 'react';
import { Area } from 'react-magnolia';

const Default = props => {
  const { main } = props;

  return <div className="Default">{main && <Area className="Area" {...main} />}</div>;
};

export default Default;
