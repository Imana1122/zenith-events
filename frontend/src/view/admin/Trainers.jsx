import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/core/TButton";
import axiosClient from "../../axios";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import { Link } from "react-router-dom";
import Modal from "../../components/core/Modal";
import { CiWarning } from "react-icons/ci";

export const Trainers = () => {
  const { searchQuery } = useStateContext();
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainerIdToDelete, setTrainerIdToDelete] = useState(null);

  useEffect(() => {
    search();
  }, [searchQuery]);

  const search = () => {
    if (searchQuery) {
      axiosClient
        .get('/search/trainers', { params: { query: searchQuery } })
        .then((response) => {
        //   console.log(response);
          // Update the 'trainers' state with the search results
          setTrainers(response.data);
        })
        .catch((error) => {
        //   console.log(error);
        });
    } else {
      axiosClient
        .get("/allTrainers")
        .then((response) => {
          setTrainers(response.data.trainers);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const handleDelete = (trainerId) => {
    axiosClient
      .delete(`/deleteTrainer/${trainerId}`)
      .then(() => {
        search();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteClick = (trainerId) => {
    setIsModalOpen(true);
    setTrainerIdToDelete(trainerId);
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
                <tr className="border border-gray-200" key={trainer.id}>
                  <td className="border border-gray-200 p-2">
                    {/* Convert the ID to a string and use the highlightSearchQuery function to display it */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(trainer.id.toString(), searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                    <img
                      src={trainer.imagePath}
                      alt={trainer.name}
                      className="w-full h-full rounded-sm"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    {/* Use the highlightSearchQuery function to display the trainer's name */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(trainer.name, searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2">
                    {/* Use the highlightSearchQuery function to display the trainer's post */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(trainer.post, searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2">
                    {/* Use the highlightSearchQuery function to display the trainer's skill level */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(trainer.skillLevel, searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2">
                    {/* Use the highlightSearchQuery function to display the trainer's experience years */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(trainer.experienceYears, searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex justify-between items-center mt-3">
                      <Link to={`/trainers/update/${trainer.id}`}>
                        <TButton circle color="green">
                          <PencilIcon className="w-5 h-5 mr-2" />
                        </TButton>
                      </Link>
                      <div className="flex items-center">
                        {trainer.id && (
                          <TButton onClick={() => { onDeleteClick(trainer.id) }} circle color="red">
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
                <td className="border border-gray-200 p-2" colSpan={7}>
                  No trainers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Modal for delete confirmation */}
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            {/* Add a focusable element (e.g., a button) for initial focus */}
            <button className="hidden" autoFocus />
            <p className="flex items-center"><span className="text-red-500 font-bold text-4xl mr-5"><CiWarning /></span>Are you sure you want to delete this trainer?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(trainerIdToDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </PageComponent>
  );
};
