up:
	docker compose up

hard-up:
	docker compose up --build

hard-down:
	docker compose down
	docker system prune -a
	docker ps -aq | xargs docker stop | xargs docker rm
	docker images -aq | xargs docker rmi
	docker volume prune

down:
	docker compose down