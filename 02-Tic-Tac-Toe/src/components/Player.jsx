import { useState } from "react";

const Player = function ({ initName, symbol, isActive, onNameSave }) {
  const [name, setName] = useState(initName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = function () {
    // setIsEditing(!isEditing);
    setIsEditing((current) => !current);
    if (isEditing) onNameSave(symbol, name);
    // NOTE: When "Save" button is pressed, isEditing is still true,
    // only after this func executes, isEditing is inverted.
  };

  const handleNameChange = function (e) {
    setName(e.target.value);
  };

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={name} onChange={handleNameChange} required />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button type="button" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
};

export default Player;
