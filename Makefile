up :
	docker-compose up -d
build :
	docker-compose build

clear : 
	docker-compose stop
	docker-compose down
	docker volume rm $(shell docker volume ls -q)
	docker network rm $(shell docker network ls -q)
	docker rmi $(shell docker images -q)

push :
	git add .
	git commit -m "update"
	git push