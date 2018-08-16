import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import { colors } from '../../components/styles';

const MainVisual = () => (
  <Wrapper>
    MainVisual
    <Button>BUY TICKET</Button>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.yuki};
`;

export default MainVisual;
