import React from 'react'
import './styles/App.scss'
import { CssBaseline } from '@material-ui/core'
import RecipeToolbar from './components/RecipeToolbar'
import RecipeList from './components/RecipeList'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <RecipeToolbar />      
      <RecipeList />
    </div>
  );
}

export default App;
