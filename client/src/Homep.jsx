import React, { useState } from "react";

function Homep() {
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("student");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      alert("Please enter ID");
      return;
    }

    try {
      let res;

      if (searchType === "student") {
        res = await fetch(
          `https://library-management-project-1-0zma.onrender.com/api/studentinfo/search/${searchId}`
        );
      } else {
        res = await fetch(
          `https://library-management-project-1-0zma.onrender.com/api/bookreturn/search/${searchId}`
        );
      }

      if (!res.ok) {
        throw new Error("Not found");
      }

      const data = await res.json();

      if (searchType === "student") {
        alert(`Student Found: ${data.stuName}`);
      } else {
        alert(`Book Found: ${data.title}`);
      }

    } catch (error) {
      alert("Record not found");
    }
  };

  const backgroundStyle = {
    backgroundImage:
      "url('/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    color: "white",
  };

  return (
    <div style={backgroundStyle}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">

            <a className="navbar-brand" href="studentinfo">
              Student details
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="bookdetail">
                  Book details
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="bookissue">
                  BOOK-Issue
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="returnbook">
                  BOOK-Return
                </a>
              </li>

            </ul>

            <form className="d-flex" onSubmit={handleSearch}>

              <select
                className="form-select me-2"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="book">Book</option>
              </select>

              <input
                className="form-control me-2"
                type="text"
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />

              <button className="btn btn-outline-success" type="submit">
                Search
              </button>

            </form>

          </div>
        </div>
      </nav>

      <div className="text-center mt-5">
        <h1>Welcome MCA LIBRARY</h1>
        <h2>This Library From APSU MCA Department</h2>
      </div>

    </div>
  );
}

export default Homep;