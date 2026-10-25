import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ScaleLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";

const LATEST_BUILDS_API = "/api/projects.json";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SERVICES_DATA = [
  {
    number: "01",
    title: "UI/UX & Web Design",
    description:
      "Crafting bespoke, conversion-focused user interfaces, interactive Figma prototypes, and complete design systems.",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    number: "02",
    title: "Modern Web Development",
    description:
      "Engineering fast, accessible, and responsive React applications with fluid transitions and clean component architectures.",
    tags: ["React", "JavaScript", "Clean Code"],
  },
  {
    number: "03",
    title: "CMS & Webflow Solutions",
    description:
      "Empowering marketing teams with intuitive content management architectures and frictionless publishing workflows.",
    tags: ["Webflow", "Headless CMS", "Automation"],
  },
  {
    number: "04",
    title: "Performance & SEO Strategy",
    description:
      "Optimizing Core Web Vitals, speed index, and technical on-page SEO to ensure your site ranks and converts.",
    tags: ["Core Web Vitals", "Technical SEO", "Speed"],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "Understanding your business targets, target audience, and project scope to build a strategic foundation.",
  },
  {
    step: "02",
    title: "Concept & Prototyping",
    description:
      "Iterating on wireframes and high-fidelity visuals until the design language feels true to your brand.",
  },
  {
    step: "03",
    title: "Build & Animation",
    description:
      "Turning approved designs into clean, modular React components with accessible micro-interactions.",
  },
  {
    step: "04",
    title: "Testing & Launch",
    description:
      "Cross-browser audits, performance checks, and seamless domain launch with zero downtime.",
  },
];

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const contactFormRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });
  const [emailSending, setEmailSending] = useState(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setEmailStatus({
        type: "error",
        message:
          "Email is not set up yet. Add your EmailJS details to .env.local.",
      });
      return;
    }

    if (!contactFormRef.current) {
      setEmailStatus({
        type: "error",
        message: "The contact form is unavailable. Please reload the page.",
      });
      return;
    }

    setEmailSending(true);
    setEmailStatus({ type: "", message: "" });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactFormRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setEmailStatus({
        type: "success",
        message: "Message sent successfully! We will get back to you shortly.",
      });
      contactFormRef.current.reset();

      setTimeout(() => {
        setEmailStatus({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("Failed to send contact email:", error);
      setEmailStatus({
        type: "error",
        message: "We couldn't send your message. Please try again.",
      });
    } finally {
      setEmailSending(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch(LATEST_BUILDS_API, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        if (!Array.isArray(data.projects)) {
          throw new Error("The projects API returned an invalid response.");
        }
        setProjects(data.projects);
      } catch (error) {
        if (!controller.signal.aborted) {
          setProjectsError(
            "Projects couldn't load. Please refresh and try again.",
          );
          console.error("Failed to fetch latest builds:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setProjectsLoading(false);
        }
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main className="home-page">
        {/*  Hero Section Start */}
        <Container
          as="section"
          fluid
          className="home-hero"
          aria-labelledby="home-title"
        >
          <Row className="home-hero__row align-items-center">
            <Col lg={6} className="home-hero__copy">
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, staggerChildren: 0.12 }}
              >
                <p className="home-hero__eyebrow">
                  WEB DESIGN <span>//</span> WEBFLOW DEVELOPMENT <span>//</span>{" "}
                  SEO
                </p>
                <h1 id="home-title">Web Developer Portfolio.</h1>
                <p className="home-hero__description">
                  We build marketing websites that help you sell on autopilot.
                </p>
                <Button href="#contact" className="home-hero__button">
                  Let&apos;s talk
                </Button>
              </m.div>
            </Col>

            <Col lg={6} className="home-hero__visual-column">
              <m.div
                className="home-hero__visual"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }
                }
                animate={
                  shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.85, delay: 0.15 }}
              >
                <img
                  className="home-hero__image"
                  src="/images/creative-studio-workspace.jpg"
                  alt="Laptop displaying a website analytics dashboard in a creative workspace"
                />
              </m.div>
            </Col>
          </Row>
        </Container>
        {/*  Hero Section End  */}

        {/*  Dream and Vision Section Start  */}
        <Container
          as="section"
          fluid
          className="home-dream"
          aria-labelledby="dream-title"
        >
          <Row className="home-dream__row align-items-center">
            <Col md={6} sm={12} className="home-dream__visual-column">
              <m.div
                className="home-dream__visual"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -36 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
              >
                <div className="home-dream__rings" aria-hidden="true" />
                <img
                  className="home-dream__image"
                  src="/images/Team-collaboration-Better-organizational-communication.webp"
                  alt="A creative team collaborating"
                />
              </m.div>
            </Col>
            <Col md={6} sm={12} className="home-dream__copy">
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
              >
                <span className="home-dream__badge">The Dream</span>
                <h2 id="dream-title" className="home-dream__heading">
                  High-converting digital experiences designed to engage your
                  visitors 24/7.
                </h2>
                <p>
                  Imagine having your sales team on the job 24/7, interacting
                  with an endless stream of ready-to-buy visitors.
                </p>
              </m.div>
            </Col>
          </Row>
        </Container>
        {/*  Dream and Vision Section End  */}

        {/* Latest Builds (Projects) Section Start  */}
        <Container
          as="section"
          fluid
          id="latest"
          className="home-latest"
          aria-labelledby="latest-title"
        >
          <m.div
            className="home-latest__heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="latest-title">Latest builds.</h2>
            <a href="#projects">View Projects</a>
          </m.div>

          {projectsLoading ? (
            <div className="home-latest__message" role="status">
              <ScaleLoader color="#f18379" height={24} />
              <span>Loading latest builds...</span>
            </div>
          ) : projectsError ? (
            <p
              className="home-latest__message home-latest__message--error"
              role="alert"
            >
              {projectsError}
            </p>
          ) : (
            <Swiper
              id="projects"
              className="home-latest__swiper"
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={28}
              slidesPerView={1.1}
              breakpoints={{
                576: { slidesPerView: 1.7 },
                768: { slidesPerView: 2.4 },
                1100: { slidesPerView: 3.25 },
              }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <m.article
                    className="project-card"
                    whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      className="project-card__image"
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-card__details">
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                    </div>
                  </m.article>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Container>
        {/*  Latest Builds (Projects) Section End  */}

        {/*  Services Section Start  */}
        <Container
          as="section"
          fluid
          id="service"
          className="home-services"
          aria-labelledby="services-title"
        >
          <m.div
            className="section-header"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-header__eyebrow">WHAT WE OFFER</p>
            <h2 id="services-title">Services crafted for scale.</h2>
          </m.div>

          <Row className="home-services__grid g-4">
            {SERVICES_DATA.map((service, index) => (
              <Col md={6} key={service.number}>
                <m.div
                  className="service-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <span className="service-card__number">{service.number}</span>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                  <div className="service-card__tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="service-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </m.div>
              </Col>
            ))}
          </Row>
        </Container>
        {/*  Services Section End  */}

        {/*  Process Section Start  */}
        <Container
          as="section"
          fluid
          id="process"
          className="home-process"
          aria-labelledby="process-title"
        >
          <m.div
            className="section-header"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-header__eyebrow">OUR METHODOLOGY</p>
            <h2 id="process-title">How we bring ideas to life.</h2>
          </m.div>

          <Row className="home-process__grid g-4">
            {PROCESS_STEPS.map((item, index) => (
              <Col lg={3} sm={6} key={item.step}>
                <m.div
                  className="process-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <span className="process-card__step">{item.step}</span>
                  <h3 className="process-card__title">{item.title}</h3>
                  <p className="process-card__desc">{item.description}</p>
                </m.div>
              </Col>
            ))}
          </Row>
        </Container>
        {/*  Process Section End  */}

        {/*  Contact Section Start */}
        <Container
          as="section"
          fluid
          id="contact"
          className="home-contact"
          aria-labelledby="contact-title"
        >
          <Row className="home-contact__row">
            <Col lg={5} className="home-contact__intro">
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
              >
                <p className="home-contact__eyebrow">
                  LET&apos;S WORK TOGETHER
                </p>
                <h2 id="contact-title">Have a project in mind?</h2>
                <p>
                  Tell us a little about your project and we&apos;ll get back to
                  you as soon as possible.
                </p>
              </m.div>
            </Col>
            <Col lg={7}>
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <Form
                  ref={contactFormRef}
                  className="home-contact__form"
                  onSubmit={handleContactSubmit}
                >
                  <Form.Group className="mb-3" controlId="contact-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contact-email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contact-subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="What is your project about?"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="contact-message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your idea..."
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="home-contact__submit"
                    disabled={emailSending}
                  >
                    {emailSending ? "Sending..." : "Send message"}
                  </Button>
                  {emailStatus.message && (
                    <p
                      className={`home-contact__status home-contact__status--${emailStatus.type}`}
                      role={emailStatus.type === "error" ? "alert" : "status"}
                    >
                      {emailStatus.message}
                    </p>
                  )}
                </Form>
              </m.div>
            </Col>
          </Row>
        </Container>
        {/*  Contact Section End  */}
      </main>
    </LazyMotion>
  );
};

export default Home;
