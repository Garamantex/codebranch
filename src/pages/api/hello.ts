/**
 * API Route: /api/hello
 *
 * Returns all leave requests from a mock API.
 * The data is sorted by status (APPROVED/REJECTED first) and then by creation date.
 * Pagination is handled on the client side.
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiRes = await fetch("https://67f551e6913986b16fa426fd.mockapi.io/api/v1/leave_requests");
    const data = await apiRes.json();
    
    // Sort data by status and date
    const sortedData = data.sort((a: any, b: any) => {
      // First sort by status (APPROVED/REJECTED first)
      if (a.status !== b.status) {
        if (a.status === 'APPROVED' || a.status === 'REJECTED') return -1;
        if (b.status === 'APPROVED' || b.status === 'REJECTED') return 1;
      }
      // Then sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    res.status(200).json({ 
      data: sortedData,
      total: data.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
