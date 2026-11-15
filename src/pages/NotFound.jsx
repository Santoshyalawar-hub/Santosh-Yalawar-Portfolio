import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="wrap page nf">
      <span className="eyebrow">404</span>
      <h1 className="grad">Page not found</h1>
      <p>That route doesn't exist.</p>
      <Link className="btn p" to="/">
        Back home
      </Link>
    </div>
  );
}
