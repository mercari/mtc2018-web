import * as React from 'react';
import styled from 'styled-components';
import { getTextStyle } from '../../components/Text';
import { colors } from '../../components/styles';

const Footer = () => (
  <Wrapper>
    <Body>
      <Copy>© 2018 Mercari, Inc.</Copy>
      <EmptySpace />
      <Link href="#">mercari Tech Conf 2017</Link>
      <Link href="#">お問い合わせ</Link>
    </Body>
  </Wrapper>
);

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  color: ${colors.yuki};
  border-top: 1px solid ${colors.yuki};
`;

const Body = styled.div`
  width: 100%;
  max-width: 920px;
  padding: 0 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const Copy = styled.small`
  ${getTextStyle('display2')};
  font-weight: bold;
`;

const Link = styled.a`
  ${getTextStyle('display1')};
  color: ${colors.yuki};
  text-decoration: none;
  margin-left: 60px;
`;

export default Footer;
