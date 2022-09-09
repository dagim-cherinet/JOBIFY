import Jobs from "../models/Jobs.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checkPermission.js";

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
  const jobs = await Jobs.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("please provide all values");
  }
  const job = await Jobs.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  //check permission
  // console.log(typeof req.user.userId, typeof job.createdBy);
  checkPermission(req.user, job.createdBy);
  const updatedJob = await Jobs.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Jobs.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  //check permission
  // console.log(typeof req.user.userId, typeof job.createdBy);
  checkPermission(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "success! job removed" });
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, getAllJob, deleteJob, updateJob, showStats };
