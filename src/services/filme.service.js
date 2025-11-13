import { AppError } from '../errors/AppError.js';
import { prisma } from '../models/prismaClient.js';


export const FilmeService = {
  // Cria um novo filme
  //parametros { titulo, faixaEtaria, genero, atorIds = []: array de strings id, atores = []: array de objeto ator }
  async criar({ titulo, faixaEtaria, genero, atorIds = [], atores = [] }) {
    const criado = await prisma.filme.create({
      data: {
        titulo,
        faixaEtaria,
        genero,
        atores: {
          connect: atorIds.map(id => ({ id })),    // Liga atores já existentes
          create: atores.map(a => ({ nome: a.nome })), // Cria atores novos
        },
      },
      include: { 
        atores: true 
      },
    });
    return criado;
  },

  // Lista todos os filmes
  async listar() {
    const filmes = await prisma.filme.findMany({
      include: { 
        atores: true 
      },
      orderBy: { 
        criadoEm: 'desc' 
      },
    });

    return filmes;
  },

  // Busca um filme por ID
  async obter(id) {

    const filme = await prisma.filme.findUnique({
      where: { id },
      include: { 
        atores: true 
      },
    });
    
    if (!filme) throw new AppError('Filme não encontrado', 404);

    return filme;
  },

  // Atualiza um filme
  async atualizar(id, { titulo, faixaEtaria, genero, atorIds, atores }) {
    const existe = await prisma.filme.findUnique({ where: { id } });
    if (!existe) throw new AppError('Filme não encontrado', 404);

    const data = {};
    if (titulo !== undefined) data.titulo = titulo;
    if (faixaEtaria !== undefined) data.faixaEtaria = faixaEtaria;
    if (genero !== undefined) data.genero = genero;

    // Se vier elenco, substitui completamente
    if (atorIds || atores) {
      data.atores = {
        set: [],                                     // Limpa elenco atual
        connect: (atorIds || []).map(id => ({ id })), // Liga IDs existentes
        create: (atores || []).map(a => ({ nome: a.nome })), // Cria novos
      };
    }

    const atualizado = await prisma.filme.update({
      where: { id },
      data,
      include: { atores: true },
    });
    return atualizado;
  },

  // Remove um filme
  async remover(id) {
    const existe = await prisma.filme.findUnique({ where: { id } });
    
    if (!existe) throw new AppError('Filme não encontrado', 404);

    await prisma.filme.delete({ where: { id } });
    return { mensagem: 'Filme removido' };
  },
};