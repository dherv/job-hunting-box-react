export interface Application {
  [key: string]: string|number|boolean
  id: number,
  company: string,
  position: string,
  send: string,
  receive: string,
  result: boolean
}

export interface ApplicationBody {
  company: string,
  position: string,
  send: string,
  receive: string,
  result: boolean
}