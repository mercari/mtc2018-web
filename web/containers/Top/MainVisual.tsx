import * as React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../../components';
import { colors } from '../../components/styles';

const MainVisual = () => (
  <Wrapper>
    <EmptySpace />
    <Date>Oct. 4th, 2018 thu</Date>
    <Place>@Roppongi Academy hills</Place>
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

const Date = styled(Text).attrs({
  level: 'display5'
})`
  margin-bottom: 20px;
`;

const Place = styled(Text).attrs({
  level: 'display3'
})`
  margin-bottom: 64px;
`;

const BuyButton = styled(Button)``;

export default MainVisual;
