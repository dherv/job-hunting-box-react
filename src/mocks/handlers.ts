import { rest } from 'msw'
import { Application } from '../types/interfaces'

export const handlers = [
  rest.get<Application[]>('/applications', (req, res, ctx) => {
    return res(
      ctx.json([{
        id: 1,
        company: 'atlassian',
        position: 'fullstack',
        send: "2015/02/02",
        receive: "2015/02/04",
        result: true
      }, {
        id: 2,
        company: 'vercel',
        position: 'frontend',
        send: "2015/02/01",
        receive: "2015/02/03",
        result: false
      }]),
    )
  }),
]

