import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { NamespacesConsumer } from 'react-i18next';
import { colors, getTextStyle } from '../../../components/styles';
import { HamburgerMenu } from '../../../components';
import TwitterShareButton from './TwitterShareButton';
import FacebookShareButton from './FacebookShareButton';
import { isJapan } from '../../../utils';

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
        <img
          onClick={this.onClickLogo}
          src="/2018/static/images/header_logo.svg"
          alt="mercari tech conf 2018"
        />
        <EmptySpace />
        <HamburgerMenu active={this.state.showMenu} onClick={this.toggleMenu} />
        <Menu show={this.state.showMenu} onClick={this.toggleMenu}>
          <NavButton href="/2018#news" onClick={this.onClickNav}>
            NEWS
          </NavButton>
          <NavButton href="/2018#about" onClick={this.onClickNav}>
            ABOUT
          </NavButton>
          <NavButton href="/2018#contents" onClick={this.onClickNav}>
            CONTENTS
          </NavButton>
          <NavButton href="/2018#exhibition" onClick={this.onClickNav}>
            EXHIBITION
          </NavButton>
          <NavButton href="/2018#access" onClick={this.onClickNav}>
            ACCESS
          </NavButton>
          <SNS>
            <TwitterShareButton />
            <FacebookShareButton />
          </SNS>
          <NamespacesConsumer ns={['common']}>
            {(_, { i18n }) => {
              const isJa = isJapan(i18n.language);
              const onClick = () => {
                i18n.changeLanguage(isJa ? 'en-US' : 'ja-JP');
                this.onClickNav();
              };
              return (
                <NavButton onClick={onClick}>
                  {isJa ? 'ENGLISH' : 'JAPANESE'}
                </NavButton>
              );
            }}
          </NamespacesConsumer>
        </Menu>
      </Wrapper>
    );
  }

  private onClickLogo = () => {
    Router.push('/2018').then(() => window.scrollTo(0, 0));
  };

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
