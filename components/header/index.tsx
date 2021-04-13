import { useContext } from 'react';
import { WidthContext } from '../../pages/_app';
import HeaderForSP from './HeaderForSP';
import WideSlider from './WideSlider';
import Image from 'next/image';

export default function CustomHeader() {
	const width = useContext(WidthContext);
	return (
		<header style={{ width: width + 'px', height: '100%' }}>
			{width < 800 && <HeaderForSP />}
			<WideSlider />
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					marginTop: '-60px',
					background: 'black',
					width: '100%',
					height: '159px',
				}}
			>
				<h1>
					<Image src='/icons/logo_icon.png' height='40px' width='50px' />
				</h1>
			</div>
		</header>
	);
}
