import React from "react";
import Wrapper from "../assets/wrappers/AppliedJobs";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data: user } = await customFetch.get("/users/current-user");
    const {
      data: { jobs },
    } = await customFetch.get("/jobs");
    return { user, jobs };
  } catch (error) {
    toast.error("Failed to load data.");
    return redirect("/");
  }
};

const AppliedJobs = () => {
  const { user, jobs } = useLoaderData();

  const applied = jobs.filter((job) =>
    user.user.appliedJobs.some((appliedJob) => appliedJob.id === job._id)
  );

  return (
    <Wrapper>
      {applied.length > 0 ? (
        applied.map((job) => {
          const appliedJob = user.user.appliedJobs.find(
            (item) => item.id === job._id
          );

          return (
            <Wrapper key={job._id} className="job-card">
              <h3>{job.company}</h3>
              <h5>Location: {job.jobLocation}</h5>
              <h5>Job Type: {job.jobType}</h5>
              <h5 className="status">
                Status: {appliedJob ? appliedJob.status : "Unknown"}
              </h5>
            </Wrapper>
          );
        })
      ) : (
        <p>No jobs applied for.</p>
      )}
    </Wrapper>
  );
};

export default AppliedJobs;
