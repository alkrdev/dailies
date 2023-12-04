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
                    <div className={styles.dailyBox} key={section.Area}>
                        <h2>{section.Area}</h2>
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