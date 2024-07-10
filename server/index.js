import express from 'express'
import { param } from 'express-validator'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())
const connection = 'mongodb+srv://alisson:01020304@cluterdidatico.wn2zlk4.mongodb.net/?retryWrites=true&w=majority&appName=CluterDidatico'
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3001, () => console.log('it´s working server...')))
    .catch((error) => console.log(`${error.message}`));
const dateSchema = new mongoose.Schema({
    nome: String
});
const date = mongoose.model('date', dateSchema)
app.post('/', async (req, res) => {
    const dates = new date({ nome: req.body.nome })
    await dates.save()
    console.log('Deu certo!!!!!')
})
app.get('/', async (req, res) => {
    const dates = await date.find()
    dates.map((value, id) => {
        console.log(`${value.nome}  ${value.id}  ${id + 1}`)
    })
})


app.delete('/', async (req, res) => {
    const dates = await date.find()

    for (const value of dates) {
        if (/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/g.test(value.nome)) {
            console.log(value.nome + ' excluido')
            await date.findByIdAndDelete(value.id)
        } else {
            console.log(value.nome + ' mantido')
        }
    }
})




app.delete('/:id', param('id').isInt(), async (req, res) => await date.findByIdAndDelete(req.params.id))

app.delete('/All', async (req, res) => {
    const dates = await date.find()
    for (const value of dates) {
        await date.findByIdAndDelete(value.id)
    }
    console.log("Todos foram deletados!")
})


app.put('/', async (req, res) => {
    const dates = await date.find()
    for (const value of dates) {
        await date.updateMany({ nome: value.nome }, { nome: 'mesma coisa para todos' })
    }
})
