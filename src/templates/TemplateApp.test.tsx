import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import TemplateApp from "./TemplateApp";
import userEvent from "@testing-library/user-event";
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe("TemplateApp", () => {

  describe("component", () => {

    beforeEach(() => render(<MemoryRouter initialEntries={["/"]}><TemplateApp/></MemoryRouter>))
    test("should display burger icon", () => {
      expect(screen.getByText("burger")).toBeDefined();
    })

    test("should display a sidebar on click burger icon", async () => {
      userEvent.click(screen.getByText("burger"))
      await waitFor(() => {
        expect(screen.getByRole("complementary")).toBeDefined()
      })
    })

    test("should hide a sidebar on double click burger icon", async () => {
      userEvent.dblClick(screen.getByText("burger"))
      await waitFor(() => {
        expect(screen.queryByRole("complementary")).toBeNull()
      })
    })
  })

  describe("navigation", () => {
    test("should display the application page on click application link", async () => {
      render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>)
      userEvent.click(screen.getByText("burger"))
      userEvent.click(screen.getByText("applications"))
      await waitFor(() => {
        expect(screen.getByText("my applications")).toBeDefined()
      })
    })

    test("should display the file page on click file link", async () => {
      render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>)
      userEvent.click(screen.getByText("burger"))
      userEvent.click(screen.getByText("files"))
      await waitFor(() => {
        expect(screen.getByText("my files")).toBeDefined()
      })
    })
  })

})