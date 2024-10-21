import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Water = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <Path fill="#E5F1FF" d="M32 512a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" />
    <Path
      fill="#9FC8FE"
      d="M512 179.2c-96 102.4-262.4 236.8-262.4 384S364.8 825.6 512 825.6s262.4-115.2 262.4-262.4-160-281.6-262.4-384z"
    />
    <Path
      fill="#72AEFD"
      d="M512 684.8c-57.6 0-102.4-44.8-102.4-108.8 0-57.6 64-102.4 102.4-147.2 38.4 44.8 102.4 89.6 102.4 147.2 0 57.6-44.8 108.8-102.4 108.8z"
    />
  </Svg>
);
export default Water;
