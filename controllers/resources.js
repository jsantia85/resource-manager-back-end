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

function deleteOne(req, res) {
  Resource.findById(req.params.id)
  .then(resource => {
    if (resource.owner._id.equals(req.user.profile)){
      Resource.findByIdAndDelete(resource._id)
      .then(deletedResource => {
        res.json(deletedResource)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Resource.findById(req.params.id)
  .then(resource => {
    if (resource.owner._id.equals(req.user.profile)) {
      Resource.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedResource => {
        res.json(updatedResource)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


export {
  create,
  index,
  deleteOne as delete,
  update,
}