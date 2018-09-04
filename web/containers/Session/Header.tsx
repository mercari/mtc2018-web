import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '../../components/styles';

const Header: React.SFC<{}> = props => (
  <Wrapper {...props}>
    <Link prefetch={true} href="/2018">
      <Logo />
    </Link>
    <EmptySpace />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  color: ${colors.yuki};
  padding: 0 40px;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    height: 60px;
    padding: 0 8px 0 20px;
    z-index: 50;
  }
`;

const Logo = styled.img.attrs({
  src: '../../static/images/header_logo.svg'
})`
  cursor: pointer;
`;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

export default Header;
