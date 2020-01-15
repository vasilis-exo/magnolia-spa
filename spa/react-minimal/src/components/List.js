import React from 'react';
import { Area } from 'react-magnolia';

const List = props => {
  const { items } = props;

  return <ul className="List">{items && <Area {...items} />}</ul>;
};

export default List;
