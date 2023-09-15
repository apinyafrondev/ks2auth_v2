This is Login System from Kussoriz Software, example concept code to login system with email and more little data.

## Setup Project
1. Edit POSTGRES_PASSWORD, PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD from file docker-compose in docker-compose directory
2. Go to docker-compose directory and run docker compose.

```bash
docker compose up
```

3. Create database table, i put in this repository filename is "user" in directory Middleware, but you can see schema in file and create own it.
4. Edit Server.js in Middleware directory in line 44

const db = pgp('postgres://postgres:password@ipaddress:port/databasename')

5. Edit detail for you email provider in nm_sendverify.js in Middleware/NodeMailer directory.
## Run Project
1. Run api server:

```bash
cd Middleware && node Server.js
```

2. Run web application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.