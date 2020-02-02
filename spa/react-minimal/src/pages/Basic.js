import React from 'react';
import { Area } from '@magnolia/react-renderer';

const Basic = props => {
  const { main } = props;

  return (
    <div className="Basic">
      <div className="hint">[Basic Page]</div>
 
      <main>
        <div className="hint">[Main Area]</div>         
        {main && <Area className="Area" content={main} />}  
      </main>

      <footer >
        <div className="hint">[Footer Area]</div>
        {main && <Area className="Area" content={main} />}  
        <button todoImplement>Contact</button>
      </footer>    
    </div>
  ) 
};

export default Basic;
