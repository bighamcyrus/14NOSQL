const { Thoughts, User } = require('../Modules');

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
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

  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
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
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // TODO: Add comments to the functionality of the deleteApplication method

//  it will find the application by ID and delete the  application with that ID. 
  deleteThoughts(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
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
 };
