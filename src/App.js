import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageDisplay from "./components/ImageDisplay";
import ImageLinkForm from "./components/ImageLinkForm";
import SignInForm from "./components/SignInForm";
import RegistrationForm from "./components/RegistrationForm";
import "tachyons";
import { UserContext, FaceDataContext } from "./Helper/Contexts";
import ParticlesBg from "particles-bg";

export default function App() {
  const [myImageUrl, setMyImageUrl] = useState("");
  const [inputValue, setInputvalue] = useState("");
  const [faceData, setFaceData] = useState({});
  const [route, setRoute] = useState("signin");

  const [loggedInUser, setLoggedInUser] = useState({});
  const [noOfEntries, setNoOfEntries] = useState(loggedInUser.entries);
  function handleRouteChange(targetRoute) {
    setRoute(targetRoute);
  }
  function handleChange(e) {
    setInputvalue(e.target.value);
    setMyImageUrl(e.target.value);
    if (!myImageUrl) {
      setFaceData({});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setMyImageUrl(inputValue);
    const USER_ID = process.env.REACT_APP_USER_ID;
    const PAT = process.env.REACT_APP_PAT;
    const APP_ID = process.env.REACT_APP_APP_ID;
    const MODEL_ID = process.env.REACT_APP_MODEL_ID;
    const IMAGE_URL = myImageUrl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFaceData(result.outputs[0].data.regions[0].region_info.bounding_box);
        fetch("http://localhost:8000/entries", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: loggedInUser.id,
          }),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((user) => {
            loggedInUser.entries = user.entries;
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("error", error);
        setNoFaceDetectedErrorMessage("Sorry, No face detected in this image");
      });
  };

  return (
    <div className="App">
      <ParticlesBg
        bg={true}
        type="circle"
        num={200}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <FaceDataContext.Provider value={{ faceData, setFaceData }}>
        <Navigation
          handleRouteChange={handleRouteChange}
          route={route}
          faceData={faceData}
        />
        <Logo />
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          {route == "signin" ? (
            <SignInForm
              handleRouteChange={handleRouteChange}
              noOfEntries={noOfEntries}
            />
          ) : route == "register" ? (
            <RegistrationForm handleRouteChange={handleRouteChange} />
          ) : route == "index" ? (
            <div>
              <ImageLinkForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleRouteChange={handleRouteChange}
                noOfEntries={noOfEntries}
              />
              <ImageDisplay imageUrl={myImageUrl} faceData={faceData} />
            </div>
          ) : (
            ""
          )}
        </UserContext.Provider>
      </FaceDataContext.Provider>
    </div>
  );
}
