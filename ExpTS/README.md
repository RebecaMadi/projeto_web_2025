1 a 13- :green-check:

Os CRUDS podem ser visualizados também na página inicial

**Rodar o projeto:**
- Configure as variáveis de ambiente
- npm install
- Se não tiver um banco de dados local execute ´docker-compose up -d´ para subir o banco e o phpMyAdmin
- execute as migrações
- Rode npm run start

**Outros Comandos:**
Executar migrations:
npx prisma migrate dev --name

Gerar o client:
npx prisma generate

Compilar scss:
npm run sass

