import { Router } from "express";
import { userController } from "../controllers/UserController";

export const userRouter = Router();

// Endpoints usuario
userRouter.get('/usuarios', async (_, res) => {
  return userController.listarTodosUsuarios(_, res)
})

userRouter.get('/usuarios/:id', async (req, res) => {
  return userController.buscarUsuarioId(req, res)
})

userRouter.post("/usuarios", async (req, res) => {
  return userController.criarUsuario(req, res)
})


userRouter.put("/usuarios/:id", async (req, res) => {
  return userController.atualizarUsuario(req, res)
})

userRouter.delete('/usuarios/:id', async (req, res) => {
  return userController.deletarUsuario(req, res)
})