import { React, useContext } from "react";
import "tachyons";
import { UserContext } from "../Helper/Contexts";

export default function ImageLinkForm({
  handleSubmit,
  handleChange,
  noOfEntries,
}) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  return (
    <div className="pa4-l">
      <form
        className="bg-light-red mw7 center pa4 br2-ns ba b--black-10"
        onSubmit={handleSubmit}
      >
        <fieldset className="cf bn ma0 pa0">
          <legend
            className="pa0 f10 f1-ns mb3 black-100"
            style={{ textAlign: "center" }}
          >
            {loggedInUser.fullname}, Your Rank is:
            {loggedInUser.entries}
          </legend>
          <div className="cf">
            <label className="clip" htmlFor="image-address">
              Image Address
            </label>
            <input
              className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="Your Image Address"
              type="url"
              name="image-address"
              onChange={handleChange}
              id="image-address"
            />
            <input
              className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
              type="submit"
              value="Submit"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
