import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Hamburger = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M18 16H2a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4Zm0-8H2a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4ZM2 4h16a2 2 0 0 0 0-4H2a2 2 0 0 0 0 4Z"
    />
  </Svg>
);
export default Hamburger;
