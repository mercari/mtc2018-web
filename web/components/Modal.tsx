import * as React from 'react';
import styled from 'styled-components';

interface Props {
  show: boolean;
  onClickClose: () => void;
}

interface State {
  show: boolean;
}

class ContentModal extends React.Component<Props, State> {
  public static defaultProps = {
    show: false
  };

  public state = {
    show: false
  };

  public componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      show: nextProps.show
    });
  }

  public render() {
    const { children } = this.props;
    const { show } = this.state;
    return (
      <Wrapper show={show}>
        <Background />
        <Body>{children}</Body>
      </Wrapper>
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    // 非表示であれば処理しない
    if (!this.state.show) {
      return;
    }

    // ESCキーを押したら閉じる
    if (event.keyCode === 27) {
      this.props.onClickClose();
    }
  };
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: ${(props: { show: boolean }) => (props.show ? 'flex' : 'none')};
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Body = styled.div`
  position: absolute;
  top: 60px;
  left: 60px;
  right: 60px;
  bottom: 60px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
  }
`;

export default ContentModal;
