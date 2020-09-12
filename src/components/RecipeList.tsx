import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import * as api from '../api/RecipesApi'
import Recipe from './Recipe'

interface RecipeListProps {
  baseUrl?: string
}

interface RecipeListState {
  recipes: Array<any>
}

const RecipeList = (props: RecipeListProps) => { 
  const [state, setRecipes] = React.useState<RecipeListState>({
    recipes: []
  })

  useEffect(() => {
    api.fetchRecipes()
    .then((recipes) => { setRecipes({ recipes: recipes }) })
  }, [])

  const renderRecipe = (recipe:any) => {
    const parsedRecipe = JSON.parse(recipe)
    return <Recipe
        id={parsedRecipe.id}
        title={parsedRecipe.title}
        photo={parsedRecipe.photo}
        tags={parsedRecipe.tags}
        description={parsedRecipe.description}
        chef={parsedRecipe.chef}
      />
  }

  return (
    <Container maxWidth="md" id="recipe-list">
      <Grid
      className='recipe-list-container'
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={2}
      >
        { state.recipes.map((recipe:any, index: number) => <Grid item key={index}>{renderRecipe(recipe)}</Grid>) }
      </Grid>
    </Container>
  )
}

export default RecipeList
