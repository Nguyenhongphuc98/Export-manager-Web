import { useEffect, useRef } from 'react';
import { ifetch } from '../core/api';

const IRequest = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    ifetch.iframe = iframeRef.current;
  });

  return (
    <div className='bg-white'>
      <iframe
        ref={iframeRef}
        src="http://157.245.196.187:8080"
        width="1"
        height="1"
        title="Iframe Example"
      />
    </div>
  );
};

export default IRequest;
