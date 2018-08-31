import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../components/styles';

const Footer = () => (
  <Wrapper>
    <Body>
      <Copy>© 2018 Mercari, Inc.</Copy>
    </Body>
  </Wrapper>
);

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
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

  @media screen and (max-width: 767px) {
    padding: 24px 0;
    height: auto;
    flex-direction: column;
  }
`;

const Copy = styled.small`
  ${getTextStyle('display2')};
  font-weight: bold;
  color: ${colors.yuki};
`;

export default Footer;
