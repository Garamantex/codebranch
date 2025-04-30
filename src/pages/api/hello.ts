/**
 * API Route: /api/hello
 *
 * Returns a paginated list of leave requests from a mock API.
 * Supports pagination via ?page=1&limit=10 query parameters.
 * Supports filtering via ?status=ALL|PENDING|APPROVED|REJECTED
 * Sorts requests by status (APPROVED/REJECTED first) and then by creation date.
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);
  const statusFilter = (req.query.status as string) || 'ALL';
  
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

  // Apply status filter
  const filteredData = statusFilter === 'ALL' 
    ? sortedData 
    : sortedData.filter((item: any) => item.status === statusFilter);

  // Apply pagination after filtering
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filteredData.slice(start, end);
  
  res.status(200).json({ 
    data: paginated, 
    total: filteredData.length,
    currentPage: page,
    totalPages: Math.ceil(filteredData.length / limit)
  });
}
