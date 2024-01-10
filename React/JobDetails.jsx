import React, { useEffect, useState } from "react";
import debug from "sabio-debug";

import "./jobdetails.css";
import jobService from "services/jobService";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import SkillMatchCard from "components/jobs/SkillMatchCard";
import SkillsMatchChecklist from "components/jobs/SkillsMatchChecklist";

function JobDetails() {
  const _logger = debug.extend("JobDetails");
  const { state } = useLocation();
  const nav = useNavigate();
  const [job, setJob] = useState({
    id: 0,
    isActive: false,
    createdBy: {
      id: 0,
      firstName: "",
      lastName: "",
      mi: "",
      email: "",
      avatarUrl: "",
    },
    phone: "",
    email: "",
    dateCreated: "",
    dateModified: "",
    skills: [],
    type: {
      id: 0,
      name: "",
    },
    location: {
      id: 0,
      locationType: {
        id: 0,
        name: "",
      },
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
      state: {
        id: 0,
        name: "",
      },
      latitude: 0,
      longitude: 0,
      dateCreated: "",
      dateModified: "",
    },
    title: "",
    description: "",
    requirements: "",
    contact: "",
  });
  _logger(job, setJob);

  useEffect(() => {
    jobService
      .getMatch(state.payload.id)
      .then(responseHandler)
      .catch(responseHandler);
  }, []);

  const responseHandler = (response) => {
    job.matchedSkills = response.item || [];

    if (state?.type === "JOB_VIEW") {
      setJob((prevState) => {
        const newState = { ...prevState, ...state.payload };
        return newState;
      });
    }
  };

  [state];

  const backToOrg = () => {
    nav(`/organization/single/${state.payload.orgId}`);
  };
  return (
    <Card className="mb-4 border border-light">
      <Card.Body className="mb-4 d-flex flex-column justify-content-center">
        <Card.Body>
          <div className="row border border-light bg-white rounded mx-auto my-3 shadow-lg">
            <div className="col-2 my-2">
              <img
                src={state.payload.orgLogo}
                alt="broken"
                className="h-100 w-100 rounded"
              />
            </div>
            <div className="col-7 connected-name my-auto">
              <div className="display-2">{state.payload.title}</div>
            </div>
            <div className="col-3 my-auto">
              <h3 className="mb-0">Contact Information:</h3>
              <h6 className="text-muted">
                <i className="fe fe-user"></i> {state.payload.contact}
                <br />
                <i className="fe fe-mail"></i> {state.payload.email}
              </h6>
            </div>
          </div>
        </Card.Body>
        <div className="mx-4 row">
          <hr />
          <h6 className="col-9">Posted:</h6>
          <p className="col-3">{state.payload.dateCreated.slice(0, 10)}</p>
          <hr />
          <h6 className="col-9">Job Type:</h6>
          <p className="col-3">{state.payload.type.name}</p>
          <hr />
          <h6 className="col-9">Job Location:</h6>
          <p className="col-3">{`${state.payload.location.lineOne} ${state.payload.location.city}, ${state.payload.location.state.name}`}</p>
          <hr />
          {job.skills ? (
            <>
              <div className="row m-0 p-0">
                <h6 className="col-9 my-auto">
                  Matching Skills:
                  <br />
                  <SkillMatchCard job={job} index={0} />
                  <br />
                  Missing Skills:
                  <br />
                  <SkillMatchCard job={job} index={1} />
                  <br />
                </h6>
                <div className="col-3 mb-3">
                  <SkillsMatchChecklist
                    job={job}
                    mainClass="job-skills-checklist"
                  />
                </div>
              </div>
              <hr />
            </>
          ) : (
            ""
          )}
          <h2>Description</h2>
          <p>{job.description}</p>
          <hr />
          <h2>Requirements</h2>
          <div
            dangerouslySetInnerHTML={{ __html: state.payload.requirements }}
          />
          <hr />
          <h2>Organization</h2>
          <div
            dangerouslySetInnerHTML={{ __html: state.payload.orgDescription }}
          />
          <button className="btn btn-primary mt-5" onClick={backToOrg}>
            Back To Orgnaization
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default JobDetails;
