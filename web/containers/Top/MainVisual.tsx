import * as React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../../components';
import { colors, getTextStyle } from '../../components/styles';

const MainVisual = () => (
  <Wrapper>
    <EmptySpace>
      <Logo />
    </EmptySpace>
    <Date>Oct. 4th, 2018 thu</Date>
    <Place>@ROPPONGI ACADEMYHILLS</Place>
    <BuyButton
      type="primary"
      size="large"
      href="https://mercari-tech-conf-2018.peatix.com"
      target="_black"
    >
      BUY TICKET
    </BuyButton>
    <BottomArrow />
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  min-height: 768px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7.8vh; /* 60 / 768 */
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    height: 520px;
    min-height: 0;
    padding: 16px;
    margin-top: 60px;
  }
`;

const EmptySpace = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img.attrs({
  src: '../../static/images/logo.svg'
})`
  width: 280px;
  height: 134px;

  @media screen and (max-width: 767px) {
    width: 200px;
    height: 96px;
  }
`;

const Date = styled(Text)`
  ${getTextStyle('display5')};
  margin-bottom: 2.6vh; /* 20 / 768 */
  color: ${colors.yuki};

  @media screen and (max-width: 350px) {
    font-size: 30px;
  }
`;

const Place = styled(Text)`
  ${getTextStyle('display2')};
  margin-bottom: 8.3vh; /* 64 / 768 */
  color: ${colors.yuki};

  @media screen and (max-width: 767px) {
    ${getTextStyle('display1')};
    color: ${colors.yuki};
  }
`;

const ButtonLink = Button.withComponent('a');
const BuyButton = styled(ButtonLink)`
  text-decoration: none;
  margin-bottom: 9.3vh; /* 72 / 768 */
`;

const BottomArrow = styled.img.attrs({
  src: '../../static/images/arrow_bottom.svg'
})`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default MainVisual;
