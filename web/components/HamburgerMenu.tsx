import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  active: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.SFC<Props> = ({ className, active, onClick }) => (
  <div className={`${className} ${active ? '-active' : ''}`} onClick={onClick}>
    <span />
    <span />
    <span />
  </div>
);
HamburgerMenu.defaultProps = {
  active: false
};

export default styled(HamburgerMenu)`
  display: inline-block;
  transition: all 0.4s;
  box-sizing: border-box;
  position: relative;
  width: 20px;
  height: 18px;

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
