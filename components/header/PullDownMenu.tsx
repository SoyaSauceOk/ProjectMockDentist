import { useState } from 'react';
import Link from 'next/link';
// import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';

const targetList: string[] = [
	'一分でわかるサンプル歯科',
	'お知らせ',
	'当院について',
	'先生・スタッフ紹介',
	'スタッフ募集',
	'自由診療について',
];

const linkList: string[] = ['minute/', 'news/', 'about/', 'staff', 'recruit/', 'free/'];

function EachList(content, index) {
	const link = linkList[index];
	return (
		<li key={index}>
			<Link href={link}>
				<a href={link}>
					<p style={{ marginRight: '20px' }}>{content}</p>
					<img src={`/icons/menu-img0${index + 1}.png`} alt='電話番号' height='25px' />
				</a>
			</Link>
		</li>
	);
}

function List({ open }: { open: boolean }) {
	return (
		<Collapse
			in={open}
			timeout={500}
			style={{ position: 'absolute', width: '100%', top: '60px' }}
		>
			<ul
				style={{
					backgroundColor: 'rgba(66,186,208,0.8)',
					paddingTop: '20px',
					height: '60vh',
				}}
				id='spdl-list'
			>
				{targetList.map((t, index) => {
					return EachList(t, index);
				})}
			</ul>
		</Collapse>
	);
}

export default function PullDownMenu() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<li style={{ position: 'relative' }}>
			<p id='menu_btn' onClick={() => setOpen(!open)}>
				<span
					style={{
						top: 0,
						transform: open ? 'translateY(13px) rotate(-45deg)' : '',
						WebkitTransform: open ? 'translateY(13px) rotate(-45deg)' : '',
					}}
				/>
				<span style={{ top: '13px', opacity: open ? '0' : '1' }} />
				<span
					style={{
						bottom: 0,
						transform: open ? 'translateY(-13px) rotate(45deg)' : '',
						WebkitTransform: open ? 'translateY(-13px) rotate(45deg)' : '',
					}}
				/>
			</p>
			<List open={open} />
		</li>
	);
}
