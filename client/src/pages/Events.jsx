import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { events } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import PDFModal from "../components/PDFModal";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TeamCard = ({ index, title, icon, price, category, team, registerPath }) => {


  const navigate = useNavigate();

  const register = () => {
    navigate(registerPath);

  }
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full p-[1px] rounded-[20px] shadow-xl shadow-[#00CCFF] backdrop-blur-sm"
      >
        <motion.div
          options={{
            max: 45,
            scale: 1.1,
            speed: 450,
          }}
          className=" rounded-[20px] p-4 min-h-[280px] flex justify-evenly items-center flex-col opacity-90"
        >
          <img
            src={icon}
            alt="web-development"
            className=" object-contain max-w-32 max-h-32  hover:scale-[1.03] shadow rounded-md"
          />

          <h3 className="text-white text-[20px] text-center uppercase  font-Eczar ">
            {title}
          </h3>

          <button className="text-white text-[15px] font-semibold text-center hover:shadow-sm hover:scale-110 p-2 rounded-lg bg-blue-600 hover:bg-blue-400" onClick={register}>
            Register
          </button>

        </motion.div>
      </motion.div>
    </Tilt>
  );
};

const Events = () => {
  return (
    <main className="relative w-full h-full mx-auto sm:px-16 px-6 sm:py-16 py-10 max-w-7xl z-0">
      <div className="mt-20 flex flex-wrap gap-10">
        {events.map((service, index) => (
          <TeamCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </main>
  )
}

export default Events