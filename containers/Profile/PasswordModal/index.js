import dynamic from 'next/dynamic';

const DynamicPasswordModalContainer = dynamic(() =>
  import(
    /* webpackChunkName: "password-modal-container" */ './PasswordModalContainer'
  )
);

export default DynamicPasswordModalContainer;
