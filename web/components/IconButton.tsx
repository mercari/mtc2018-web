import * as React from 'react';
import styled from 'styled-components';
import { colors } from './styles';

interface Props {
  src: string;
  alt: string;
  onClick: () => void;
}

const IconButton: React.SFC<Props> = ({ src, alt, ...props }) => (
  <Wrapper {...props}>
    <img src={src} alt={alt} />
  </Wrapper>
);

const Wrapper = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid ${colors.yuki};
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:hover {
    opacity: 0.5;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export default IconButton;
