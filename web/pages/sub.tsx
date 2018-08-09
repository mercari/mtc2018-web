import React from 'react';
import Link from 'next/link';
import { Sub } from '../components/sub';

export default () => (
  <>
    <Sub />
    <Link href="/">
      <a>top</a>
    </Link>
  </>
);
