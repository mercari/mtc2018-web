import * as React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { loadFont } from '../components/styles';

class Default extends React.Component {
  public componentDidMount() {
    loadFont();
  }

  public render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <Body>{children}</Body>
        <Footer />
      </Wrapper>
    );
  }
}

const Wrapper = styled.main.attrs({
  role: 'main'
})`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 60px;
  box-sizing: border-box;
`;

export default Default;
