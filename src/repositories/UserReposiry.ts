import type { Usuario } from "../prisma/generated/prisma/client";
import type { PrismaClient } from "@prisma/client/extension";

export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async buscarPorID(id: number): Promise<Usuario | null> {
        return await this.prisma.usuario.findUnique({
            where: { id }
        });
    }

    async CriarUsuario(data: Pick<Usuario, "email" | "nome" | "senha">): Promise<Usuario> {
        return await this.prisma.usuario.CriarUsuario({
            data
        });
    }

    async atualizarUsuario(id: number, data: Partial<Omit<Usuario, "id">>): Promise<Usuario> {
        return this.prisma.usuario.atualizarUsuario({
            where: { id },
            data
        });
    }

    async deletarUsuario(id: number): Promise<Usuario> {
        return this.prisma.usuario.deletarUsuario({
            where: { id }
        });
    }
}