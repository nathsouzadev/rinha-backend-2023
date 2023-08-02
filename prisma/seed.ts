import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

const persons = [
  {
    id: 'e1347b38-dfcd-42a3-894c-42ccfc35a54f',
    nome: 'Katherine Johnson',
    apelido: 'Kath',
    nascimento: '2000-01-01',
    stack: [],
  },
];

const main = async () => {
  for (const person of persons) {
    await prisma.person.create({
      data: person,
    });
  }
};

main();
