import * as React from 'react';
import Section from '../Section';
import { Content } from '../../../types';
import ContentModal from './ContentModal';
import ContentGrid from './ContentGrid';

interface Props {
  contents: Content[];
}

interface State {
  currentContent?: Content;
}

class ContentSection extends React.Component<Props, State> {
  public state = {
    currentContent: undefined
  };

  public render() {
    const { contents } = this.props;
    const { currentContent } = this.state;
    return (
      <Section title="CONTENTS" id="contents" {...this.props}>
        <ContentGrid contents={contents} onClickItem={this.onClickItem} />
        <ContentModal
          content={currentContent}
          onClickClose={this.onClickClose}
        />
      </Section>
    );
  }

  private onClickItem = (content: Content) => {
    this.setState({
      currentContent: content
    });
  };

  private onClickClose = () => {
    this.setState({
      currentContent: undefined
    });
  };
}

export default ContentSection;
