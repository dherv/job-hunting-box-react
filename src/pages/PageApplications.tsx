import React, {FC, useEffect, useRef, useState} from "react";
import TemplateApp from "../templates/TemplateApp";
import {Application} from "../types/interfaces";

const PageApplications: FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const order = useRef<boolean>(true)
  const header = useRef<string>("")

  useEffect(() => {
    const abortController = new AbortController()

    const fetchApplications = () => {
      return fetch("/applications", {signal: abortController.signal})
        .then(response => response.ok && response.json())
        .then(response => setApplications(response))
        .catch(error => {
          if (error.name === 'AbortError') {
            return
          }
          console.error(error)
        });
    }

    fetchApplications().then(() => {})

    return () => {
      abortController.abort()
    }

  }, [])

  const handleClick = (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    if(header.current === event.currentTarget.id) {
      order.current = !order.current
    } else {
      header.current = event.currentTarget.id
      order.current = true
    }

    handleSort(event.currentTarget.id, event.currentTarget.dataset.sort)
  }

  const handleSort = (parameter: string, sort?: string) => {

    const compareString = (a: string, b: string): number => {
      if (a < b) {
        return -1
      } else {
        return a > b ? 1 : 0
      }
    }

    const compareDate = (a: string, b: string): number => {
      const dateA = Number(new Date(a))
      const dateB = Number(new Date(b))
      return dateA - dateB
    }

    const compareBoolean = (a: boolean, b: boolean): number => {
      const boolA = a ? 1 : 0
      const boolB = b ? 1 : 0
      return boolA - boolB
    }

    const sortedApplications =
      applications.map(a => ({...a}))
        .sort((a: Application, b: Application) => {
          const reverseOrder = order.current ? 1 : -1

          if (sort === 'string') {
            return compareString(a[parameter] as string, b[parameter] as string) * reverseOrder
          }

          if (sort === 'date') {
            return compareDate(a[parameter] as string, b[parameter] as string) * reverseOrder
          }

          if (sort === 'boolean') {
            return compareBoolean(a[parameter] as boolean, b[parameter] as boolean) * reverseOrder
          }

          return 0
        })

    setApplications(sortedApplications)
  }

  return (
    <TemplateApp>
      <div>my applications</div>
      <table>
        <thead>
        <tr>
          <th onClick={handleClick} id="company" data-sort="string">company</th>
          <th onClick={handleClick} id="position" data-sort="string">position</th>
          <th onClick={handleClick} id="send" data-sort="date">send</th>
          <th onClick={handleClick} id="receive" data-sort="date">receive</th>
          <th onClick={handleClick} id="result" data-sort="boolean">result</th>
        </tr>
        </thead>
        <tbody>
        {
          applications.map(application => (
            <tr key={application.id}>
              <td>{application.company}</td>
              <td>{application.position}</td>
              <td>{application.send}</td>
              <td>{application.receive}</td>
              <td>{application.result ? 'Yes!' : 'No'}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </TemplateApp>)
}

export default PageApplications