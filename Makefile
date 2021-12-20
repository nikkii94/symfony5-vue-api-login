app_container_name=php8-container-sf5-api
node_container_name=node-container-sf5-api
nginx_container_name=nginx-container-sf5-api

app_url=symfony5-api.test

cert:
	mkdir -p certs && mkcert -key-file "./certs/$(app_url).key" -cert-file "./certs/$(app_url).crt" "*.$(app_url)"

start:
	@docker-compose up -d --build --remove-orphans && start https://$(app_url)

stop:
	@docker-compose stop

down:
	@docker-compose down

ssh:
	@docker exec -it $(app_container_name) bash

build-full:
	@docker-compose build --force-rm --no-cache

node-restart:
	@docker container restart $(node_container_name)

node-log:
	@docker container logs --follow --timestamps $(node_container_name)

export-ssl:
	rm -rf ./certs
	@docker cp $(nginx_container_name):/etc/ssl ./certs
