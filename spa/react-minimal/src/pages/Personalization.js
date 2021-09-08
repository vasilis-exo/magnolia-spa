import React from "react";
import { EditableArea } from '@magnolia/react-editor';
import AgeForm from "../components/AgeForm";

function Personalization(props) {
  const { main, title } = props;

  return (
    <div className="Basic">
      <div className="hint">[Basic Page]</div>
      <h1>{title || props.metadata['@name']}</h1>
      <AgeForm></AgeForm>

      <main>
        <div className="hint">[Main Area]</div>
        {main && <EditableArea className="Area" content={main} />}  
      </main>
      <div>
        <p className="note"><i className="info-icon"></i>Not supported on Community Edition. Only works on DX CORE</p>
      </div>
    </div>
  )
}

export default Personalization;
