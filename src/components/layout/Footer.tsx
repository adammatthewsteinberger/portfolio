import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="trust-badge">
              <i className="fas fa-lock"></i>
              <span>SSL Secured</span>
            </div>
          </div>
          <div className="col-auto">
            <div className="trust-badge">
              <i className="fas fa-headset"></i>
              <span>Live Support</span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <a href="https://tidycal.com/realadammatthew" className="fw-bold">Schedule a Free Consultation</a>
            &nbsp;|&nbsp;
            <Link href="/contact" className="fw-bold">Contact for Employment</Link>
            &nbsp;|&nbsp;
            <a href="https://chat.adam.matthewsteinberger.com" className="fw-bold">Try the Chatbot Demo</a>
            &nbsp;|&nbsp;
            <Link href="/novice-to-navigator" className="fw-bold">Learn about AI</Link>
            &nbsp;|&nbsp;
            <Link href="/blog" className="fw-bold">Read the Blog</Link>
            &nbsp;|&nbsp;
            <a href="http://eepurl.com/jiYXCQ" className="fw-bold">Get the Newsletter</a>
            &nbsp;|&nbsp;
            <Link href="/services" className="fw-bold">My Services</Link>
            &nbsp;|&nbsp;
            <Link href="/sitemap" className="fw-bold">Sitemap</Link>
          </div>
          <div className="col-auto">
            <div className="d-flex gap-3 justify-content-center flex-wrap my-3">
              <a
                href="https://www.linkedin.com/in/realadammatthew/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a
                href="https://github.com/realadammatthew"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github fa-2x"></i>
              </a>
              <a
                href="https://x.com/realadammatthew"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-x-twitter fa-2x"></i>
              </a>
              <a
                href="https://instagram.com/realadammatthew/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href="https://facebook.com/adammatthewsteinberger"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href="https://www.youtube.com/@AdamMatthewSteinberger"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
              <a
                href="https://coff.ee/realadammatthew"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy me a Coffee"
              >
                <i className="fas fa-coffee fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <a href="https://humbleberger.org" className="fw-bold">Ministry</a>
            &nbsp;|&nbsp;
            <a href="https://messiahfirst.org" className="fw-bold">Policy</a>
            &nbsp;|&nbsp;
            <a href="https://chat.adam.matthewsteinberger.com" className="fw-bold">Chat</a>
            &nbsp;|&nbsp;
            <a href="https://theautisticapologist.com/" className="fw-bold">Blog</a>
          </div>
        </div>
        <div className="mt-3">
          © Copyright {new Date().getFullYear()} <Link href="/">Adam Matthew Steinberger LLC</Link>. All Rights Reserved.
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            FEIN: 33-2687374
          </div>
        </div>
      </div>
    </footer>
  )
} 