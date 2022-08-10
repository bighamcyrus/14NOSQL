const { Thoughts, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThoughts(req, res) {
    thoughts.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: Add comments to the functionality of the createApplication method
// This creates a new application document from the models application.js application schema
// Creates a application in the USER document

  createThoughts(req, res) {
    thoughts.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtId } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // TODO: Add comments to the functionality of the updateApplication method
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // TODO: Add comments to the functionality of the deleteApplication method

//  it will find the application by ID and delete the  application with that ID. 
  deleteThoughts(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thougthId },
              { $pull: { thougt: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Application created but no user with this id!',
            })
          : res.json({ message: 'Application successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: Add comments to the functionality of the addTag method
  addTag(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { tags: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thoughts with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: Add comments to the functionality of the addTag method
  removeTag(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { tags: { tagId: req.params.tagId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thoughts with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
