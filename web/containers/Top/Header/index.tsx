import * as React from 'react';
import styled from 'styled-components';
import HeaderPC from './HeaderPC';
import HeaderSP from './HeaderSP';

interface State {
  isTopY: boolean;
}

class Header extends React.Component<{}, State> {
  public state = {
    isTopY: false
  };

  public componentDidMount() {
    this.updateHeaderState();
    window.addEventListener('scroll', this.onScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  public render() {
    const { isTopY } = this.state;
    return (
      <>
        <StyledHeaderPC isTopY={isTopY} {...this.props} />
        <StyledHeaderSP isTopY={isTopY} {...this.props} />
      </>
    );
  }

  private onScroll = () => {
    this.updateHeaderState();
  };

  private updateHeaderState = () => {
    const scrollY = window.scrollY;
    const windowH = 300;
    let overScroll = false;

    // 100vh以上スクロールしていたら
    // Headerの背景を変更
    if (windowH > scrollY) {
      overScroll = true;
    }

    // 現状のステートと差分があれば更新
    if (this.state.isTopY === overScroll) {
      this.setState({ isTopY: !overScroll });
    }
  };
}

const StyledHeaderPC = styled(HeaderPC)`
  display: flex;
  @media screen and (max-width: 1120px) {
    display: none;
  }
`;

const StyledHeaderSP = styled(HeaderSP)`
  display: none;
  @media screen and (max-width: 1120px) {
    display: flex;
  }
`;

export default Header;
