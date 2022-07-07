import express from "express";
const router = express.Router();
//importing the controllers
import {
  createJob,
  deleteJob,
  getAllJob,
  showStats,
  updateJob,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJob);
// place stats above the colon id otherwise it considers stats(string) as an id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
