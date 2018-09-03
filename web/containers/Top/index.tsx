import * as React from 'react';
import styled from 'styled-components';
import axios from '../../utils/axios';
import Header from './Header';
import MainVisual from './MainVisual';
import Footer from './Footer';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import ContentSection from './ContentSection';
import TimetableSection from './TimetableSection';
import AccessSection from './AccessSection';
import { Content } from '../../types';

interface Props {
  contents: Content[];
}

interface State {
  isTopY: boolean;
}

class Top extends React.Component<Props, State> {
  public static async getInitialProps() {
    const { data } = await axios.get('/static/json/contents.json');
    return { contents: data.sessions };
  }

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
    const { contents } = this.props;
    const { isTopY } = this.state;
    return (
      <Wrapper>
        <Body>
          <StyledHeader isTopY={isTopY} />
          <MainVisual />
          <NewsSection />
          <AboutSection />
          <ContentSection contents={contents} />
          <StyledTimetableSection contents={contents} />
          <AccessSection />
          <Footer />
        </Body>
      </Wrapper>
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

const Wrapper = styled.div`
  position: relative;
`;

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

const StyledTimetableSection = styled(TimetableSection)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default Top;
