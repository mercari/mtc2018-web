import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../../../../components';
import ContentModalItem from './ContentModalItem';
import { Content } from '../../../../types';

interface Props {
  content: Content;
  onClickClose: () => void;
}

const ContentModal: React.SFC<Props> = ({ content, onClickClose }) => (
  <Modal show={true} onClickClose={onClickClose}>
    <Wrapper>
      <Header>
        <CloseButton
          src="../../../../static/images/cross.svg"
          onClick={onClickClose}
        />
      </Header>
      <ContentModalItem content={content} />
    </Wrapper>
  </Modal>
);

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
