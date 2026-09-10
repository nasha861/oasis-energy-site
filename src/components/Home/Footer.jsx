export default function Footer() {
  return (
   
    <footer className="footer">
  <div className="footer-top">
    <div className="footer-left">
      <h3>OASIS ENERGY</h3>
      <p>(+234 808 3887 719)</p>
      <p>Plot 207 Garki, Abuja</p>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-x-twitter"></i></a>
      </div>
    </div>

    <div className="footer-links">
      <div>
        <h4>Solar Solutions</h4>
        <ul>
          <li><a href="#">Home Solar Systems</a></li>
          <li><a href="#">Home Battery Storage</a></li>
          <li><a href="#">How Solar Works</a></li>
          <li><a href="#">Installation Process</a></li>
          <li><a href="#">Warranty</a></li>
        </ul>
      </div>
      <div>
        <h4>Our Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Our Service Areas</a></li>
        </ul>
      </div>
      <div>
        <h4>OASIS ENERGY</h4>
        <ul>
          <li><a href="#">Leadership</a></li>
          <li><a href="#">Newsroom</a></li>
          <li><a href="#">Licenses</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Oasis. All rights reserved.</p>
   
    <a href="#" className="cta-btn">Start your Quote</a>
  </div>
</footer>
  );
}