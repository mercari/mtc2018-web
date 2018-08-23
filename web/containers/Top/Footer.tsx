import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../components/styles';

const Footer = () => <Wrapper>Footer</Wrapper>;

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.yuki};
  border-top: 1px solid ${colors.yuki};
  height: 80px;
`;

export default Footer;
