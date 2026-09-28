// Paste the Google Form's share link here.
const FORM_URL = "https://forms.gle/WCubQDr5QPJULnHt7";

const SubmitProject = () => {
  return (
    <section className="submit">
      <div>
        <h2>Built something?</h2>
        <p>Submit your project and it'll appear here once it's approved.</p>
      </div>

      {FORM_URL ? (
        <a
          className="submit-button"
          href={FORM_URL}
          target="_blank"
          rel="noreferrer"
        >
          Submit a project
        </a>
      ) : (
        <span className="submit-button" aria-disabled="true">
          Submissions opening soon
        </span>
      )}
    </section>
  );
};

export default SubmitProject;
