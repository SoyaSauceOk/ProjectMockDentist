import { Button } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import PullDownMenu from './PullDownMenu';

export default function HeaderForSP() {
	return (
		<nav
			style={{
				position: 'fixed',
				height: '60px',
				width: '100%',
				top: '0',
				background: '#42bad0',
				zIndex: 20,
			}}
		>
			<ul style={{ width: '100%' }}>
				<li style={{ width: '33.3%', float: 'left', position: 'relative', zIndex: 20 }}>
					<Button style={{ padding: 0, margin: '5px', minWidth: '0' }}>
						<Image src='/icons/tel_ico.png' alt='電話番号' width={46} height={46} />
					</Button>
				</li>
				<li
					style={{
						width: '33.3%',
						float: 'left',
						position: 'relative',
						zIndex: 20,
						textAlign: 'center',
					}}
				>
					<Link href='/'>
						<a href='/'>
							<Image src='/icons/logo_icon.png' alt='サンプル歯科医院' width={56} height={56} />
						</a>
					</Link>
				</li>
				<PullDownMenu />
			</ul>
		</nav>
	);
}
