import { about } from "../data/profile";
import { Head, Chips, Tilt } from "../components/ui";
export default function About() {
  const e = about.education;
  return (
    <div className="wrap page">
      <Head
        eyebrow="About"
        title="Java full stack developer"
        text="A short, accurate summary of who I am and what I work on."
      />
      <div className="two">
        <div className="stack">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="stack">
          <Tilt>
            <span className="eyebrow">Education</span>
            <h3>{e.degree}</h3>
            {(e.institution || e.years) && (
              <p>{[e.institution, e.years].filter(Boolean).join(", ")}</p>
            )}
          </Tilt>
          <Tilt>
            <span className="eyebrow">Focus areas</span>
            <Chips items={about.focus} />
          </Tilt>
        </div>
      </div>
    </div>
  );
}
