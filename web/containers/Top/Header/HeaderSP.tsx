import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../../components/styles';
import { HamburgerMenu } from '../../../components';
import TwitterShareButton from './TwitterShareButton';
import FacebookShareButton from './FacebookShareButton';

interface Props {
  isTopY: boolean;
}

interface State {
  showMenu: boolean;
}

class Header extends React.Component<Props, State> {
  public static defaultProps = {
    isTopY: false
  };

  public state = {
    showMenu: false
  };

  public render() {
    const { isTopY, ...props } = this.props;
    const { showMenu } = this.state;
    return (
      <Wrapper show={isTopY || showMenu} {...props}>
        <Logo />
        <EmptySpace />
        <HamburgerMenu active={this.state.showMenu} onClick={this.toggleMenu} />
        <Menu show={this.state.showMenu} onClick={this.toggleMenu}>
          <NavButton href="#news" onClick={this.onClickNav}>
            NEWS
          </NavButton>
          <NavButton href="#about" onClick={this.onClickNav}>
            ABOUT
          </NavButton>
          <NavButton href="#contents" onClick={this.onClickNav}>
            CONTENTS
          </NavButton>
          <NavButton href="#access" onClick={this.onClickNav}>
            ACCESS
          </NavButton>
          <SNS>
            <TwitterShareButton />
            <FacebookShareButton />
          </SNS>
        </Menu>
      </Wrapper>
    );
  }

  private toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  private onClickNav = () => {
    this.setState({
      showMenu: false
    });
  };
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 8px 0 20px;
  box-sizing: border-box;
  transition: 300ms;
  z-index: 50;
  pointer-events: ${(props: { show: boolean }) =>
    props.show ? 'auto' : 'none'};
  opacity: ${(props: { show: boolean }) => (props.show ? '1' : '0')};
  background-color: ${colors.primaryAlpha};
`;

const Logo = styled.img.attrs({
  src: '../../static/images/header_logo.svg'
})``;

const EmptySpace = styled.div`
  flex-grow: 1;
`;

const Menu = styled.div`
  visibility: ${(props: { show: boolean }) =>
    props.show ? 'visible' : 'hidden'};
  opacity: ${(props: { show: boolean }) => (props.show ? '1' : '0')};
  flex-direction: column;
  align-items: center;
  display: flex;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.primaryAlpha};
  transition: 300ms;
`;

const NavButton = styled.a`
  ${getTextStyle('display3')};
  text-decoration: none;
  color: ${colors.yuki};
  position: relative;
  padding: 20px;
`;

const SNS = styled.div`
  display: flex;
  padding: 16px;

  > * {
    margin-right: 24px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Header;
