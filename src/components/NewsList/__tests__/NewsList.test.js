import React from 'react'
import { render, waitForElement, cleanup } from 'react-native-testing-library'
import NewsList from '../index'
import App from "../../../../App"

beforeEach(() => {
  fetch.resetMocks()
})

afterEach(cleanup)

const api = (section, options = {}) => {
  return fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=udyw9zudgaK5k1fcEv4DCxAAGNLapAEG`, options).then(
    res => res.json()
  )
}

it('Async fetch request works', () => {
  const mockData = {
    results: [
      {
        title: 'some title',
        abstract: 'some abstract',
        published_date: 'published date'
      }
    ],
    copyright: 'copyright'
  }

  fetch.mockResponseOnce(JSON.stringify(mockData))
  const onResponse = jest.fn()
  const onError = jest.fn()

  const section = 'science'

  return api(section)
    .then(onResponse)
    .catch(onError)
    .finally( () => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual(mockData);
    })
})