import { DailySection } from "@/interfaces/daily-section.interface";
import { DailyTask } from "@/interfaces/daily-task.interface";
import styles from '@/styles/Home.module.css';


interface Props {
    hiddenDailies: DailyTask[];
    setHidden: (task: DailyTask, hidden: boolean) => void;
}

const HiddenList = (props: Props) => { 
    return (
        <div className={styles.hiddenList}>
            {props.hiddenDailies.length > 0 && (
                <div className={styles.grid}>
                    <div className={styles.dailyBox}>
                        {props.hiddenDailies.map((daily) => {
                            return (
                                <div key={daily.title} className={styles.task} onClick={() => props.setHidden(daily, false)}>
                                    {daily.title}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HiddenList;