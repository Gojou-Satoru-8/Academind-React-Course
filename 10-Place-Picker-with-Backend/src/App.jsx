import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces";
import Error from "./components/Error";
import { fetchUserPlaces, updateUserPlaces } from "./http";

function App() {
  const selectedPlace = useRef();
  const [loadingUserPlaces, setLoadingUserPlaces] = useState(false);
  const [userPlaces, setUserPlaces] = useState([]);
  const [errorLoadingUserPlaces, setErrorLoadingUserPlaces] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingUserPlaces(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (err) {
        console.log("Error fetching user-places");
        setErrorLoadingUserPlaces({ message: err.message || "Error fetching user-places" });
      } finally {
        setLoadingUserPlaces(false);
      }
    })();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (err) {
      console.log(err.message);
      setUserPlaces(userPlaces); // Set it back to the previous array, if there's an error
      setErrorUpdatingPlaces({ message: err.message || "Failed to update places" });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id));

      try {
        await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
      } catch (err) {
        setUserPlaces(userPlaces); // Rollback to state before deletion
        setErrorUpdatingPlaces({ message: err.message || "Failed to delete place" });
      }
      setModalIsOpen(false);
    },
    [userPlaces]
  );

  const handleErrorUpdatingPlaces = () => setErrorUpdatingPlaces(null);
  return (
    <>
      <Modal open={errorUpdatingPlaces} onCLose={handleErrorUpdatingPlaces}>
        {errorUpdatingPlaces && (
          <Error
            title="An Error Occurred"
            message={errorUpdatingPlaces.message}
            onConfirm={handleErrorUpdatingPlaces}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        {errorLoadingUserPlaces && <Error title="An error occurred" message={errorLoadingUserPlaces.message} />}
        {!errorLoadingUserPlaces && (
          <Places
            title="I'd like to visit ..."
            isLoading={loadingUserPlaces}
            loadingText="Loading your places, please wait..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
