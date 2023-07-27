import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../AdminLayoutComponent";
import TButton from "../core/TButton";
import axiosClient from "../../axios";

export const Trainers = () => {
  const [trainers, setTrainers] = useState([]);


  useEffect(() => {
    axiosClient
      .get("/allTrainers")
      .then((response) => {
        setTrainers(response.data.trainers);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const handleDelete = (trainerId) => {
    axiosClient
      .delete(`/deleteTrainer/${trainerId}`)
      .then(() => {
        const updatedTrainers = trainers.filter((trainer) => trainer.id !== trainerId);
        setTrainers(updatedTrainers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteClick = (trainerId) => {
    handleDelete(trainerId);
  };



  return (
    <PageComponent
      title="Trainers"
      buttons={
        <TButton color="green" to="/trainers/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >

      <div className="mt-3 text-sm">
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-gray-400">
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                Image
              </th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Post</th>
              <th className="border border-gray-200 p-2">Skill Level</th>
              <th className="border border-gray-200 p-2">Experience Years</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr key={trainer.id} className="border border-gray-200">
                  <td className="border border-gray-200 p-2">{trainer.id}</td>
                  <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                    <img
                      src={trainer.imagePath}
                      alt={trainer.name}
                      className="w-full h-full rounded-sm"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">{trainer.name}</td>
                  <td className="border border-gray-200 p-2">{trainer.post}</td>
                  <td className="border border-gray-200 p-2">{trainer.skillLevel}</td>
                  <td className="border border-gray-200 p-2">{trainer.experienceYears}</td>

                  <td className="border border-gray-200 p-2">
                    <div className="flex justify-between items-center mt-3">
                      <Link to={`/trainers/update/${trainer.id}`}>
                        <TButton circle link color="green">
                          <PencilIcon className="w-5 h-5 mr-2" />
                        </TButton>
                      </Link>
                      <div className="flex items-center">
                        {trainer.id && (
                          <TButton
                            onClick={() => onDeleteClick(trainer.id)}
                            circle
                            link
                            color="red"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </TButton>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-200 p-2" colSpan={10}>
                  No trainers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageComponent>
  );
};
