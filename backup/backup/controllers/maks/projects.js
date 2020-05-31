const Projects = require('../../models/maks/projects')

exports.getIndex = (req, res) => {
    Projects.find({})    
      .sort({ _id: -1 })
      .then(projects => res.send({ projects: projects }))
      .catch(err => res.sendStatus(500))
}

exports.getProject = (req, res) => {
    const projectId = req.body.id;

    Projects.findById(projectId)
      .then(user => res.send({ user: user }))
      .catch(err => res.sendStatus(500))
}