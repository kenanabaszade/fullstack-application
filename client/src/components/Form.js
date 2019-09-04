import React from "react";

/**
 * Anonymous function Form that wraps every form in the app, adding submit and cancel buttons to respectives wrapped components.
 * The function catches errors received from the API when any submiting is invalid and display the errors to the user.
 * @namespace Form
 */
export default props => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  /**
   * HandleSubmit method calls the submit method from the wrapped component.
   * @memberof Form
   * @param event element clicked in the DOM.
   */
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  /**
   * HandleCancel method calls the cancel method from the wrapped component.
   * @memberof Form
   * @param event element clicked in the DOM.
   */
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  /**
   * ErrorsDisplay method watches for errors received from the API and displayes it to the DOM.
   * @memberof Form
   * @param { array } errors errors received from the API response.
   */
  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">
            Oops, something wasn't right.
          </h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return errorsDisplay;
  }

  /**
   * @returns The component wrapped in the Form component and All errors from the API request, if any.
   */
  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
