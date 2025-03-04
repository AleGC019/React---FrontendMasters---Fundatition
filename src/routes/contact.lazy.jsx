import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact.js";
import { useFormStatus } from "react-dom";

export const Route = createLazyFileRoute("/contact")({
  component: ConctactRoute,
});

function ConctactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form action={mutation.mutate}>
          <ConctactInput name="name" placeholder="name" />
          <ConctactInput name="email" placeholder="Email" type="email" />
          <textarea
            name="message"
            placeholder="message"
            type="email"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

function ConctactInput(props) {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
