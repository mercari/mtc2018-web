import * as React from 'react';
import styled from 'styled-components';
import { getTextStyle } from '../../components/Text';
import { colors } from '../../components/styles';

interface Props {
  transparent: boolean;
}

const Header: React.SFC<Props> = ({ transparent, ...props }) => (
  <Wrapper transparent={transparent} {...props}>
    <Logo />
    <EmptySpace />
    <NavButton href="#news">NEWS</NavButton>
    <NavButton href="#about">ABOUT</NavButton>
    <NavButton href="#contents">CONTENTS</NavButton>
    <NavButton href="#time_table">TIME TABLE</NavButton>
    <NavButton href="#access">ACCESS</NavButton>
    <SNS>
      <CircleIcon />
      <CircleIcon />
    </SNS>
    {/* <LangButton>ENGLISH</LangButton> */}
  </Wrapper>
);
Header.defaultProps = {
  transparent: false
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  color: ${colors.yuki};
  padding: 0 40px;
  box-sizing: border-box;
  transition: 300ms;
  z-index: 50;

  background-color: ${(props: { transparent: boolean }) =>
    props.transparent ? 'transparent' : 'rgba(18, 28, 59, 0.8)'};
`;

const Logo = styled.img.attrs({
  src: '../../static/images/logo.svg'
})``;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const NavButton = styled.a`
  ${getTextStyle('display1')};
  margin-left: 24px;
  text-decoration: none;
  color: ${colors.yuki};
  line-height: 36px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    display: inline-block;
    width: 0%;
    height: 1px;
    transform: translateX(-50%);
    background-color: ${colors.yuki};
    transition-duration: 300ms;
  }

  &:hover {
    &:before {
      width: 70%;
    }
  }
`;

const SNS = styled.div`
  margin-left: 40px;
`;

const CircleIcon = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  border: 1px solid ${colors.yuki};
  box-sizing: border-box;
  border-radius: 50%;
  margin-left: 20px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
`;

// const LangButton = styled.div`
//   ${getTextStyle('display1')};
//   height: 40px;
//   background-color: transparent;
//   border: none;
//   border: 1px solid ${colors.yuki};
//   box-sizing: border-box;
//   border-radius: 20px;
//   margin-left: 20px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0 24px;
//   margin-left: 40px;
// `;

export default Header;
