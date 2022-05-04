const router = require('express').Router()

const { Sequelize } = require('sequelize')
const User = require('../models/User')


//criação de dados
router.post('/', async (req, res) =>{
    const {nome, idade, cpf, email} = req.body
    
    const user = {
        nome, idade, cpf, email
    }

    try{
        if(req.body.users){
            const users = req.body.users
            await User.bulkCreate(users)
            res.status(201).json({message: "Usuários inseridos com sucesso!"})
            return
        }
        
        await User.create(user)
        res.status(201).json({message: "Usuário inserido com sucesso!"})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

//leitura de dados
router.get('/', async (req, res) => {
    try{
        const users = await User.findAll()
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const user = await User.findByPk(id)

        if(!user) {
            res.status(422).json({message: 'Usuário não foi encontrado!'})
            return
        }

        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

//atualização de dados
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {nome, idade, cpf, email} = req.body
    const user = {
        nome, idade, cpf, email
    }

    try{
        const updatedUser = await User.update(user, {
            where: {id: id}
        })
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

//deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)

    if(!user) {
        res.status(422).json({message: 'Usuário não foi encontrado!'})
        return
    }

    try{
        await User.destroy({where: {
            id: id
        }})
        res.status(204).json({message: "Usuário removido com sucesso!"})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

module.exports = router