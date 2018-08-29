import * as React from 'react';
import Section from '../Section';
import { Content } from '../../../types';
import ContentModal from './ContentModal';
import ContentGrid from './ContentGrid';

interface Props {
  contents: Content[];
}

interface State {
  currentIndex?: number;
}

class ContentSection extends React.Component<Props, State> {
  public state = {
    currentIndex: undefined
  };

  public render() {
    const { contents } = this.props;
    const { currentIndex } = this.state;
    return (
      <Section title="Contents" id="contents" {...this.props}>
        <ContentGrid contents={contents} onClickItem={this.onClickItem} />
        <ContentModal
          currentIndex={currentIndex}
          contents={contents}
          show={currentIndex !== undefined}
          onClickClose={this.onClickClose}
        />
      </Section>
    );
  }

  private onClickItem = (index: number) => {
    this.setState({
      currentIndex: index
    });
  };

  private onClickClose = () => {
    this.setState({
      currentIndex: undefined
    });
  };
}

export default ContentSection;
