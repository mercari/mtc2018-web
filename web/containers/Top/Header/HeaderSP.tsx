import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../../components/styles';
import { HamburgerMenu } from '../../../components';

interface Props {
  showBg: boolean;
}

interface State {
  showMenu: boolean;
}

class Header extends React.Component<Props, State> {
  public static defaultProps = {
    showBg: false
  };

  public state = {
    showMenu: false
  };

  public render() {
    const { showBg, ...props } = this.props;
    const { showMenu } = this.state;
    return (
      <Wrapper showBg={showBg || showMenu} {...props}>
        <Logo />
        <EmptySpace />
        <HamburgerMenu
          active={this.state.showMenu}
          onClick={this.onClickMenu}
        />
        <Menu show={this.state.showMenu}>
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
        </Menu>
      </Wrapper>
    );
  }

  private onClickMenu = () => {
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
  padding: 0 20px;
  box-sizing: border-box;
  transition: 300ms;
  z-index: 50;
  background-color: ${(props: { showBg: boolean }) =>
    props.showBg ? 'rgba(18, 28, 59, 0.8)' : 'transparent'};
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
  background: rgba(18, 28, 59, 0.8);
  transition: 300ms;
`;

const NavButton = styled.a`
  ${getTextStyle('display3')};
  text-decoration: none;
  color: ${colors.yuki};
  position: relative;
  padding: 20px;
`;

export default Header;
