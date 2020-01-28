import React from 'react';
import { Area } from '@magnolia/react-renderer';

const List = props => {

  const { items } = props;

  return (
    <>
    <div className="hint">[LIST]</div>
    <ul className="List">
      {items && <Area content={items} />}
    </ul>
    </>

  );
};

export default List;
