import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../../components/styles';
import TwitterShareButton from './TwitterShareButton';
import FacebookShareButton from './FacebookShareButton';
import LanguageToggleButton from './LanguageToggleButton';

interface Props {
  isTopY: boolean;
}

class HeaderPC extends React.Component<Props> {
  public render() {
    const { isTopY, ...props } = this.props;
    return (
      <Wrapper showBg={isTopY} {...props}>
        <Logo onClick={this.onClickLogo} />
        <EmptySpace />
        <Nav>
          <NavButton href="/2018#news">NEWS</NavButton>
          <NavButton href="/2018#about">ABOUT</NavButton>
          <NavButton href="/2018#contents">CONTENTS</NavButton>
          <NavButton href="/2018#timetable">TIME TABLE</NavButton>
          <NavButton href="/2018#exhibition">EXHIBITION</NavButton>
          <NavButton href="/2018#access">ACCESS</NavButton>
          <SNS>
            <TwitterShareButton />
            <FacebookShareButton />
          </SNS>
          <StyledLangButton />
        </Nav>
      </Wrapper>
    );
  }

  private onClickLogo = () => {
    window.scrollTo(0, 0);
  };
}

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
  background-color: ${(props: { showBg: boolean }) =>
    props.showBg ? colors.primaryAlpha : 'transparent'};
`;

const Logo = styled.img.attrs({
  src: '/2018/static/images/header_logo.svg',
  alt: 'mercari tech conf 2018'
})`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
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
  display: flex;

  > * {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const StyledLangButton = styled(LanguageToggleButton)`
  margin-left: 36px;
`;

export default HeaderPC;
