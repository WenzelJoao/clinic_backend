import type { PrismaClient, Prontuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ProntuarioRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTodosProtuarios() {
        const prontuario = await this.prisma.prontuario.findMany()
        return prontuario
    }

    async buscarProntuarioId(idProntuario: number) {
        const prontuario = await prisma.prontuario.findUnique({
            where: {
                id: idProntuario
            }
        })
        return prontuario
    }

    async criarProntuario(dadosProntuario: Partial<Prontuario>) {
        return await prisma.prontuario.create({
            data: {
                descricao: dadosProntuario.descricao || "",
                data: new Date(dadosProntuario.data || ""),
                medico_responsavel_id: dadosProntuario.medico_responsavel_id!,
                paciente_id: dadosProntuario.paciente_id || 0
            }
        })

    }

    async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Omit<Prontuario, 'id'>) {
        const prontuarioAtualizado = await prisma.prontuario.update({
            data: {
                ...dadosParaAtualizar,
                descricao: (dadosParaAtualizar.descricao),
                data: (dadosParaAtualizar.data),
                medico_responsavel_id: (dadosParaAtualizar.medico_responsavel_id)
            },
            where: {
                id: idProntuario
            }
        })
        return prontuarioAtualizado
    }

    async deletarProtuario(idProntuario: number) {
        const prontuario = await prisma.prontuario.delete({
            where: {
                id: idProntuario
            }
        })
        return prontuario
    }
}

export const prontuarioRepository = new ProntuarioRepository(prisma)