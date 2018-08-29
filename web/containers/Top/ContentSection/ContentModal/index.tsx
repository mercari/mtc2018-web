import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../../../../components';
import ContentModalItem from './ContentModalItem';
import { Content } from '../../../../types';

interface Props {
  contents: Content[];
  show: boolean;
  currentIndex?: number;
  onClickClose: () => void;
}

interface State {
  currentIndex: number;
}

class ContentModal extends React.Component<Props, State> {
  public state = {
    currentIndex: this.props.currentIndex || 0
  };

  public render() {
    const { contents, show, onClickClose } = this.props;
    const { currentIndex } = this.state;
    return (
      <Modal show={show} onClickClose={onClickClose}>
        <Wrapper>
          <Header>
            <CloseButton
              src="../../../../static/images/cross.svg"
              onClick={onClickClose}
            />
          </Header>
          <ContentModalItem
            index={currentIndex}
            content={contents[currentIndex]}
          />
        </Wrapper>
      </Modal>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  flex-shrink: 0;

  @media screen and (max-width: 767px) {
    padding: 0 8px 20px 0;
  }
`;

const CloseButton = styled.img`
  width: 37px;
  height: 37px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    width: 20px;
    height: 20px;
  }
`;

export default ContentModal;
