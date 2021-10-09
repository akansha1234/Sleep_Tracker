import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Entries from "./Entries.js";
import { database } from "../Config/firebase.js";
import Navbar from "./Navbar.js";
const Entry = ({ user, newUser }) => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(" ");
  const [sleepTime, setSleepTime] = useState(" ");
  const [wakeupTime, setWakeupTime] = useState(" ");
  const [addentry, setAddEntry] = useState(false);
  function revisedRandId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
  }
  let id = revisedRandId();
  //console.log(id);
  const handleChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleTime = (time) => {
    const [hours, minutes] = time.split(":");
    const totalSeconds = +hours * 60 * 60 + +minutes * 60;
    const totalHours = parseInt(Math.floor(totalSeconds / 3600));
    //console.log(totalSeconds, "sec");
    //console.log(totalHours, "hrs");
    return totalHours;
  };
  let a = handleTime(sleepTime);
  let b = handleTime(wakeupTime);
  if (b <= a) {
    b += 12;
  }
  //console.log(b);
  let duration = Math.abs(b - a) + "hrs";
  //console.log(duration);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(startDate);
    // console.log(startDate.length);
    if (startDate.length <= 1) {
      console.log(startDate);
      console.log(startDate.length);
      alert("Please fill the full form");
      return;
    }
    if (wakeupTime.length < 5) {
      alert("Please fill the full form");
      return;
    }
    if (sleepTime.length < 5) {
      alert("Please fill the full form");
      return;
    }
    database.collection("entries").add({
      name: user.displayName,
      date: startDate,
      sleepTime: sleepTime,
      wakeupTime: wakeupTime,
      duration: duration,
      id: id
    });
    setAddEntry(true);
    setShow(false);
  };

  return (
    <div className="entry">
      <Navbar />
      <div className="entry-desc">
        <button onClick={handleShow} className="add-entry">
          Add your entry
        </button>
        {/* <p className="new-user">You haven't created any entry yet</p> */}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Body>
            <div>
              <p>Select the date</p>
              <input
                type="date"
                min={new Date()}
                selected={startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Select your sleeping time</p>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
              />
            </div>
            <div>
              <p> Select your wakeup time </p>
              <input
                type="time"
                value={wakeupTime}
                onChange={(e) => setWakeupTime(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {user ? <Entries user={user} /> : " "}
      </div>
    </div>
  );
};
export default Entry;
