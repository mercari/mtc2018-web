import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../../components';
import ContentsList from './ContentsList';
import i18n from '../../../i18n';
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
    const { currentNo } = this.state;

    const exhibitions: Exhibition[] = i18n.t('exhibitions', {
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
            <ContentsList
              place="Sky Studio"
              currentNo={currentNo}
              exhibitions={studioExhibitions}
              onHoverItem={this.onHoverItem}
              onBlurItem={this.onBlurItem}
            />
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

export default ExhibitionSection;
