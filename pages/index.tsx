import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { LOCAL_URL } from '@/constants/localurl.const';

import { DailySection } from '../interfaces/daily-section.interface';
import { DailyTask } from '../interfaces/daily-task.interface';

import MainGrid from '@/components/MainGrid';
import HiddenList from '@/components/HiddenList';

export const getServerSideProps = (async (context) => {
	const res = await fetch(LOCAL_URL);
	const dailies = await res.json();

	return { props: { dailies } };
}) satisfies GetServerSideProps<{ dailies: DailySection[] }>;

export default function Home({ dailies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [sections, setSections] = useState<DailySection[]>(dailies);
	const [hiddenDailies, setHiddenDailies] = useState<DailyTask[]>([]);

	const setHidden = (task: DailyTask, hidden: boolean) => {
		const newSections = sections.map((section) => {
			const dailyToChange = section.Dailies.find((daily) => daily.id === task.id);

			if (dailyToChange) dailyToChange.hidden = hidden;

			return section;
		});

		setSections(newSections);
	};

	useEffect(() => {
		const newHiddenDailies = sections.map((section) => section.Dailies.filter((task) => task.hidden)).flat();

		setHiddenDailies(newHiddenDailies);
	}, [sections]);

	return (
		<>
			<Head>
				<title>Daily Dismay</title>
				<meta name='description' content='Handler for dailies' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className="py-6 mx-auto text-gray-100 max-w-7xl sm:px-6 lg:px-8">				
				<MainGrid sections={sections} setHidden={setHidden} />
				<hr className={styles.divider}></hr>
				<HiddenList hiddenDailies={hiddenDailies} setHidden={setHidden} />
			</main>
		</>
	);
}
