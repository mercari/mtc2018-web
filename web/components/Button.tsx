import * as React from 'react';
import styled from 'styled-components';
import { colors } from './styles';

const Button = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.yuki};
  border: none;
  font-size: 20px;
  height: 64px;
  padding: 0 48px;
  border-radius: 32px;
`;

export default Button;
