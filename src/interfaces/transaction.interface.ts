/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TransactionResponse {
    docs: TransactionDoc[]
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
  
  export interface TransactionDoc {
    id: string
    status: string
    paymentMethod: string
    amount: number
    category: string
    paymentType: string
    date: string
    createdAt: string
    updatedAt: string
  }
  