import React, { useState } from "react";
import CommonDiseases from "./CommonDiseases";

export default function HealthyInfos() {

  const infos = [
    { title: "Stay Hydrated", img: "/images/Healthy/water.jpg", video: "/videos/water.mp4" },
    { title: "Eat Nutritious Food", img: "/images/Healthy/food.jpg", video: "/videos/food.mp4" },
    { title: "Exercise Regularly", img: "/images/Healthy/exercise.jpg", video: "/videos/exercise.mp4" },
    { title: "Sleep Well", img: "/images/Healthy/sleep.jpg", video: "/videos/sleep.mp4" },
    { title: "Maintain Hygiene", img: "/images/Healthy/hygiene.jpg", video: "/videos/hygiene.mp4" },
    { title: "Manage Stress", img: "/images/Healthy/stress.jpg", video: "/videos/stress.mp4" },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
    <div className="px-6 py-12 mt-0">
      <h1 className="text-3xl font-bold text-center text-green-800/50 mb-10">
        Health Tips
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {infos.map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {item.title}
            </h2>
            <img
              src={item.img}
              alt={item.title}
              className="h-40 w-40 rounded-full object-cover shadow-md hover:shadow-lg transition"
              onClick={() => setSelectedVideo(item.video)}
            />
          </div>
        ))}
      </div>

      
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/85 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedVideo(null)} 
        >
          <video
            src={selectedVideo}
            controls
            autoPlay
            className="rounded-lg shadow-lg w-[50%] h-[60%]"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

     
    </div>
     <CommonDiseases/>
    </>
    
  );
}
