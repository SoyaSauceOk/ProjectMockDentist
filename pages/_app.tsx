import { createContext, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import '../styles/globals.css';

export const WidthContext = createContext<number>(0);

function MyApp({ Component, pageProps }) {
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		const handleWindowResize = () => {
			const clientSize = document.documentElement.clientWidth;
			setWidth(clientSize > 320 ? clientSize : 320);
		};
		window.addEventListener('resize', handleWindowResize);
		handleWindowResize();
	}, []);
	useEffect(() => {
		document.getElementById('__next').style.maxWidth = width + 'px';
		document.getElementById('__next').style.overflow = 'hidden';
	}, [width]);
	return (
		<WidthContext.Provider value={width}>
			<Component {...pageProps} />
		</WidthContext.Provider>
	);
}

export default MyApp;
