import React from 'react';
import { Link } from 'react-router';

const Tab = ({label, linkTo}) => {
  return (
    <Link to={linkTo}>{label}</Link>
  );
};

export default Tab;