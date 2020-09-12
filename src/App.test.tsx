import React from 'react';
import { act, render } from '@testing-library/react';
import App from './App';
import axios from 'axios'
import apiSuccessDataSingle from './api/data/api-success-single.json'

let renderResult: {
  container: HTMLElement
}

describe('Recipe Drawer', () => {
  const axiosGetSpy = jest.spyOn(axios, 'get')
  axiosGetSpy.mockResolvedValue(apiSuccessDataSingle)
  
  it('renders toolbar', async () => {
    await act(async () => {
      renderResult = render(<App />);
    })
    const element = renderResult.container.querySelector('#recipe-toolbar');
    expect(element).toBeInTheDocument();
  })

  it('renders recipes list', async () => {
    await act(async () => {
      renderResult = render(<App />);
    })
    const element = renderResult.container.querySelector('#recipe-list');
    expect(element).toBeInTheDocument();
  })

  it('recipes list has one recipe', async () => {
    await act(async () => {
      renderResult = render(<App />);
    })

    const element = renderResult.container.querySelector('#asdf1234');
    expect(element).toBeInTheDocument();
  })
})

