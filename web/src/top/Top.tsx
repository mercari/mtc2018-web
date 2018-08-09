import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IRootState } from '../reducer';

interface IProps {
  hogeId: string;
}

const Top: React.SFC<IProps> = props => {
  const { hogeId } = props;
  return (
    <Wrapper>
      Hello Mercari Tech Conf 2018!!
      {hogeId}
    </Wrapper>
  );
};

const mapStateToProps = (state: IRootState) => ({
  hogeId: state.top.hogeId
});

const Wrapper = styled.div`
  background-color: yellow;
`;

export default connect(
  mapStateToProps,
  {}
)(Top);
