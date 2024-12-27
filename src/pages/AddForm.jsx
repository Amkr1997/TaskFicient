import { useSearchParams } from "react-router-dom";
import AddTask from "./AddTask";
import AddProject from "./AddProject";
import AddTeam from "./AddTeam";

const AddForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <section className={`container py-4`}>
      <div className="row">
        <div className="col-12 col-sm-1 col-md-2"></div>
        <div className={`col-sm-10 col-md-8`}>
          {mode === "task" && <AddTask />}
          {mode === "project" && <AddProject />}
          {mode === "team" && <AddTeam />}
        </div>
        <div className="col-sm-1 col-md-2"></div>
      </div>
    </section>
  );
};

export default AddForm;
