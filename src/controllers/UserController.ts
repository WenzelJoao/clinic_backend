import type { Request, Response } from "express";
import type { Usuario } from "../prisma/generated/prisma/client";

class UserController {
    constructor(private readonly service: UserService) {
    }

    async buscarUsuarioId(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Partial<Usuario>
            const dadosBuscar = await this.service.buscarUsuarioId(dadosUsuario.id)
            return res.status(201).json({
                message: "Usuário localizado!",
                data: dadosBuscar
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error
            })

        }
    }

    async buscarUsuario(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Partial<Usuario>
            const dadosBuscar = await this.service.buscarPorId(dadosUsuario)
            return res.status(201).json({
                message: "usuários localizados!",
                data: dadosBuscar
            })

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })

        }
    }

    async criarUsuario(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Partial<Usuario>
            const usuarioCriado = await this.service.usuario.create({
                data: {
                    email: dadosUsuario.email,
                    nome: dadosUsuario.nome || null,
                }
            })
            return res.status(201).json(usuarioCriado)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async criarUsuarioId(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>
            const usuarioAtualizado = await this.service.usuario.update({
                data: {
                    ...dadosParaAtualizar
                },
                where: {
                    id: idUsuario
                }
            })

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {

        }
    }

    async deletarUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuarioDeletado = await this.service.usuario.delete({
                where: {
                    id: idUsuario
                }
            })

            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso!",
                data: usuarioDeletado
            });
        } catch (error) {

        }
    }
}