import { useEffect } from "react";
import { useState } from "react";
import { events } from "../constants"
import axios from "axios";

const VTeam = () => {

  const [teamDetails, setTeamDetails] = useState({});

  const token = localStorage.getItem("Token");
  const getTeamDetails = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    const configuration = {
      method: "get",
      url: "https://api.varchas23.in/account/displayTeam/",
    }
    axios(configuration)
      .then((result) => {
        setTeamDetails(result.data);
        console.log(teamDetails.team_data);
        const a = teamDetails.team_data
        console.log(Array.isArray(teamDetails.team_data));
        console.log(Array.isArray(a));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getTeamDetails();
  }, []);

  return (
    <div className="h-screen">
      <div className="flex flex-col font-mono items-center justify-center mx-auto w-fit p-10 rounded-2xl max-h-screen shadow-sm shadow-[#09fbd3] backdrop-blur bg-green-100/10 text-white">
        <div className=" text-[3rem]">Team Details</div>
        <div className="w-full"></div>
        <br />
        <div className="text-[1rem]">Registered Teams</div>
        {teamDetails.team_data !== undefined && teamDetails.team_data.map((val, key) => (
          <div key={key} className="w-full">
            <div className="flex justify-between text-[1rem] gap-10">
              <div className="">Team ID -{">"}</div>
              <div className="">{val.team_id}</div>
            </div>
            <div className="flex justify-between text-[1rem] gap-10">
              <div className="">Sport -{">"}</div>
              {events.map((x, y) => {
                console.log(x.title);
                if (x.id === val.sport) {
                  return <div key={y}>{x.title}</div>
                }
              })}
            </div>
            <div className="flex justify-between text-[1rem] gap-10">
              <div className="">College -{">"}</div>
              <div className="">{val.college}</div>
            </div>
            <div className="flex justify-between text-[1rem] gap-10">
              <div className="">Captain -{">"}</div>
              <div className="">{val.captain_username}</div>
            </div>
            <div className="flex justify-between text-[1rem] gap-10">
              <div className="">Category -{">"}</div>
              <div className="">{val.category}</div>
            </div>
            <div>Player Details</div>
            <div className="flex justify-between text-[1rem] gap-10">
              <br />
              <div className="mx-auto justify-center text-start">
                {val.players_info.map((val, key) => (
                  <div key={key} className="flex flex-col justify-start mx-auto">
                    <div className="">player - {key + 1}</div>
                    <div className="">name -{">"} {val.name}</div>
                    <div className="">email -{">"} {val.email}</div>
                    <div className="">phone -{">"} {val.phone}</div>
                  </div>
                ))}
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VTeam;
