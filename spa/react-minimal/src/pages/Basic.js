import React from 'react';
import { Area } from '@magnolia/react-editor';

const Basic = props => {
  const { main, secondary } = props;

  return (
    <div className="Basic">
      <div className="hint">[Basic Page]</div>
 
      <main>
        <div className="hint">[Main Area]</div>         
        {main && <Area className="Area" content={main} />}  
      </main>

      <div className="Secondary" >
        <div className="hint">[Sercondary Area]</div>
        {secondary && <Area className="Area" content={secondary} />}  
        <button>Contact</button>
      </div>    
    </div>
  ) 
};

export default Basic;
