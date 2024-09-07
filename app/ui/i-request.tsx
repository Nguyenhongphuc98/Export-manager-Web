import { useEffect, useRef } from 'react';
import { ifetch } from '../core/api';
import AppConfig from '../core/app-config';

const IRequest = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    ifetch.iframe = iframeRef.current;
  });

  return (
    <div className='bg-white'>
      <iframe
        ref={iframeRef}
        src={AppConfig.host}
        width="1"
        height="1"
        title="Iframe Example"
      />
    </div>
  );
};

export default IRequest;
