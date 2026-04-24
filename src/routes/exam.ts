import { Router } from "express";
import { examController } from "../controllers/ExamController";

export const examRouter = Router()

examRouter.get('/exames', async (_, res) => {
  return examController.listarTodosExames(_,res)
})

examRouter.get('/exames/:id', async (req, res) => {
  return examController.buscarExameId(req, res)
})

examRouter.post("/exames", async (req, res) => {
  return examController.criarExame(req, res)
})

examRouter.put("/exames/:id", async (req, res) => {
  return examController.atualizarExame(req,res)
})

examRouter.delete('/exames/:id', async (req, res) => {
  return examController.deletarExame(req, res)
})