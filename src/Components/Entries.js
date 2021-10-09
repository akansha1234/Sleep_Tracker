import React, { useState, useEffect } from "react";
import { database } from "../Config/firebase.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Chart from "./Chart.js";
const Entries = ({ user }) => {
  const [entry, setEntry] = useState([]);
  const [noEntry, setNoEntry] = useState(false);
  //const [uid,setUid] = useState( " ")
  useEffect(() => {
    database
      .collection("entries")
      .where("name", "==", user.displayName)
      .onSnapshot((snap) => {
        setEntry(snap.docs.map((doc) => doc.data()));
        //setUid(snap.docs.map((doc) => doc.id))
      });
    if (entry.length === 0) {
      setNoEntry(true);
    } else {
      setNoEntry(false);
    }
    //console.log(entry.length, "length");
    // console.log(noEntry);
    // return () => {
    //   //console.log("cleanup"); // This worked for me
    // };
  }, [entry.length]);

  const deleteEntry = (id) => {
    var entry_query = database.collection("entries").where("id", "==", id);
    entry_query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        console.log(doc);
      });
    });
  };

  return (
    <div className="entries">
      {noEntry ? (
        <h1>You haven't created any entry yet</h1>
      ) : (
        <>
          <h1> Your Sleep Entries</h1>
          {entry.map(({ date, wakeupTime, sleepTime, duration, id }) => (
            <div className="entries-desc" key={id}>
              <div>
                <p>Date</p>
                {date}
              </div>
              <div>
                <p>Asleep Time</p>
                {sleepTime}
              </div>
              <div>
                <p>Wakeup Time</p>
                {wakeupTime}
              </div>
              <div>
                <p>Duration</p>
                {duration}
              </div>
              <div className="del">
                <DeleteIcon onClick={() => deleteEntry(id)} />
              </div>
            </div>
          ))}
          <Chart entry={entry} />
        </>
      )}
    </div>
  );
};
export default Entries;
