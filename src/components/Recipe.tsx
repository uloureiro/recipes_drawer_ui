import React from 'react'
import { Card, CardContent, CardMedia, Chip, Collapse, Grid, IconButton, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'

type RecipeProps = {
  id: string,
  title: string,
  photo: string,
  tags: Array<string>,
  description: string,
  chef: string,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 750,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  image: {
    height: 200
  }
}))

const renderTags = (tags: any) => {
  if (tags) {
    return (
      <Typography variant="body2" component="div">
        <div style={ { marginBottom: 10, marginTop: 15, marginLeft: 4 } }>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
            spacing={1}
          >
            Tags: {tags.map((tag: any, index: number) => {
            return (
              <Grid item key={index}>
                <Chip variant="outlined" size="small" label={tag}/> 
              </Grid>
          )})}
          </Grid>
        </div>
      </Typography>
    )
  }
}

const Recipe = (props: RecipeProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let photo_url: string = ''
  if (props && props.photo) {
    photo_url = window.location.protocol.concat(props.photo)
  }

  const classes = useStyles()
  
  return (
    <Card className={classes.root} square id={props.id}>
      <Collapse in={expanded} collapsedHeight={90}>
        <CardMedia
          className={classes.image}
          component="img"
          alt={props.title}
          image={photo_url}
          title={props.title}
        />
      </Collapse>
      <CardContent>
        <Typography variant="subtitle2" component="p">
          {props.title}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div" align="justify">
            <ReactMarkdown source={props.description} linkTarget="_blank"/>
          </Typography>
          {props.chef != null &&
            <Typography variant="body2" align="left" component="div">
              Signed by: {props.chef}
            </Typography>
          }
          {renderTags(props.tags)}
        </CardContent>
      </Collapse>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        size="small"
      >
        <ExpandMoreIcon/>
      </IconButton>
    </Card>
  )
}

export default Recipe
