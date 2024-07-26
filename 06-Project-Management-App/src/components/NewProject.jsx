import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

const NewProject = forwardRef(function ({ onSave, onCancel, ...restProps }, ref) {
  const [projectDetails, setProjectDetails] = useState({ title: "", description: "", dueDate: "" });
  //   const [errors, setErrors] = useState([]); // To be used in modal
  const modalElement = useRef();

  const validateInput = () => {
    // const {title, description, dueDate} = projectDetails;
    const errs = [];
    for (const [key, value] of Object.entries(projectDetails)) {
      value.trim().length === 0 && errs.push(key);
    }
    // console.log(errs);

    return errs;
  };
  //   validateInput();
  useImperativeHandle(ref, () => {
    return {
      getLastSavedProject: () => {
        const errs = validateInput();
        console.log(errs);

        if (errs.length === 0) return structuredClone(projectDetails);
        else {
          //   setErrors(errs);
          modalElement.current.open();
        }
      },
    };
  });

  const handleChangeInProjectDetails = function (e) {
    setProjectDetails((current) => {
      //   console.log(e.target.name, e.target.value);
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  //   console.log(projectDetails);

  return (
    <>
      <Modal ref={modalElement} buttonLabel="Close">
        <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
        <p className="text-stone-400 mb-4">Some fields were left empty.</p>
        <p className="text-stone-400 mb-4">Please fill all fields with valid input!</p>
        {/* <menu>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </menu> */}
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button type="button" className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950"
              onClick={onSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" label="Title" forId="title" onChange={handleChangeInProjectDetails} />
          <Input label="Description" forId="description" textarea onChange={handleChangeInProjectDetails} />
          <Input type="date" label="Due Date" forId="dueDate" onChange={handleChangeInProjectDetails} />
        </div>
      </div>
    </>
  );
});

export default NewProject;
