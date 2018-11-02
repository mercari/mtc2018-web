import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../../components';
import { getTextStyle } from '../../../components/styles';
import ContentsList from './ContentsList';
import { NamespacesConsumer } from 'react-i18next';
import { Exhibition } from '../../../types';
import CafeMap from './CafeMap';
import StudioMap from './StudioMap';

interface State {
  currentNo: number | null;
}

class ExhibitionSection extends React.Component<{}, State> {
  public state = {
    currentNo: null
  };

  public render() {
    return (
      <NamespacesConsumer ns={['common']}>
        {t => {
          const { currentNo } = this.state;

          const exhibitions: Exhibition[] = t('exhibitions', {
            returnObjects: true
          });

          const cafeExhibitions = exhibitions.filter(exhibition => {
            return exhibition.place === 'l';
          });

          const studioExhibitions = exhibitions.filter(exhibition => {
            return exhibition.place === 's';
          });

          return (
            <Section title="EXHIBITION" id="exhibition">
              <Wrapper>
                <MarkList>
                  <MarkListItem>
                    <span>
                      <img
                        src="../../../static/images/booth_circle.svg"
                        alt=""
                      />
                    </span>
                    Booth
                  </MarkListItem>
                  <MarkListItem>
                    <span>
                      <img src="../../../static/images/plug.svg" alt="" />
                    </span>
                    Power
                  </MarkListItem>
                  <MarkListItem>
                    <span>
                      <img src="../../../static/images/tea_mug.svg" alt="" />
                    </span>
                    Cafespace
                  </MarkListItem>
                </MarkList>
                <Place>
                  <Map>
                    <CafeMap
                      currentNo={currentNo}
                      onHoverItem={this.onHoverItem}
                      onBlurItem={this.onBlurItem}
                    />
                  </Map>
                  <ContentsList
                    place="Booth A"
                    currentNo={currentNo}
                    exhibitions={cafeExhibitions}
                    onHoverItem={this.onHoverItem}
                    onBlurItem={this.onBlurItem}
                  />
                </Place>
                <Place>
                  <StudioLeft>
                    <ContentsList
                      place="Booth B"
                      currentNo={currentNo}
                      exhibitions={studioExhibitions}
                      onHoverItem={this.onHoverItem}
                      onBlurItem={this.onBlurItem}
                    />
                    <AskTheSpeaker>
                      {t('askTheSpeaker.title')}
                      <br />
                      {t('askTheSpeaker.body')}
                    </AskTheSpeaker>
                  </StudioLeft>
                  <Map>
                    <StudioMap
                      currentNo={currentNo}
                      onHoverItem={this.onHoverItem}
                      onBlurItem={this.onBlurItem}
                    />
                  </Map>
                </Place>
              </Wrapper>
            </Section>
          );
        }}
      </NamespacesConsumer>
    );
  }

  private onHoverItem = (no: number) => {
    this.setState({ currentNo: no });
  };

  private onBlurItem = () => {
    this.setState({ currentNo: null });
  };
}

const Wrapper = styled(Card)`
  width: 100%;
  max-width: 920px;
  padding: 60px;

  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }

  > * {
    margin-bottom: 60px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Place = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px;

  > * {
    margin-right: 60px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 0;

    > * {
      margin-right: 0;
    }
  }
`;

const Map = styled.div`
  flex-shrink: 0;
  padding: 20px;

  > svg {
    width: 100%;
    max-height: 100%;
  }
`;

const AskTheSpeaker = styled(Text).attrs({
  level: 'body'
})`
  width: 100%;
  margin-top: 20px;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const MarkList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 0 60px;
  padding: 0;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    margin: 0 0 20px;
  }
`;

const MarkListItem = styled.li`
  ${getTextStyle('display3')} display: flex;
  align-items: center;
  margin-right: 40px;

  span {
    width: 30px;
    display: flex;
    align-items: center;
  }

  &:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StudioLeft = styled.div`
  width: 100%;
`;

export default ExhibitionSection;
