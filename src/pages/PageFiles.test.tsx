import React from 'react';
import {render} from '@testing-library/react';
import PageFiles from "./PageFiles";

beforeEach(() => render(<PageFiles/> ))

describe("PageFiles", () => {
  test("should display a new button", () => {})
  test("should display a company name input in a modal on click new", () => {})
  test("should display a template file after company modal is closed", () => {})

  test("should display a select dropdown company", () => {})
  test("should display the correct files on select company", () => {})

  test("should display a breadcrumb", () => {})
  test("should display the correct file on click breadcrumb link", () => {})

  test("should display a language toggle", () => {})
  test("should display the correct file on switch language", () => {})

  test("should display a pdf export button", () => {})
  test("should export the pdf file on click pdf button", () => {})

  test("should display an export button", () => {})
  test("should export resume and cover letter in a folder with the company name", () => {})
})