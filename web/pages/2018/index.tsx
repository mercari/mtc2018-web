import * as React from 'react';
import styled from 'styled-components';
import Default from '../../layout/Default';
import Header from '../../containers/Top/Header';
import MainVisual from '../../containers/Top/MainVisual';
import NewsSection from '../../containers/Top/NewsSection';
import AboutSection from '../../containers/Top/AboutSection';
import ContentSection from '../../containers/Top/ContentSection';
import TimetableSection, {
  TIMETABLE_SECTION_FRAGMENT
} from '../../containers/Top/TimetableSection';
import AccessSection from '../../containers/Top/AccessSection';
import { withI18next } from '../../lib/with-i18next';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Top as TopQuery } from '../../graphql/generated/Top';
import { NEWS_LIST_FRAGMENT } from '../../containers/Top/NewsSection/NewsList';
import { CONTENT_GRID_FRAGMENT } from '../../containers/Top/ContentSection/ContentGrid';

export const TOP_QUERY = gql`
  query Top {
    ...NewsListFragment
    ...ContentGridFragment
    ...TimetableSectionFragment
  }
  ${NEWS_LIST_FRAGMENT}
  ${CONTENT_GRID_FRAGMENT}
  ${TIMETABLE_SECTION_FRAGMENT}
`;

class TopQueryComponent extends Query<TopQuery> {}

interface State {
  isTopY: boolean;
}

class Top extends React.Component<{}, State> {
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
      <Default>
        <StyledHeader isTopY={isTopY} />
        <MainVisual />
        <Body>
          <TopQueryComponent query={TOP_QUERY}>
            {({ loading, error, data }) => {
              if (error) {
                return null;
              }
              if (loading || !data || !data.newsList) {
                return null;
              }

              return (
                <>
                  <NewsSection gqlData={data} />
                  <AboutSection />
                  <ContentSection gqlData={data} />
                  <StyledTimetableSection gqlData={data} />
                </>
              );
            }}
          </TopQueryComponent>
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
  width: 100%;
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

export default withI18next()(Top);
