/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MessagesResponse {
    docs: MessageDoc[]
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
  
  export interface MessageDoc {
    id: string
    user_name: string
    user_abbreviation: string
    user_abbreviation_color: UserAbbreviationColor
    message: Message
    time: string
    number_of_messages: number
    online: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface UserAbbreviationColor {
    primary: string
    accent: string
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
  