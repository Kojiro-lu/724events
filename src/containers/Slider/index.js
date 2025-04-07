import { useEffect, useState, useCallback } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // On clone le tableau pour éviter de modifier data.focus
  // puis on trie les événements du plus récent au plus ancien
  const byDateDesc = data?.focus
    ? data.focus
        .slice()
        .sort((evtA, evtB) =>
          new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
        )
    : [];

  // Fonction pour passer à la slide suivante toutes les 5 secondes et on utilise useCallback pour que la fonction ne soit pas recréée à chaque render
  const nextCard = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  }, [byDateDesc.length]);

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [nextCard]);

  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 ? (
        byDateDesc.map((event, idx) => (
          <div
            key={event.title || idx} // Utiliser le titre comme clé, sinon utiliser l'index
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Aucun événement à afficher</div>
      )}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.title || radioIdx} // Utiliser également le titre comme clé pour les boutons radio
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Change l'index en cliquant sur le bouton radio
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
