"use client";

export default function Experience() {
  return (
    <section id="company">
      <p className="section__text__p1" style={{ color: "#faf9f6" }}>
        A look into the steps, challenges, and victories along the road
      </p>
      <h1 className="title" style={{ color: "white" }}>
        Professional Milestones
      </h1>
      <div className="my-exp-component-void" style={{ marginTop: "50px" }}>
        <ol className="exp_timeline">
          {/* Item 1: Title Card */}
          <li className="exp_timeline-item">
            <span className="exp_timeline-item-icon exp_avatar-icon">
              <i className="exp_avatar">
                <img src="/assets/insta-pic.webp" alt="Rohan Chakravarty" />
              </i>
            </span>
            <div className="exp_new-comment">
              <h1>Software Engineer Intern</h1>
            </div>
          </li>

          {/* Item 2: Milestone */}
          <li className="exp_timeline-item">
            <span className="exp_timeline-item-icon exp_faded-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                />
              </svg>
            </span>
            <div className="exp_timeline-item-description">
              <i className="exp_avatar exp_small">
                <img src="/assets/insta-pic.webp" alt="Rohan Chakravarty" />
              </i>
              <span>
                <a href="#company">Rohan Chakravarty</a> has added{" "}
                <a href="#company" title="Moved to Bangalore & Started as a SWE Intern @ Nielsen">
                  a new milestone
                </a>{" "}
                on <time dateTime="2025-03-03">Mar 03, 2025</time>
              </span>
            </div>
          </li>

          {/* Item 3: Job Start */}
          <li className="exp_timeline-item">
            <span className="exp_timeline-item-icon exp_faded-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path fill="currentColor" d="M12 13H4v-2h8V4l8 8-8 8z" />
              </svg>
            </span>
            <div className="exp_timeline-item-description">
              <i className="exp_avatar exp_small">
                <img src="/assets/insta-pic.webp" alt="Rohan Chakravarty" />
              </i>
              <span>
                <a href="#compay">Rohan Chakravarty</a> started as a{" "}
                <a href="https://en.wikipedia.org/wiki/Software_engineering">
                  Software Engineering Intern
                </a>{" "}
                at <a href="https://www.nielsen.com/">Nielsen</a> on{" "}
                <time dateTime="2025-03-03">Mar 03, 2025</time>
              </span>
            </div>
          </li>

          {/* Item 4: Detailed Comment */}
          <li className="exp_timeline-item exp_extra-space">
            <span className="exp_timeline-item-icon exp_filled-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"
                />
              </svg>
            </span>
            <div className="exp_timeline-item-wrapper">
              <div className="exp_timeline-item-description">
                <i className="exp_avatar exp_small">
                  <img src="/assets/insta-pic.webp" alt="Rohan Chakravarty" />
                </i>
                <span>
                  <a href="#company">Rohan Chakravarty</a> commented on{" "}
                  <time dateTime="2025-03-04">Mar 04, 2025</time>
                </span>
              </div>
              <div className="exp_comment">
                <p>
                  At Nielsen, I applied innovative problem-solving techniques, collaborated
                  effectively with cross-functional teams, and continuously pushed the boundaries of
                  what I believed possible in technology.
                </p>
                <button className="exp_button">👏 2K</button>
                <button className="exp_button exp_square">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7z"
                    />
                  </svg>
                </button>
              </div>
              <button className="exp_show-replies">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="exp_icon exp_icon-tabler exp_icon-tabler-arrow-forward"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
                </svg>
                Show 300 replies
                <span className="exp_avatar-list">
                  <i className="exp_avatar exp_small">
                    <img src="/assets/dona.webp" alt="Dona Dutta" />
                  </i>
                  <i className="exp_avatar exp_small">
                    <img src="/assets/dona.webp" alt="Dona Dutta" />
                  </i>
                  <i className="exp_avatar exp_small">
                    <img src="/assets/samya.webp" alt="Samya Dey" />
                  </i>
                </span>
              </button>
            </div>
          </li>
        </ol>
      </div>
      <img
        src="/assets/arrow.svg"
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (location.href = "./#projects")}
      />
    </section>
  );
}