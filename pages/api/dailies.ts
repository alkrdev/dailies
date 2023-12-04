import type { NextApiRequest, NextApiResponse } from 'next'
import dailiesFromJson from '@/data/dailies.json';
import { DailySection } from '@/interfaces/daily-section.interface';

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<DailySection[]>
) {
  const dailies: DailySection[] = dailiesFromJson.map((section) => {
    return {
      Area: section.Area,
      Dailies: section.Dailies.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          hidden: false
        };
      })
    };
  })

  res.status(200).json(dailies)
}
