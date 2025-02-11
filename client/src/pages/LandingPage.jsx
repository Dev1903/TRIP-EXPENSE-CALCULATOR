import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
        <div className="container">
        <nav className="navbar px-4 pt-4">
        <a className="navbar-brand fs-4 fw-bold" href="#">Trip Expense</a>
        <div className="position-relative">
          <img
            src="/images/empty_profile.png" // Placeholder profile image
            className="rounded-circle hover-big-icons" 
            alt="Profile"
            style={{ cursor: "pointer"}}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            height={'40px'}
            width={'auto'}
          />
          {dropdownOpen && (
            <div className="position-absolute end-0 mt-2 bg-white shadow rounded  " style={{minWidth: '100px', zIndex: '2'}}>
              <Link to="/signin" className="d-block text-dark text-decoration-none p-3 hover-shadow">Sign In</Link>
            </div>
          )}
        </div>
      </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="row">
        <div className="container mt-5 mb-5">
        <div className="text-center rounded-5 py-5 bg-primary text-white hover-big ">
        
        <h1 className="fw-bold">Simplify Your Trip Expenses</h1>
        <p className="lead">Easily track and split costs with your friends</p>
      </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="row">
      <div className="container mb-5 ">
        <h2 className="text-center mb-5 mt-5">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4 text-center mt-4 hover-big">
            <i className="fas fa-calculator fa-3x text-primary"></i>
            <h5 className="mt-4">Easy Calculations</h5>
            <p>Track expenses and split costs effortlessly.</p>
          </div>
          <div className="col-md-4 text-center mt-4 hover-big">
            <i className="fas fa-users fa-3x text-primary"></i>
            <h5 className="mt-4">Group Management</h5>
            <p>Add friends and manage shared expenses easily.</p>
          </div>
          <div className="col-md-4 text-center mt-4 hover-big">
            <i className="fas fa-lock fa-3x text-primary"></i>
            <h5 className="mt-4">Secure & Reliable</h5>
            <p>Your data is safe with our encrypted platform.</p>
          </div>
        </div>
      </div>
      </div>
      
      {/* Reviews Section */}
      <div className="row bg-light">
      <div className="container">
      <div className="col">
        <h2 className="text-center pt-5 mb-5">What Our Users Say</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card rounded-5 shadow-lg p-4 mb-3 text-center border-0 position-relative hover-big">
              <i className="fas fa-user-circle fa-4x text-primary mb-3"></i>
              <p className="fst-italic">"This app made our trip budgeting so easy!"</p>
              <strong className="text-primary">- Alex J.</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg rounded-5 p-4 mb-3 text-center border-0 position-relative hover-big">
              <i className="fas fa-user-circle fa-4x text-primary mb-3"></i>
              <p className="fst-italic">"A must-have for group travel expenses!"</p>
              <strong className="text-primary">- Sarah L.</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg rounded-5 p-4 mb-3 text-center border-0 position-relative hover-big">
              <i className="fas fa-user-circle fa-4x text-primary mb-3"></i>
              <p className="fst-italic">"User-friendly and highly reliable."</p>
              <strong className="text-primary">- Michael B.</strong>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* Footer */}
      <div className="bg-dark text-white text-center py-5 mt-5 row">
        <div className="container">
        <div className="col">
          <h5>Connect with Us</h5>
          <div className="d-flex justify-content-center mt-4 mb-4">
            <a href="https://www.facebook.com" className="text-white mx-3 hover-big-icons"><i className="fab fa-facebook fa-2x"></i></a>
            <a href="https://www.instagram.com" className="text-white mx-3 hover-big-icons"><i className="fab fa-instagram fa-2x"></i></a>
            <a href="https://www.x.com" className="text-white mx-3 hover-big-icons"><i className="fab fa-twitter fa-2x"></i></a>
            <a href="https://www.linkedin.com/in/bristidev-burman1903/" className="text-white mx-3 hover-big-icons"><i className="fab fa-linkedin fa-2x"></i></a>
          </div>
          <p className="pt-3 pb-3">Email: support@tripexpense.com <br /><br /> Phone: +123 456 7890</p>
          <p>&copy; 2025 Trip Expense. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    </div>
  );
}