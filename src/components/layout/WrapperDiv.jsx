import { Fragment } from 'react';
import wrapper from './wrapper.module.css';

export default function WrapperDiv(props) {
  return (
    <Fragment>
      <div className={wrapper.form_wrapper_login}>{props.children}</div>
    </Fragment>
  );
}
