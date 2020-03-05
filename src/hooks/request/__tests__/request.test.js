import news, { initialState } from '../reducer'
import { fetching, success, error } from '../actionCreators'


it('returns the same state on an unhandled action', () => {
  expect(news(initialState, {type: '_NULL'})).toMatchSnapshot()
});

it('handles ERROR action', () => {
  const e = new Error('Look ma! I am an error');
  expect(news(initialState, error(e))).toMatchSnapshot()
});

it('handles FETCHING action', () => {
  expect(news(initialState, fetching())).toMatchSnapshot()
});

it('handles SUCCESS action', () => {
  expect(news(initialState, success())).toMatchSnapshot()
});
