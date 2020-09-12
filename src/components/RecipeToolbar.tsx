import { AppBar, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import React from 'react'

const ElevationScroll = (props: any) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const RecipeToolbar = () => {
  return (
    <div id="recipe-toolbar">
      <ElevationScroll>
      <AppBar>
        <Toolbar className="app-bar">
          <Typography variant="h6" color="textPrimary">Recipes Drawer</Typography>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      <Toolbar />
    </div>
  )
}

export default RecipeToolbar