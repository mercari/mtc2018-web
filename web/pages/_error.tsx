import React from 'react';

export default class Error extends React.Component {
  public static getInitialProps({ res = {}, err = {} }: any) {
    const statusCode = res.statusCode || err.statusCode || null;
    if (statusCode === 404) {
      res.redirect('/2018');
      return;
    }
    return { statusCode };
  }

  public render() {
    return <div>error</div>;
  }
}
