import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class PatientRepository {
    constructor(private readonly prisma:PrismaClient) {
        this.prisma = prisma 
    }

    async listarTodosPacientes() {
        const paciente = await prisma.paciente.findMany()
        return paciente
    }

    async buscarPacienteId(idPaciente: number) {
        const paciente = await prisma.paciente.findUnique({
            where: {
                id: idPaciente
            }
        })

        return paciente
    }

    async criarPaciente(dadosPaciente: Partial<Paciente>) {
        return this.prisma.paciente.create({
            data: {
                nome:  dadosPaciente.nome || "",
                cpf: dadosPaciente.cpf || "",
                telefone: dadosPaciente.telefone || "",
                email: dadosPaciente.email || "",
                data_nascimento: new Date(dadosPaciente.data_nascimento || ""),
                sexo: dadosPaciente.sexo || "",
                responsavel: dadosPaciente.responsavel || "",
            }
        })
    }

    async atualizarPaciente(idPaciente:number, dadosParaAtualizar: Omit<Paciente, 'id'>){
        const pacienteAtualizado = await prisma.paciente.update({
            data: {
                ...dadosParaAtualizar,
                telefone: (dadosParaAtualizar.telefone),
                email: (dadosParaAtualizar.email),
                responsavel: (dadosParaAtualizar.responsavel)
            },
            where: {
                id: idPaciente
            }
        })
        return pacienteAtualizado
    }

    async deletarPaciente(idPaciente:number) {
        const paciente = await prisma.paciente.delete({
            where: {
                id: idPaciente
            }
        })
        return paciente
    }
}

export const pacienteRepository = new PatientRepository(prisma)