import React from 'react';
import { Area } from '@magnolia/react-editor';

const Basic = props => {
  const { main, extras, title } = props;

  return (
    <div className="Basic">
      <div className="hint">[Basic Page]</div>
      <h1>{title || props.metadata['@name']}</h1>

      <main>
        <div className="hint">[Main Area]</div>         
        {main && <Area className="Area" content={main} />}  
      </main>

      <div className="Extras" >
        <div className="hint">[Sercondary Area]</div>
        {extras && <Area className="Area" content={extras} />}  
        {/* <button>Contact</button> */}
      </div>    
    </div>
  ) 
};

export default Basic;
