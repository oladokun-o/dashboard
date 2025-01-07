/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MetricsResponse {
    docs: MetricsDoc[]
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
  
  export interface MetricsDoc {
    id: string
    title: string
    total: number
    change: string
    createdAt: string
    updatedAt: string
  }
  