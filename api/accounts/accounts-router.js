const router = require('express').Router()

const accounts = require('./accounts-model.js')
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware.js')

router.get('/', async (req, res, next) => {
  const accounts = await accounts.getAll()
  res.status(200).json(accounts)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const newAccount = await accounts.create(req.accountPayload) 
  res.status(201).json(newAccount)
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, (req, res, next) => {
  const updatedAccount = await accounts.updateById(req.params.id, req.accountPayload)
  res.status(200).json(updatedAccount)
})

router.delete('/:id', checkAccountId, (req, res, next) => {
  accounts.deleteById(req.params.id)
  res.status(200).json(req.account)
})

router.use((err, req, res, next) => {
  
})

module.exports = router;
