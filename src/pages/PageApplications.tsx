import React, {FC, useEffect, useRef, useState} from "react";
import TemplateApp from "../templates/TemplateApp";
import {Application, ApplicationBody} from "../types/interfaces";
import * as Sentry from "@sentry/react";

const PageApplications: FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [createApplication, setCreateApplication] = useState<ApplicationBody>({
    company: "",
    position: "",
    receive: "",
    send: "",
    result: false
  })
  const [showForm, setShowForm] = useState<boolean>(false)
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

    fetchApplications().then(() => {
    })

    return () => {
      abortController.abort()
    }

  }, [])


  const handleClickAdd = () => {
    setShowForm(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget
    setCreateApplication(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const {company, position, send, receive, result} = createApplication
    try {
      const created = await fetch("/applications", {
        method: "POST",
        body: JSON.stringify({company, position, send, receive, result})
      }).then(response => response.ok && response.json())
      setApplications(prev => [...prev, created])
      setCreateApplication({company: "", position: "", receive: "", send: "", result: false})
    } catch (e) {
      console.error(e)
    }
    setShowForm(false)
  }

  const handleClickHeader = (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    if (event.currentTarget.dataset.name && event.currentTarget.dataset.sort) {
      if (header.current === event.currentTarget.dataset.name) {
        order.current = !order.current
      } else {
        header.current = event.currentTarget.dataset.name
        order.current = true
      }

      handleSort(event.currentTarget.dataset.name, event.currentTarget.dataset.sort)
    }
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
      <Sentry.ErrorBoundary fallback={"An error has occurred"}>

        <div>my applications</div>
        {showForm ?
          <form name="form-create-application">
            <label htmlFor="company">company</label>
            <input id="company" name="company" onChange={handleChange}/>
            <label htmlFor="position">position</label>
            <input id="position" name="position" onChange={handleChange}/>
            <label htmlFor="send">send</label>
            <input id="send" name="send" onChange={handleChange}/>
            <label htmlFor="receive">receive</label>
            <input id="receive" name="receive" onChange={handleChange}/>
            <label htmlFor="result">result</label>
            <input id="result" name="result" onChange={handleChange}/>
            <button onClick={handleSubmit}>submit</button>
          </form> : <button onClick={handleClickAdd}>add</button>}
        <table>
          <thead>
          <tr>
            <th onClick={handleClickHeader} data-name="company" data-sort="string">company</th>
            <th onClick={handleClickHeader} data-name="position" data-sort="string">position</th>
            <th onClick={handleClickHeader} data-name="send" data-sort="date">send</th>
            <th onClick={handleClickHeader} data-name="receive" data-sort="date">receive</th>
            <th onClick={handleClickHeader} data-name="result" data-sort="boolean">result</th>
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
      </Sentry.ErrorBoundary>
    </TemplateApp>)
}

export default PageApplications