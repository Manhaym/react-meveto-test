import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import {
  courses,
  subjects_course1,
  subjects_course2,
  subjects_course3,
  valDates
} from "./data.js";

const customStyles = {
  content: {
    width: "150px",
    height: "200px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #979797",
    boxShadow: "6px 0px 18px rgba(0, 0, 0, 0.06)"
  }
};

Modal.setAppElement("#root");

function App() {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [addNote, setAddNote] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  function isInArray(array, value) {
    return (
      (
        array.find(item => {
          return item === moment(value).format("YYYY-MM-DD");
        }) || []
      ).length > 0
    );
  }

  useEffect(() => {
    let msg = "";
    if (course.length === 0) msg += "You must select one course.\n";
    if (subject.length === 0) msg += "You must select one subject.\n";
    if (addNote.length > 0 && addNote.length < 20)
      msg += "You must write addition notes more than 20 characters.\n";
    if (!isInArray(valDates, startDate))
      msg +=
        "Your selected course and subject is not offered beginning from your selected date";
    setValidationMsg(msg);
  }, [course, subject, startDate, addNote]);

  const handleSubject = option => {
    setSubject(option);
  };

  const handleStartDate = date => {
    setStartDate(date);
  };

  const handleNote = event => {
    setAddNote(event.target.value);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleSubmit = e => {
    if (validationMsg.length > 0) {
      alert("No validation.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModal(true);
    }, 3000);

    e.preventDefault();
  };

  return (
    <Panel>
      <form onSubmit={handleSubmit}>
        <div
          className="course"
          onChange={e => {
            setCourse(e.target.value);
            setSubject("");
          }}
        >
          {courses.map(course => (
            <label key={course}>
              <input type="radio" value={course} name="course" />
              {course}
            </label>
          ))}
        </div>

        <div style={{ height: "50px" }}>
          {course === "Technical Report Writing" && (
            <Select
              value={subject}
              onChange={handleSubject}
              options={subjects_course1}
            />
          )}

          {course === "English Literature" && (
            <Select
              value={subject}
              onChange={handleSubject}
              options={subjects_course2}
            />
          )}

          {course === "Computer Sciences" && (
            <Select
              value={subject}
              onChange={handleSubject}
              options={subjects_course3}
            />
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <DatePicker selected={startDate} onChange={handleStartDate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <textarea
            maxLength="500"
            value={addNote}
            onChange={handleNote}
            rows="10"
            cols="50"
          />
        </div>
        <div className="error">{validationMsg}</div>
        <input
          type="submit"
          value="Submit"
          style={{ opacity: isLoading ? "40%" : "100%", height: "30px" }}
        />
      </form>
      <Modal
        isOpen={modal}
        onRequestClose={() => handleCloseModal()}
        style={customStyles}
        contentLabel="Create a Post"
      >
        <div>Your course has been successfully registered.</div>
        <button onClick={() => handleCloseModal()}>Ok</button>
      </Modal>
    </Panel>
  );
}

const Panel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export default App;
