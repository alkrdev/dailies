import type { NextApiRequest, NextApiResponse } from 'next'
import dailiesFromJson from '@/data/dailies.json';
import { DailySection } from '@/interfaces/daily-section.interface';
import { DailyTask } from '@/interfaces/daily-task.interface';

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<DailySection[]>
) {
    console.log('GET /api/dailies')

    const dailies: DailySection[] = dailiesFromJson.map((section) => {
        return {
            Area: section.Area,
            Dailies: section.Dailies.map((task: DailyTask) => {
                const { id, title, description, taskRequired } = task;

                return {
                    id: id,
                    title: title,
                    description: description,
                    taskRequired: taskRequired ?? undefined,
                    hidden: false
                };
            })
        };
    })

    res.status(200).json(dailies)
}
