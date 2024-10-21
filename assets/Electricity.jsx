import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
const Electricity = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <G fill="none">
      <Circle cx={16} cy={16} r={16} fill="#F90" />
      <G fill="#FFF">
        <Path d="m10.76 27.587 12.666-13.303H15.76z" />
        <Path d="M8 18.27h7.666l7.76-3.986H15.76z" />
        <Path d="M19.51 4 8 18.27h7.666z" />
      </G>
    </G>
  </Svg>
);
export default Electricity;
