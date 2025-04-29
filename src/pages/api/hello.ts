// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiRes = await fetch("https://67f551e6913986b16fa426fd.mockapi.io/api/v1/leave_requests");
    const data = await apiRes.json();
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '10', 10);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = data.slice(start, end);
    res.status(200).json({
      data: paginated,
      total: data.length,
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
}
