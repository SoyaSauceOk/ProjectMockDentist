import Head from 'next/head';
import CustomHeader from '../components/header';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>サンプル歯科医院</title>
				{/* <link rel='icon' href='/favicon.ico' /> */}
			</Head>
			<CustomHeader />
			<main></main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
				</a>
			</footer>
		</>
	);
}
