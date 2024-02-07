import { sortByAreaString } from "@/helpers/helpers";
import { DailySection } from "@/interfaces/daily-section.interface";
import { DailyTask } from "@/interfaces/daily-task.interface";
import styles from '@/styles/Home.module.css';

interface Props {
    sections: DailySection[];
    setHidden: (task: DailyTask, hidden: boolean) => void;
}

const MainGrid = (props: Props) => {

    return (
        <div className={styles.grid}>
            {props.sections.sort(sortByAreaString).map((section) => {
                if (section.Dailies.every((task) => task.hidden)) return;

                return (
                    <div className="px-4 py-8 bg-gray-900 shadow-2xl sm:rounded-lg sm:px-10 w-[380px]" key={section.Area}>
                        <h2 className="-mt-3 mb-3">{section.Area}</h2>
                        {section.Dailies.map((daily) => {
                            if (daily.hidden) return;
                            return (
                                <div key={daily.title} className={styles.task} onClick={() => props.setHidden(daily, true)}>
                                    {daily.title}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default MainGrid;