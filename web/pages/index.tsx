import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Top = () => {
  return (
    <>
      <Wrapper>Hello Mercari Tech Conf 2018!!</Wrapper>
      <Link href="/sub">
        <a>sub</a>
      </Link>
    </>
  );
};

const Wrapper = styled.div`
  background-color: yellow;
`;

export default Top;
