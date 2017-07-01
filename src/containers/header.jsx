import React from 'react';

const Header = ({label, clickHandler}) => {
  return (
    <div>{label}<button onClick={clickHandler}>Click</button></div>


  );
}

export default Header;
