import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  active: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.SFC<Props> = ({ className, active, onClick }) => (
  <Wrapper className={className} onClick={onClick}>
    <Icon className={active ? '-active' : ''}>
      <span />
      <span />
      <span />
    </Icon>
  </Wrapper>
);
HamburgerMenu.defaultProps = {
  active: false
};

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 12px;
  display: flex;
  align-item: center;
  justify: center;
`;

const Icon = styled.div`
  display: inline-block;
  transition: all 0.4s;
  width: 20px;
  height: 18px;
  position: relative;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    border-radius: 4px;
    display: inline-block;
    transition: all 0.4s;
    box-sizing: border-box;

    &:nth-of-type(1) {
      top: 0;
    }

    &:nth-of-type(2) {
      top: 8px;
    }

    &:nth-of-type(3) {
      bottom: 0;
    }
  }

  &.-active {
    span {
      &:nth-of-type(1) {
        -webkit-transform: translateY(8px) rotate(-45deg);
        transform: translateY(8px) rotate(-45deg);
      }

      &:nth-of-type(2) {
        opacity: 0;
      }

      &:nth-of-type(3) {
        -webkit-transform: translateY(-8px) rotate(45deg);
        transform: translateY(-8px) rotate(45deg);
      }
    }
  }
`;

export default HamburgerMenu;
