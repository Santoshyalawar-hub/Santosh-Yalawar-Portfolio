import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail, ChevronDown } from "lucide-react";
import { profile, socialLinks } from "../data/profile";
import { projects } from "../data/projects";
import { skillCategories } from "../data/skills";
import { useRotator } from "../hooks/useRotator";
import Scene from "../components/Scene";
import Terminal from "../components/Terminal";
import Marquee from "../components/Marquee";
import Roadmap from "../components/Roadmap";
import { Tilt, Thumb, Badge, Reveal, Logo, CountUp } from "../components/ui";
const floaters = ["Java", "Spring Boot", "React", "Kafka", "Docker", "MySQL"];
const all = skillCategories.flatMap((c) => c.items);
const used = all.filter((s) => s.proof.length > 0);
export default function Home() {
  const { theme } = useOutletContext();
  const role = useRotator(profile.roles);
  const feat = projects[1];
  return (
    <div className="wrap page">
      <section className="hero">
        <div className="copy">
          <span className="pill">
            <span className="dot" />
            {profile.availability}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Hi, I'm <span className="grad glow-text">{profile.name}</span>
          </motion.h1>
          <p className="rot" aria-live="polite">
            &gt; {role}
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="lead">{profile.tagline}</p>
          <div className="acts">
            <Link className="btn p" to="/projects">
              View Projects <ArrowRight size={16} />
            </Link>
            <a className="btn" href={profile.resumeUrl} download>
              <Download size={16} />
              Resume
            </a>
            <Link className="btn" to="/contact">
              <Mail size={16} />
              Contact Me
            </Link>
          </div>
          <div className="chips">
            {socialLinks.map((s) => (
              <a
                className="chip"
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
        <div className="scene-wrap">
          <Scene dark={theme === "dark"} />
          {floaters.map((f, i) => (
            <span key={f} className="floater" style={{ "--i": i }}>
              {f}
            </span>
          ))}
        </div>
        <a className="scroll-cue" href="#bento" aria-label="Scroll down">
          <ChevronDown size={18} />
        </a>
      </section>
      <Marquee items={all.map((s) => s.name)} />

      <Reveal>
        <section id="bento" className="bento" aria-label="Highlights">
          <div className="b-term">
            <Terminal />
          </div>
          <Tilt className="stat b-s1">
            <strong className="grad">
              <CountUp to={2} />
            </strong>
            End-to-end project builds
          </Tilt>
          <Tilt className="stat b-s2">
            <strong className="grad">
              <CountUp to={projects.length} />
            </strong>
            Projects documented
          </Tilt>
          <Tilt as={Link} to={`/projects/${feat.id}`} className="b-feat">
            <span className="eyebrow">Featured · {feat.subtitle}</span>
            <Thumb p={feat} />
            <div className="row">
              <h3>{feat.name}</h3>
              <Badge status={feat.status} />
            </div>
          </Tilt>
          <Tilt as={Link} to="/skills" className="b-skills">
            <span className="eyebrow">Stack in production</span>
            <div className="skl">
              {used.slice(0, 12).map((s) => (
                <span key={s.name} className="sk">
                  <Logo name={s.name} />
                  {s.name}
                </span>
              ))}
            </div>
            <span className="more">
              Open skills dashboard <ArrowRight size={14} />
            </span>
          </Tilt>
        </section>
      </Reveal>

      <section className="sec-block">
        <Reveal>
          <div className="head">
            <span className="eyebrow">Roadmap</span>
            <h2>
              What I'm building <span className="grad">next</span>
            </h2>
            <p>Current work, upcoming projects and what I'm learning.</p>
          </div>
        </Reveal>
        <Roadmap />
      </section>

      <Reveal>
        <section className="cta glass">
          <div>
            <span className="eyebrow">Let's work together</span>
            <h2>{profile.availability}</h2>
          </div>
          <div className="acts">
            <Link className="btn p" to="/contact">
              <Mail size={16} />
              Get in touch
            </Link>
            <a className="btn" href={profile.resumeUrl} download>
              <Download size={16} />
              Resume
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
