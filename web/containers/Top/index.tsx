import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainVisual from './MainVisual';
import Footer from './Footer';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import ContentSection from './ContentSection';
import AccessSection from './AccessSection';
import Art from './Art';

class Top extends React.Component {
  public state = {
    headerShowBg: false
  };

  public componentDidMount() {
    this.updateHeaderState();
    window.addEventListener('scroll', this.onScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  public render() {
    return (
      <Wrapper>
        <StyledArt />
        <Content>
          <StyledHeader showBg={this.state.headerShowBg} />
          <MainVisual />
          <NewsSection />
          <AboutSection />
          <ContentSection />
          <AccessSection />
          <Footer />
        </Content>
      </Wrapper>
    );
  }

  private onScroll = () => {
    this.updateHeaderState();
  };

  private updateHeaderState = () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    let overScroll = false;

    // 100vh以上スクロールしていたら
    // Headerの背景を変更
    if (windowH > scrollY) {
      overScroll = true;
    }

    // 現状のステートと差分があれば更新
    if (this.state.headerShowBg === overScroll) {
      this.setState({ headerShowBg: !overScroll });
    }
  };
}

const Wrapper = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

const StyledArt = styled(Art)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default Top;
