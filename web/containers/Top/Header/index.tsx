import * as React from 'react';
import styled from 'styled-components';
import HeaderPC from './HeaderPC';
import HeaderSP from './HeaderSP';

interface Props {
  showBg: boolean;
}

const Header: React.SFC<Props> = props => (
  <div>
    <StyledHeaderPC {...props} />
    <StyledHeaderSP {...props} />
  </div>
);

const StyledHeaderPC = styled(HeaderPC)`
  display: flex;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const StyledHeaderSP = styled(HeaderSP)`
  display: none;
  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

export default Header;
