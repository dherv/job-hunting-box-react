import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import PageApplications from "./PageApplications";
import userEvent from "@testing-library/user-event";

describe("PageApplications", () => {

  beforeEach(() => render(<PageApplications/>))

  describe("add form", () => {
    test("should display a add button", () => {
      expect(screen.getByText("add")).toBeDefined()
    })

    test("should display a add form on click", async () => {
      userEvent.click(screen.getByText("add"))
      await waitFor(() =>  {
        expect(screen.getByRole("form")).toBeDefined()
      })
    })

    test("should display an input for each application field", async () => {
      userEvent.click(screen.getByText("add"))
      await waitFor(() =>  {
        expect(screen.getByLabelText("company")).toBeDefined()
        expect(screen.getByLabelText("position")).toBeDefined()
        expect(screen.getByLabelText("send")).toBeDefined()
        expect(screen.getByLabelText("receive")).toBeDefined()
        expect(screen.getByLabelText("result")).toBeDefined()
      })
    })

    test("should post the form with the right inputs", async () => {
      userEvent.click(screen.getByText("add"))
      await waitFor(() => expect(screen.getByRole("form")).toBeDefined())
      userEvent.type(screen.getByLabelText("company"), "created-company")
      userEvent.type(screen.getByLabelText("position"), "created-position")
      userEvent.type(screen.getByLabelText("send"), "created-send")
      userEvent.type(screen.getByLabelText("receive"), "created-receive")
      userEvent.type(screen.getByLabelText("result"), "created-result")
      userEvent.click(screen.getByText("submit"))
      await waitFor(() => expect(screen.getByText("created-company")).toBeDefined())
    })

    test("should clear the form after submit", async () => {
      userEvent.click(screen.getByText("add"))
      await waitFor(() => expect(screen.getByRole("form")).toBeDefined())
      userEvent.type(screen.getByLabelText("company"), "created-company")
      userEvent.click(screen.getByText("submit"))
      await waitFor(() => expect(screen.getByText("add")).toBeDefined())
      userEvent.click(screen.getByText("add"))
      await waitFor(() => expect(screen.queryByDisplayValue("company")).toBeNull())
    })
  })


  describe("table display", () => {
    test("should display a table", () => {
      expect(screen.getByRole("table")).toBeDefined()
    })

    test("should display the table headers", () => {
      const headers = screen.queryAllByRole(`columnheader`)
      expect(headers).toHaveLength(5)
      expect(headers[0].textContent).toBe("company")
      expect(headers[1].textContent).toBe("position")
      expect(headers[2].textContent).toBe("send")
      expect(headers[3].textContent).toBe("receive")
      expect(headers[4].textContent).toBe("result")
    })

    test("should display one row for table head and one row per data", async () => {
      await waitFor(() => expect(screen.queryAllByRole("row")).toHaveLength(3))
    })

    test("should display a cell with application company name", async () => {
      await waitFor(() => {
        expect(screen.getByText("atlassian")).toBeDefined()
      })
    })

    test("should display a cell with application position", async () => {
      await waitFor(() => {
        expect(screen.getByText("fullstack")).toBeDefined()
      })
    })

    test("should display a cell with application send date", async () => {
      await waitFor(() => {
        expect(screen.getByText("2015/02/02")).toBeDefined()
      })
    })

    test("should display a cell with application receive date", async () => {
      await waitFor(() => {
        expect(screen.getByText("2015/02/04")).toBeDefined()
      })
    })

    test("should display a cell with application result", async () => {
      await waitFor(() => {
        expect(screen.queryAllByText('Yes!')).toHaveLength(1)
        expect(screen.queryAllByText('No')).toHaveLength(1)
      })
    })
  })

  describe("table sort", () => {
    test("should sort the table by company", async () => {
      await waitFor(() => {
        const cell = screen.queryAllByRole("row")[1].firstChild!
        expect(cell.textContent).toBe("atlassian")
      })

      let headers = await screen.findAllByRole("columnheader")
      userEvent.click(headers[0])

      await waitFor(() => {
        const cell = screen.queryAllByRole("row")[1].firstChild!
        expect(cell.textContent).toBe("atlassian")
      })
    })

    test("should sort the table by position", async () => {
      await waitFor(() => {
        const cell = screen.queryAllByRole("row")[1].firstChild!
        expect(cell.textContent).toBe("atlassian")
      })

      let headers = screen.queryAllByRole("columnheader")
      userEvent.click(headers[1])

      await waitFor(() => {
        const cell = screen.queryAllByRole("row")[1].firstChild!
        expect(cell.textContent).toBe("vercel")
      })

    })
  })
})