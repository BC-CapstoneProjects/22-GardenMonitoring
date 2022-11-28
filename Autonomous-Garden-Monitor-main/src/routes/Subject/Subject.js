import "./Subject.css";

function Subject({ name }) {
  return (
    <div id="subject-page" data-key="subject">
      Subject {name ?? "name not found"}
    </div>
  );
}

export default Subject;
