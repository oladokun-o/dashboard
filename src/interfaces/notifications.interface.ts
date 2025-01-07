/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NotificationsResponse {
    docs: NotificationDoc[]
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
  
  export interface NotificationDoc {
    id: string
    title: string
    message: Message
    time: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Message {
    root: Root2
  }
  
  export interface Root2 {
    children: Children[]
    direction: string
    format: string
    indent: number
    type: string
    version: number
  }
  
  export interface Children {
    children: Children2[]
    direction: string
    format: string
    indent: number
    type: string
    version: number
    textFormat: number
    textStyle: string
  }
  
  export interface Children2 {
    detail: number
    format: number
    mode: string
    style: string
    text: string
    type: string
    version: number
  }
  