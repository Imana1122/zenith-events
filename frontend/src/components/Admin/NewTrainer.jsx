import React, { useState, useEffect } from "react";
import { PageComponent } from "../AdminLayoutComponent";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../core/TButton";
import {  toast } from "react-hot-toast";
import axiosClient from "../../axios";
import {  useParams } from "react-router";
import { useNavigate } from "react-router-dom";


export const NewTrainer = () => {
    const { trainerId } = useParams();
    const navigate = useNavigate();
  const [mode, setMode] = useState(trainerId ? "update" : "create");
  const [trainer, setTrainer] = useState({
    name: "",
    post: "",
    skillLevel: "",
    experienceYears: "",
    imagePath:""
  });

  useEffect(() => {

    if (trainerId && mode === "update") {
      // Fetch the existing event data using the trainerId
      axiosClient
        .get(`/trainers/${trainerId}`)
        .then((response) => {
          setTrainer(response.data.event);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [trainerId, mode]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosClient.post("/uploadImage", formData);
      const imagePath = response.data.imageUrl; // Assuming the response contains 'imageUrl'
      setTrainer((prev) => ({
        ...prev,
        imagePath: imagePath
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();



    const requestUrl = trainerId ? `/updateTrainer/${trainerId}` : "/createTrainer";
    const requestMethod = trainerId ? "PUT" : "POST";


    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: trainer,
      })
      .then(({ data }) => {

        toast.success(data.message);
        navigate('/trainers');

        // Handle the response data
      })
      .catch((error) => {
        // Handle the error
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          toast.error(errorMessages.join("\n"));
        } else {
          console.log(error);
        }
      });
  };

  const handleInputChange = (field, value) => {
    if (field === "image") {
      if (value instanceof File) {
        setTrainer((prev) => ({
          ...prev,
          image: value
        }));
      } else {
        setTrainer((prev) => ({
          ...prev,
          image: null
        }));
      }
    } else {
        setTrainer((prev) => ({
        ...prev,
        [field]: value === null || value === undefined ? "" : value
      }));
    }
  };



  return (
    <PageComponent title={mode === "update" ? "Edit Trainer" : "Add New Trainer"}>
      <div className="md:mx-10 m-auto">
      <form
          action={mode === "update" ? `/updateTrainer/${trainerId}` : "/createEvent"}
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg ">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {<trainer className="imagePath"></trainer> && (
                    <img
                      src={trainer.imagePath}
                      alt="trainer"
                      className="w-1/2 object-cover rounded-lg"
                    />
                  )}
                  {!trainer.imagePath && (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute text-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={uploadImage}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Image */}

              {/* Name */}
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder=" "
                  required
                  value={trainer.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="name"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    trainer.name
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${trainer.name ? "bg-white px-1" : ""}`}
                >
                  Name
                </label>
              </div>
              {/* Name */}

              {/* Post */}
              <div className="relative w-full">
    <label
        htmlFor="post"
        className="absolute top-0 left-2 -translate-y-2 bg-white px-1 text-gray-700 text-xs"
    >
        Post
    </label>
    <select
        id="post"
        name="post"
        required
        value={trainer.post}
        onChange={(e) => handleInputChange("post", e.target.value)}
        className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
    >
        <option value="">Select a post</option>
        <option value="NLP Coach">NLP Coach</option>
        <option value="Laravel Coach">Laravel Coach</option>
        <option value="React Coach">React Coach</option>
        {/* Add more options as needed */}
    </select>
    </div>



              {/* Post */}

              {/* Skill Level */}
              <div className="relative">
                <input
                  id="skillLevel"
                  name="skillLevel"
                  type="text"
                  placeholder=" "
                  required
                  value={trainer.skillLevel}
                  onChange={(e) => handleInputChange("skillLevel", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="skillLevel"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    trainer.skillLevel
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${trainer.skillLevel ? "bg-white px-1" : ""}`}
                >
                  Skill Level
                </label>
              </div>
              {/* Skill Level */}



              {/* Experience Years */}
              <div className="relative">
                <input
                  id="experienceYears"
                  name="experienceYears"
                  type="text"
                  placeholder=" "
                  required
                  value={trainer.experienceYears}
                  onChange={(e) => handleInputChange("experienceYears", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="experienceYears"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    trainer.experienceYears
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${trainer.experienceYears ? "bg-white px-1" : ""}`}
                >
                  Experience Years                </label>
              </div>
              {/* Experience Years */}










            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              {mode === "update" ? (
                <>
                  <TButton type="submit">Update</TButton>
                </>
              ) : (
                <TButton type="submit">Save</TButton>
              )}
            </div>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};
