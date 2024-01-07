# leonardo api

This rest API was built using;

  - Prisma
  - MySql
  - zod 
    - chosen due to typescript and clean integration with prisma
  - Express
  - Jest & SuperTest
    - success and failure tests 

Amend the datasource db url in the [prisma/schema.prisma] file

```bash
npx prisma db push
npm start