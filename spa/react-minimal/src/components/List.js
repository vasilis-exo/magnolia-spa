import React from 'react';
import { Area } from '@magnolia/react-renderer';

const List = props => {

  const { items } = props;

  //return  <div>(DISABLED LIST)</div>
  return (
    <ul className="List">
    (LIST)
    {items && <Area content={items} />}
    </ul>
  );
  //return <ul className="List">{items && <Area {...items} />}</ul>;
};

export default List;
