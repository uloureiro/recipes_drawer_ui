docker-build: ## Builds the application's images
	docker-compose build
.PHONY: docker-build

docker-up: ## Starts application in dettached mode
	docker-compose up -d
.PHONY: docker-up

docker-down: ## Stops application
	docker-compose down
.PHONY: docker-down

docker-test: ## Runs both UI and Rails unit tests
	make docker-test-ui
	make docker-test-backend
.PHONY: docker-test

docker-test-ui: ## Runs UI unit tests
	docker-compose run recipes_drawer_ui yarn test:single
.PHONY: docker-test-ui

docker-test-backend: ## Runs Rails unit tests
	docker-compose run recipes_drawer_backend bundle exec rspec spec -f d
.PHONY: docker-test-backend

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST)
.PHONY: help