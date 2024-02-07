import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { LOCAL_URL } from '@/constants/localurl.const';

import { DailySection } from '../interfaces/daily-section.interface';
import { DailyTask } from '../interfaces/daily-task.interface';

import MainGrid from '@/components/MainGrid';
import HiddenList from '@/components/HiddenList';

import * as cookie from 'cookie'

export const getServerSideProps = (async (context) => {
    const cookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : "";

    

	const res = await fetch(LOCAL_URL);
	const sections = await res.json();

    const filteredSections: DailySection[] = sections.map((section: DailySection) => {
        if (cookies !== "" && cookies.hiddenDailies) {
            const hiddenDailies = JSON.parse(cookies.hiddenDailies) as DailyTask[];

            section.Dailies = section.Dailies.map((task: DailyTask) => {
                task.hidden = hiddenDailies.some((hiddenTask) => hiddenTask.id === task.id);

                return task;
            })
        }
        return section;
    })

	return { props: { dailySections: filteredSections } };
}) satisfies GetServerSideProps<{ dailySections: DailySection[] }>;

export default function Home({ dailySections }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [sections, setSections] = useState<DailySection[]>(dailySections);
	const [hiddenDailies, setHiddenDailies] = useState<DailyTask[]>([]);
    const [isTaskman, setIsTaskman] = useState(false);

	const setHidden = (task: DailyTask, hidden: boolean) => {
		const newSections = sections.map((section) => {
			const dailyToChange = section.Dailies.find((daily) => daily.id === task.id);

			if (dailyToChange) dailyToChange.hidden = hidden;

			return section;
		});

		setSections(newSections);
	};

    const isTaskmanChanged = (e: ChangeEvent<HTMLInputElement>) => setIsTaskman(e.target.checked);
    

	useEffect(() => {
		const newHiddenDailies = sections.map((section) => section.Dailies.filter((task) => task.hidden)).flat();



        document.cookie = "hiddenDailies=" + JSON.stringify(newHiddenDailies) + ";max-age=604800;Secure;path=/";

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
                {/* <h1 className="">Daily Dismay</h1>
                <p>Keep track of your dailies</p>		 */}
                <label htmlFor="isTaskman">Taskman </label>
                <input type="checkbox" id="isTaskman" name="isTaskman" onChange={isTaskmanChanged}/>
				<MainGrid sections={sections} setHidden={setHidden} isTaskman={isTaskman} />
				<hr className={styles.divider}></hr>
				<HiddenList hiddenDailies={hiddenDailies} setHidden={setHidden} />
			</main>
		</>
	);
}
