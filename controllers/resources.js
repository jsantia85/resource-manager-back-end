import { Resource } from '../models/resource.js'

function create(req, res) {
  req.body.owner = req.user.profile
  Resource.create(req.body)
  .then(resource => {
    Resource.findById(resource._id)
    .populate('owner')
    .then(populatedResource => {
      res.json(populatedResource)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Resource.find({})
  .populate('owner')
  .then(resources => {
    res.json(resources)
  })
}


export {
  create,
  index,
}