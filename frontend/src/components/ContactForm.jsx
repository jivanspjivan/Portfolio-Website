import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle, X } from "lucide-react";
import { apiUrl } from "../config/api";

export default function ContactForm() {
  const [state, setState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    if (state.status !== "success") return undefined;

    const timer = window.setTimeout(
      () => setState({ status: "idle", message: "" }),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [state.status]);

  async function submit(event) {
    event.preventDefault();
    setState({ status: "loading", message: "" });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseText = await response.text();
      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          result.message || `The message could not be sent. Please try again (${response.status}).`,
        );
      }

      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error(
          "The backend returned an unexpected response. Check the frontend API URL.",
        );
      }

      form.reset();
      setState({
        status: "success",
        message: "Thanks! I’ll get back to you within 24 hours.",
      });
    } catch (error) {
      setState({ status: "error", message: error.message });
    }
  }

  function showInvalidField(event) {
    const field = event.target;
    field.classList.remove("field-invalid");
    window.requestAnimationFrame(() => field.classList.add("field-invalid"));
  }

  return (
    <>
      <form className="contact-form" onSubmit={submit} onInvalid={showInvalidField}>
        <div className="form-heading">
          <span>Start a conversation</span>
          <h3>Let’s build something great.</h3>
          <p>
            Looking for a software engineer or AI developer? Tell me about your project,
            and I’ll get back to you within 24 hours.
          </p>
        </div>
        <div className="field-row">
          <label>
            Your name
            <input required name="name" placeholder="Your name" maxLength="100" />
          </label>
          <label>
            Your email
            <input required type="email" name="email" placeholder="Your email" maxLength="160" />
          </label>
        </div>
        <label>
          Company <span>(optional)</span>
          <input name="company" placeholder="Your company" maxLength="120" />
        </label>
        <label>
          What are you building?
          <textarea
            required
            name="message"
            rows="5"
            placeholder="Tell me about the role, project, or problem..."
            minLength="10"
            maxLength="3000"
          />
        </label>
        <button
          className={`submit-${state.status}`}
          disabled={state.status === "loading" || state.status === "success"}
          type="submit"
        >
          <span>
            {state.status === "loading"
              ? "Sending..."
              : state.status === "success"
                ? "Message sent"
                : "Let’s talk"}
          </span>
          {state.status === "loading" ? (
            <LoaderCircle className="submit-spinner" size={18} />
          ) : state.status === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <ArrowUpRight className="contact-submit-arrow" size={18} />
          )}
        </button>
        {state.status === "error" && <p className="form-status error">{state.message}</p>}
      </form>
      {state.status === "success" && (
        <div className="success-toast" role="status" aria-live="polite">
          <CheckCircle2 size={20} />
          <span>{state.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setState({ status: "idle", message: "" })}
          >
            <X size={17} />
          </button>
        </div>
      )}
    </>
  );
}
