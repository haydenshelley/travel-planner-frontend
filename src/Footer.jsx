export function Footer() {
  return (
    <footer className="bg-dark py-1 mt-2">
      <div className="container text-center">
        <a
          href="https://github.com/haydenshelley"
          target="_blank"
          className="text-light me-2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            height="35px"
            alt="GitHub"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/hayden-shelley/"
          target="_blank"
          className="text-light me-2"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
            height="55px"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://react.dev/"
          target="_blank"
          className="text-light me-3" // Increase the margin here
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png"
            height="35px"
            alt="React"
          />
        </a>
        <a
          href="https://rubyonrails.org/"
          target="_blank"
          className="text-light me-3" // Increase the margin here
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png"
            height="35px"
            alt="Ruby on Rails"
          />
        </a>
        <a
          href="https://getbootstrap.com/"
          target="_blank"
          className="text-light"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png"
            height="35px"
            alt="Bootstrap"
          />
        </a>
      </div>
    </footer>
  );
}
