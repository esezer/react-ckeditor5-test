import { useEffect } from 'react';

const useScript = url => {
	useEffect(() => {
		const script = document.createElement('script');

		document.head.appendChild(script);

		script.onload = scr => {
			//console.log('////////////////////////////////////loaded');
		};

		script.src = url;
		script.async = true;

		return () => {
			document.head.removeChild(script);
		};
	}, [url]);
};

export default useScript;
