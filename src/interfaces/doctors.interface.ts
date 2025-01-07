/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DoctorsResponse {
    docs: DoctorsDoc[]
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
  
  export interface DoctorsDoc  {
    id: string
    name: string
    consultations: number
    specialization: string
    createdAt: string
    updatedAt: string
  }
  