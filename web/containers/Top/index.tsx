import * as React from 'react';
import styled from 'styled-components';
import axios from '../../utils/axios';
import Default from '../../layout/Default';
import Header from './Header';
import MainVisual from './MainVisual';
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
    const { data } = await axios.get(
      'http://localhost:8080/static/json/contents.json'
    );
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
      <Default>
        <StyledHeader isTopY={isTopY} />
        <MainVisual />
        <Body>
          <NewsSection />
          <AboutSection />
          <ContentSection contents={contents} />
          <StyledTimetableSection contents={contents} />
          <AccessSection />
        </Body>
      </Default>
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

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Body = styled.div`
  padding: 32px 64px 64px;
  box-sizing: border-box;

  > * {
    margin-bottom: 160px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 32px 8px;

    > * {
      margin-bottom: 80px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const StyledTimetableSection = styled(TimetableSection)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default Top;
