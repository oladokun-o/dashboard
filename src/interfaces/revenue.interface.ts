/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RevenueResponse {
    docs: RevenueDoc[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: any
    nextPage: any
  }
  
  export interface RevenueDoc {
    id: string
    date: string
    totalRevenue: number
    totalAppUsage: number
    totalConsultations: number
    totalFunding: number
    totalPayout: number
    createdAt: string
    updatedAt: string
  }
  