import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../../components';
import ContentsList from './ContentsList';
import i18n from '../../../i18n';
import { Exhibition } from '../../../types';

interface State {
  currentNum: number | null;
}

class ExhibitionSection extends React.Component<{}, State> {
  public state = {
    currentNum: null
  };

  public render() {
    const { currentNum } = this.state;

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
            <ContentsList
              place="Library Cafe"
              currentNum={currentNum}
              exhibitions={cafeExhibitions}
              onHoverItem={this.onHoverItem}
              onBlurItem={this.onBlurItem}
            />
          </Place>
          <Place>
            <ContentsList
              place="Sky Studio"
              currentNum={currentNum}
              exhibitions={studioExhibitions}
              onHoverItem={this.onHoverItem}
              onBlurItem={this.onBlurItem}
            />
          </Place>
        </Wrapper>
      </Section>
    );
  }

  private onHoverItem = (no: number) => {
    this.setState({ currentNum: no });
  };

  private onBlurItem = () => {
    this.setState({ currentNum: null });
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

export default ExhibitionSection;
