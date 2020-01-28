import React from 'react';
import { Area } from '@magnolia/react-renderer';

const Contact = props => {
  const { main } = props;
  const boxStyle = {
    background: '#eaf7f5',
    padding: '20px'
  };

  return (
    <div className="Contact">
      <h2  className="hint">[Contact Page]</h2>
      <div className="box" style={boxStyle}>
        <h1>Nulla vitae elit libero, a pharetra augue.</h1>
      </div>
      {main && <Area content={main} />}
    </div>
  );
};

export default Contact;
