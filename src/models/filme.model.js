import { prisma } from './prismaClient.js';

// Acesso simples ao banco para Filme
export const FilmeModel = {
  criar: (data) => prisma.filme.create({ 
    data 
  }),
  
  buscarPorId: (id) => prisma.filme.findUnique({
    where: { id },
    // Com N:N implícita, a relação é direta: inclui atores diretamente
    include: { 
        atores: true 
    },
  }),

  listar: () => prisma.filme.findMany({
    include: { 
        atores: true 
    },
    orderBy: { 
        criadoEm: 'desc' 
    },
  }),

  atualizar: (id, data) => prisma.filme.update({ 
    where: { id }, 
    data 
  }),
  
  remover: (id) => prisma.filme.delete({ 
    where: { id } 
  }),
};
