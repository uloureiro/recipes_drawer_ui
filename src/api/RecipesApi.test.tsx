import * as api from './RecipesApi'
import axios from 'axios'
import apiSuccessData from './data/api-success.json'
import apiSuccessDataSingle from './data/api-success-single.json'

describe('Recipes API', () => {
  describe('successful recipes fetch', () => {  
    it('returns recipes collection', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get')
      axiosGetSpy.mockResolvedValueOnce(apiSuccessData)
  
      const result = await api.fetchRecipes()
      
      expect(axiosGetSpy).toHaveBeenCalledTimes(1)
      expect(result).not.toBeNull()
      expect(result).toBeDefined()
      expect(result.length).toBe(4)
    })
  
    it('returns a valid recipe object', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get')
      axiosGetSpy.mockResolvedValueOnce(apiSuccessDataSingle)
  
      const result = await api.fetchRecipes()
      const parsedResult = JSON.parse(result[0])
  
      expect(parsedResult).toStrictEqual(
        {
          id: "asdf1234",
          title: "Crispy Chicken and Rice with Peas & Arugula Salad",
          photo: "//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqseoos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-71d8a07ff8e79abcb0e6c0ebf0f3b69c.jpg",
          tags: ["gluten free", "healthy"],
          description: "Crispy chicken skin, tender meat, and rich, tomatoey sauce form a winning trifecta of delicious in this one-pot braise.",
          chef: "Jony Chives"
        }
      )
    })
  })
  
  describe('empty recipes fetch', () => {
    it('returns empty response', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get')
      axiosGetSpy.mockResolvedValueOnce({ data: null })
  
      expect(api.fetchRecipes()).resolves.toBeNull()
    })
  })
  
  describe('unsuccessful recipes fetch', () => {
    it('returns empty response', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get')
      axiosGetSpy.mockRejectedValueOnce({ status: 500, message: "Internal server error" })
  
      expect(api.fetchRecipes()).rejects.toStrictEqual({ status: 500, message: "Internal server error" })
    })
  }) 
})