import Jobs from "../models/Jobs.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJob = async (req, res) => {
  res.send("get all job");
};
const deleteJob = async (req, res) => {
  res.send("delete job");
};
const updateJob = async (req, res) => {
  res.send("update job");
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, getAllJob, deleteJob, updateJob, showStats };
