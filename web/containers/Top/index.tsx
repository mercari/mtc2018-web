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
    headerTransparent: true
  };

  public componentDidMount() {
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
          <StyledHeader transparent={this.state.headerTransparent} />
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
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // 100vh以上スクロールしていたら
    // Headerの背景を変更
    if (windowH > scrollY) {
      this.setState({
        headerTransparent: true
      });
    } else {
      this.setState({
        headerTransparent: false
      });
    }
  };
}

const Wrapper = styled.div``;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  > * {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

const StyledArt = styled(Art)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
`;

export default Top;
