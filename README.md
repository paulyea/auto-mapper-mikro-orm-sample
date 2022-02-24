Pre requisites:
* docker
* yarn
* node

Setup:
1. Run yarn install

How to run:
1. `docker run --rm -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 postgres:11`
2. `psql -U postgres -h localhost -c "create database \"auto-mapper-mikro-orm-sample\";"`
3. `yarn run mikro-orm migration:up`
4. `yarn run ts-node src/index.ts`

Step 1 needs to be done in a separate terminal.