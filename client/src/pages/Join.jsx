import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import FormAction from "../components/formaction";
import Input from "../components/input";
import axios from "axios";
import Comingsoon from "../components/comingsoon";

const TeamJoin = () => {
  const navigate = useNavigate();
  const [joinState, setJoinState] = useState("");
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      const jsonData = { error: "Kindly Login First" };
      alert(jsonData.error);
      navigate("/login");
    }
  });

  const handleChange = (e) => {
    setJoinState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinTeam();
  };

  const joinTeam = () => {
    const data_j = {teamId : joinState}
    const token = localStorage.getItem("Token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const configuration = {
      method: "post",
      url: "https://api.varchas23.in/account/jointeam/",
      data: data_j,
    };
    axios(configuration)
      .then((result) => {
        alert(result.data.message);
        // localStorage.setItem("team_token", result.data.team_token);
        naviage("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    // console.log({teamId : joinState});
  };

  return (
    <section className="h-screen flex items-center justify-center">
      {/* <Comingsoon /> */}
      <div className="flex flex-col items-center p-4 rounded-2xl hover:shadow-xl hover:shadow-emerald-300 overflow-auto max-h-[70%] w-fit h-fit shadow shadow-[#09fbd3]">
        <Header heading="Join Team" logoUrl={"/VLW.png"} />
        <form className="mt-4 space-y-6 w-72 xl:w-96" onSubmit={handleSubmit}>
          <div className="">
              <Input
                key="teamId"
                handleChange={handleChange}
                value={joinState["teamId"]}
                labelText="Team ID"
                labelFor="Team ID"
                id="teamId"
                name="Team ID"
                type="text"
                isRequired={true}
                placeholder="Enter Team ID"
              />
            <FormAction handleSubmit={handleSubmit} text="Join" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TeamJoin;
