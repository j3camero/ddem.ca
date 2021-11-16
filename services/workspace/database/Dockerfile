FROM postgres:latest
COPY workspace/database/scripts/init.sh /docker-entrypoint-initdb.d/
COPY api-democracy/schema /docker-entrypoint-initdb.d/DEMOCRACY/
COPY api-proposal/schema /docker-entrypoint-initdb.d/PROPOSAL/
EXPOSE ${DB_PORT}
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]

