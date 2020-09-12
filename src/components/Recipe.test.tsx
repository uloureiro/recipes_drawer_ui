import React from 'react';
import { act, render } from '@testing-library/react';
import Recipe from './Recipe';
import userEvent from '@testing-library/user-event';

let renderResult: {
  container: HTMLElement,
  getByText: any,
  getByRole: any,
  queryByText: any,
}

const fullRecipe = {
  id: "asdf1234",
  title: "Crispy Chicken",
  photo: "//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqseoos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-71d8a07ff8e79abcb0e6c0ebf0f3b69c.jpg",
  tags: ["gluten free", "healthy", "yummy"],
  description: "Crispy chicken skin, tender meat, and rich, tomatoey sauce form a winning trifecta of delicious in this one-pot braise.",
  chef: "Jony Chives"
}
const noTagsRecipe = {
  id: "asdf5678",
  title: "Crispy Chicken",
  photo: "//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqseoos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-71d8a07ff8e79abcb0e6c0ebf0f3b69c.jpg",
  tags: null,
  description: "Crispy chicken skin, tender meat, and rich, tomatoey sauce form a winning trifecta of delicious in this one-pot braise.",
  chef: "Jony Chives"
}
const noChefRecipe = {
  id: "asdf4321",
  title: "Crispy Chicken",
  photo: "//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqseoos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-71d8a07ff8e79abcb0e6c0ebf0f3b69c.jpg",
  tags: ["gluten free", "healthy", "yummy"],
  description: "Crispy chicken skin, tender meat, and rich, tomatoey sauce form a winning trifecta of delicious in this one-pot braise.",
  chef: null
}

const recipeRenderer = (props: any) => {
  return (
    <Recipe 
      id={props.id}
      title={props.title}
      photo={props.photo}
      tags={props.tags}
      description={props.description}
      chef={props.chef}
    />
  )
}

describe('Recipe component', () =>{
  describe('full rendering', () => {
    describe('collapsed', () => {
      it('shows recipe photo, description and expand button', async () => {
        await act(async () => {
          renderResult = render(recipeRenderer(fullRecipe))
        })

        const photo = renderResult.getByRole('img')
        const title = renderResult.getByText(fullRecipe.title)
        const expandButton = renderResult.getByRole('button')
        const expandedContent = renderResult.queryByText(fullRecipe.description)

        expect(photo).toBeInTheDocument()
        expect(photo).toHaveAttribute('src', 'http:'.concat(fullRecipe.photo))
        expect(title).toBeInTheDocument()
        expect(expandButton).toBeInTheDocument()
        expect(expandButton).toHaveAttribute('aria-expanded', "false")
        expect(expandedContent).not.toBeInTheDocument()
      })
    })
    describe('expanded', () => {
      it('shows recipe photo, description and expanded content', async () => {
        await act(async () => {
          renderResult = render(recipeRenderer(fullRecipe))
        })

        const photo = renderResult.getByRole('img')
        const title = renderResult.getByText(fullRecipe.title)
        const expandButton = renderResult.getByRole('button')
        
        userEvent.click(expandButton)
        
        const description = renderResult.getByText(fullRecipe.description)
        const chef = renderResult.getByText('Signed by: '.concat(fullRecipe.chef))
        const tag1 = renderResult.getByText(fullRecipe.tags[0])
        const tag2 = renderResult.getByText(fullRecipe.tags[1])
        const tag3 = renderResult.getByText(fullRecipe.tags[2])

        expect(photo).toBeInTheDocument()
        expect(photo).toHaveAttribute('src', 'http:'.concat(fullRecipe.photo))
        expect(title).toBeInTheDocument()
        expect(expandButton).toBeInTheDocument()
        expect(expandButton).toHaveAttribute('aria-expanded', "true")
        expect(description).toBeInTheDocument()
        expect(chef).toBeInTheDocument()
        expect(tag1).toBeInTheDocument()
        expect(tag2).toBeInTheDocument()
        expect(tag3).toBeInTheDocument()
      })
    })
  })

  describe('rendering without tags', () => {
    it('does not show tags and label', async () => {
      await act(async () => {
        renderResult = render(recipeRenderer(noTagsRecipe))
        userEvent.click(renderResult.getByRole('button'))
      })    
      
      const description = renderResult.getByText(noTagsRecipe.description)
      const tagsLabel = renderResult.queryByText(/tags:/i)
  
      expect(description).toBeInTheDocument()
      expect(tagsLabel).not.toBeInTheDocument()
    })
  })

  describe('rendering without chef', () => {
    it('does not show chef and label', async () => {
      await act(async () => {
        renderResult = render(recipeRenderer(noChefRecipe))
        userEvent.click(renderResult.getByRole('button'))
      })    
      
      const description = renderResult.getByText(noChefRecipe.description)
      const tagsLabel = renderResult.queryByText(/tags:/i)
      const chefLabel = renderResult.queryByText(/signed by:/i)

      expect(description).toBeInTheDocument()
      expect(tagsLabel).toBeInTheDocument()
      expect(chefLabel).not.toBeInTheDocument()
    })
  })
})
