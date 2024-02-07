export interface DailyTask {
	id: string;
	title: string;
	description: string;
    taskRequired?: string;
    hidden?: boolean;
}