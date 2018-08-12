import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../components/styles';

const Footer = () => <Wrapper>Footer</Wrapper>;

const Wrapper = styled.footer`
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.yuki};
  padding: 64px;
`;

export default Footer;
