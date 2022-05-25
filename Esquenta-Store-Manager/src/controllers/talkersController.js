const talkersService = require('../services/talkersService');

const getAllTalkers = async (req, res) => {
  const response = await talkersService.getAllTalkers();

  return res.status(200).json(response);
}

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const response = await talkersService.getTalkerById(id);

  return res.status(200).json(response);
}

const createTalker = async (req, res) => {
  const { name, age, email } = req.body;

  const response = await talkersService.createTalker(name, age, email);

  return res.status(201).json(response);
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker
};
