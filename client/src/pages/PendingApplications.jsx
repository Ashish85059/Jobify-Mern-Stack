import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { FiCheckSquare } from "react-icons/fi";
import Wrapper from "../assets/wrappers/PendingJob"; // Ensure this path is correct

export const loader = async () => {
  try {
    const { data: user } = await customFetch.get("/users/current-user");
    const {
      data: { jobs },
    } = await customFetch.get("/jobs");
    const { data: allUsers } = await customFetch.get("/users/getAllUsers");
    return { user, jobs, allUsers };
  } catch (error) {
    toast.error("Failed to load data.");
    return redirect("/");
  }
};

const PendingApplications = () => {
  const clickHandler = async (userId, jobId) => {
    try {
      const response = await customFetch.post("/jobs/approve-application", {
        userId,
        jobId,
      });
      toast.success(response.data.msg);
    } catch (error) {
      toast.error("Failed to approve job.");
    }
  };

  const rejectHandler = async (userId, jobId) => {
    try {
      const response = await customFetch.post("/jobs/reject-application", {
        userId,
        jobId,
      });
      toast.success(response.data.msg);
    } catch (error) {
      toast.error("Failed to reject job.");
    }
  };

  const { jobs, allUsers } = useLoaderData();

  const jobsWithApplicants = jobs.filter((job) => job.appliedBy.length > 0);

  return (
    <div>
      {jobsWithApplicants.length > 0 ? (
        jobsWithApplicants.map((job) => (
          <Wrapper key={job._id}>
            <header>
              <div className="main-icon">
                <FiCheckSquare />
              </div>
              <div className="info">
                <h5>{job.position}</h5>
                <p>{job.company}</p>
              </div>
            </header>
            <div className="content">
              <h5>Location: {job.jobLocation}</h5><br />
              <h5>Type: {job.jobType}</h5><br/>
              <h4>Applicants:</h4>
              <ul>
                {job.appliedBy.map((userId) => {
                  const applicant = allUsers.users.find(
                    (u) => u._id === userId
                  );
                  return (
                    <li key={userId} className="applicant-item">
                      {applicant
                        ? `${applicant.name} (${applicant.email})`
                        : "User not found"}
                      <div className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => clickHandler(userId, job._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => rejectHandler(userId, job._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Wrapper>
        ))
      ) : (
        <p>No pending applications.</p>
      )}
    </div>
  );
};

export default PendingApplications;
