# Recipes Drawer UI

This application provides an user interface to interact with the recipes data provided by the [Recipes Drawer](https://github.com/uloureiro/recipes_drawer) service.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
This application has Docker and Docker Compose files to make it easy to get up and running.

First, clone this repo.

**Important:** It is required that you inform Contentful's credentials and configurations. The following set of variables should be informed within the `docker-compose.yml` file:
```bash
# docker-compose.yml

# ...
    environment:
      - CONTENTFUL_SPACE_ID=your_contentful_space_id
      - CONTENTFUL_ENVIRONMENT_ID=your_contentful_environment_id # usually master
      - CONTENTFUL_DELIVERY_TOKEN=your_contentful_delivery_token
      - CONTENTFUL_API_URL=contentful_url # usually cdn.contentful.com
# ...
```

Be sure to have [Make](https://www.gnu.org/software/make/) available and then run the following command to see a list of all available commands:
```bash
make help
```
If you can't use Make, use the desired commands by copying from Makefile.

Build the application images:
```
make docker-build
```

Boot the containers:
```
make docker-up
```

In your browser, access the application through `http://localhost:3000`.

Notes:
- This runs in dettached mode, if you want to attach output to console run `docker-compose up`.
- Docker is mapping the frontend to localhost:3000, and the backend to localhost:9000, so please be sure that you don't have anything already mapped to those ports.

## How to run the test suites
```
make docker-test
```
