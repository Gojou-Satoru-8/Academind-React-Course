import { useCallback, useEffect, useRef, useState } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc";

console.log(JSON.parse(localStorage.getItem("selectedPlaces")));
const storedPlaceIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedPlaceIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
console.log(storedPlaces);

function App() {
  const selectedPlace = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.latitude, pos.coords.longitude, pos.coords.altitude);
        const { latitude, longitude } = pos.coords;
        const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, latitude, longitude);
        setAvailablePlaces(sortedPlaces);
      },
      (err) => {
        console.error(err.message);
      },
      { enableHighAccuracy: false }
    );
  }, []);

  function handleStartRemovePlace(id) {
    setModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    if (storedIds.indexOf(id) === -1)
      // Only set the new item if it's not already present
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
  }

  const handleRemovePlace = useCallback(function () {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    setModalOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) ?? [];
    localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
    console.log(storedIds);
    // storedIds.splice(storedIds.indexOf(selectedPlace.current), 1);
    // console.log(storedIds);
    // localStorage.setItem("selectedPlace", JSON.stringify(storedIds));
  }, []);

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by location"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
