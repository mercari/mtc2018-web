import * as React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

class Default extends React.Component {
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

const Wrapper = styled.div`
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

const styledFooter = styled(Footer)`
  width: 100%;
`;

export default Default;
