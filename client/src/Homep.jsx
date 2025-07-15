import React from "react";

function Homep() {
  // const navigate = useNavigate();

 const backgroundStyle = {
  backgroundImage: "url('public/images/vecteezy_ai-generated-bookshelves-with-warm-lighting-filled-with_38511391.jpeg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
  color: "white"
};


  return (
    <>
      <div style={backgroundStyle}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="studentinfo">Student details</a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="bookdetail">Book details</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="bookissue">BOOK-Issue</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="returnbook">BOOK-Return</a>
                </li>
                 
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
                 
              </form>
            </div>
          </div>
        </nav>

        <div>
          <h1><center>welcome  MCA LIBRARY</center></h1>
          <h2><center>THIS LIBRAY FROM APSU MCA DEPARTMANT</center></h2>
          <div ></div>
        </div>
      </div>
    </>
  );
}

export default Homep;
