import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Cross = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="m18.8 16 5.5-5.5c.8-.8.8-2 0-2.8-.3-.4-.8-.7-1.3-.7s-1 .2-1.4.6L16 13.2l-5.5-5.5c-.8-.8-2.1-.8-2.8 0-.4.3-.7.8-.7 1.4s.2 1 .6 1.4l5.5 5.5-5.5 5.5c-.3.4-.6.9-.6 1.5 0 .5.2 1 .6 1.4.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l5.5-5.5 5.5 5.5c.8.8 2.1.8 2.8 0 .8-.8.8-2.1 0-2.8L18.8 16z" />
  </Svg>
);
export default Cross;
