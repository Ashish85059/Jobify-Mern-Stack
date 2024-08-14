import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/customFetch";

day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const [data2, setData] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await customFetch.get("/users/current-user");
      setData(data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteHandler = async () => {
    try {
      await customFetch.delete(`/jobs/${_id}`);
      toast.success("Job deleted successfully");
      navigate("/dashboard"); // Redirect to the job list page after deletion
    } catch (error) {
      toast.error("Failed to delete the job");
      console.error(error);
    }
  };

  const applyHandler = async () => {
    try {
      const data = await customFetch.post(`/jobs/apply-job/${_id}`);
      toast.success(data.data.msg);
    } catch (error) {
      toast.error("Already applied for this job");
      console.error(error);
    }
  };

  const date = day(createdAt).format("MMM Do, YYYY");

  if (!data2 || !data2.user) return null;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          {/* <div className={`status ${jobStatus}`}>{jobStatus}</div> */}
        </div>
        <footer className="actions">
          {data2.user.mainRole === "Employee" ? (
            <button
              type="button"
              onClick={applyHandler}
              className="btn delete-btn"
            >
              Apply
            </button>
          ) : (
            <>
              <Link to={`edit-job/${_id}`} className="btn edit-btn">
                Edit
              </Link>
              <button
                type="button"
                onClick={deleteHandler}
                className="btn delete-btn"
              >
                Delete
              </button>
            </>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
