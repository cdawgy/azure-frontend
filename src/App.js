import axios from "axios";
import "./App.css";

const postUrl =
  "https://prod-27.ukwest.logic.azure.com:443/workflows/224e3021ef4f4ce6ade5c597fdb61cc7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lV2JpN0H92Yml1d-w9xHpOgZOwDTUQGHd4c98Vcl2Qk";
const getUrl =
  "https://prod-246.westeurope.logic.azure.com:443/workflows/ffa053865fdc46f6a8cb3bb88be525fa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SQ1lNvFMxVaRTyMq3RmLJQc-HQ9Rp1hFKp8qWMdDstY";

const postUsername = () => {
  const username = window.prompt("Username");
  axios
    .post(postUrl, {
      username: username,
    })
    .then((resp) => {
      console.log("Worked!");
    })
    .catch((resp) => {
      console.log("Error: " + resp);
    });
};

const getAllUsernames = () => {
  axios
    .get(getUrl)
    .then((resp) => {
      console.log(resp);
      displayTopThreeUsernames(resp.data);
    })
    .catch((resp) => {
      console.log("Error: " + resp);
    });
};

const displayTopThreeUsernames = (apiDataResponse) => {
  const usernamesRoot = document.getElementById("listOfUsernames");
  resetUsernamesList(usernamesRoot);
  apiDataResponse.forEach((resp) => {
    const username = resp.username;
    if (username != null) {
      console.log("Username: " + username);
      const pElm = document.createElement("p");
      pElm.innerHTML = `Username: ${username}`;
      usernamesRoot.appendChild(pElm);
    }
  });
};

const resetUsernamesList = (root) => {
  root.innerHTML = "";
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Azure Front End!</h1>
        <button onClick={postUsername}>Store Username</button>
        <button onClick={getAllUsernames}>Get All Usernames</button>
        <div id="listOfUsernames"></div>
      </header>
    </div>
  );
}

export default App;
