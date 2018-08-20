import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import { colors } from '../../components/styles';

const MainVisual = () => (
  <Wrapper>
    <EmptySpace />
    <BuyButton>BUY TICKET</BuyButton>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.yuki};
  padding: 128px;

  box-sizing: border-box;
`;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const BuyButton = styled(Button)``;

export default MainVisual;
