import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../components';
import { colors, getTextStyle } from '../../components/styles';

const MainVisual = () => (
  <Wrapper>
    <EmptySpace />
    <Logo />
    <EmptySpace />
    <Date>Oct. 4th, 2018 thu</Date>
    <Place>@ROPPONGI ACADEMYHILLS</Place>
    <EmptySpace />
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
  src: '../../static/images/logo.svg',
  alt: 'mercari tech conf 2018'
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
  color: ${colors.yuki};

  @media screen and (max-width: 767px) {
    ${getTextStyle('display1')};
    color: ${colors.yuki};
  }
`;

const BottomArrow = styled.img.attrs({
  src: '../../static/images/arrow_bottom.svg'
})`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default MainVisual;
