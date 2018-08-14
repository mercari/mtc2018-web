import * as React from 'react';
import styled from 'styled-components';
import { getTextStyle } from '../../components/Text';
import { colors } from '../../components/styles';

const Header: React.SFC<{}> = props => (
  <Wrapper {...props}>
    <EmptySpace />
    <NavButton href="#news">NEWS</NavButton>
    <NavButton href="#about">ABOUT</NavButton>
    <NavButton href="#contents">CONTENTS</NavButton>
    <NavButton href="#access">ACCESS</NavButton>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  color: ${colors.yuki};
  padding: 0 24px;
  box-sizing: border-box;
`;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const NavButton = styled.a`
  ${getTextStyle('display2')} margin-left: 24px;
  text-decoration: none;
  color: ${colors.yuki};
`;

export default Header;
