cnf ?= config.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

test-up:
	./test/scripts/test-up
test-down:
	./test/scripts/test-down
tests:
	make test-down
	make test-up
	docker logs -f tests
db-up:
	./database/scripts/db-up
db-down:
	./database/scripts/db-down
api-up:
	./api/scripts/api-up $(service)
api-down:
	./api/scripts/api-down $(service)
api-reset:
	make service=$(service) api-down
	make service=$(service) api-up
apis-up:
	make service=DEMOCRACY api-up
	make service=PROPOSAL api-up
apis-down:
	make service=DEMOCRACY api-down
	make service=PROPOSAL api-down
up:
	make db-up
	make apis-up
down:
	make apis-down
	make db-down
