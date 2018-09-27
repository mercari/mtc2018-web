import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../../components';
import { getTextStyle } from '../../../components/styles';
import ContentsList from './ContentsList';
import { I18n } from 'react-i18next';
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
      <I18n>
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
                <Message>
                  ちょっとした素敵な文言が入ります。ちょっとした素敵な文言が入ります。ちょっとした素敵な文言が入ります。ちょっとした素敵な文言が入ります。ちょっとした素敵な文言が入ります。
                </Message>
                <MarkList>
                  <MarkListItem>
                    <img src="../../../static/images/booth_circle.svg" alt="" />
                    Booth
                  </MarkListItem>
                  <MarkListItem>
                    <img src="../../../static/images/plug.svg" alt="" />
                    Power
                  </MarkListItem>
                  <MarkListItem>
                    <img src="../../../static/images/tea_mug.svg" alt="" />
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
                    place="Library Cafe"
                    currentNo={currentNo}
                    exhibitions={cafeExhibitions}
                    onHoverItem={this.onHoverItem}
                    onBlurItem={this.onBlurItem}
                  />
                </Place>
                <Place>
                  <div>
                    <ContentsList
                      place="Sky Studio"
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
                  </div>
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
      </I18n>
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

const Message = styled(Text).attrs({
  level: 'display2'
})`
  margin-bottom: 60px;
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
`;

const Map = styled.div`
  flex-shrink: 0;
`;

const AskTheSpeaker = styled(Text).attrs({
  level: 'body'
})`
  margin-top: 20px;
`;

const MarkList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0 0 60px;
  padding: 0;
`;

const MarkListItem = styled.li`
  ${getTextStyle('display3')} display: flex;
  align-items: center;
  margin-right: 40px;

  img {
    margin-right: 14px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export default ExhibitionSection;
