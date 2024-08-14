import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { ArcherContainer, ArcherElement } from "react-archer";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import "../Canvas.css";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: uuidv4(),
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      showMore: false,
    };
    setCards([...cards, newCard]);
  };

  const toggleShowMore = (id) => {
    const card = cards.find((card) => card.id === id);
    setModalContent(card.text);
    setShowModal(true);
  };

  const connectCards = (startId, endId) => {
    setArrows([...arrows, { start: startId, end: endId }]);
  };

  const handleCardClick = (id) => {
    if (selectedCard) {
      connectCards(selectedCard, id);
      setSelectedCard(null);
    } else {
      setSelectedCard(id);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="canvas-container">
      <button className="btn" onClick={addCard}>
        Add Card
      </button>
      <ArcherContainer strokeColor="black">
        {cards.map((card) => (
          <Draggable key={card.id}>
            <ResizableBox
              width={200}
              height={100}
              minConstraints={[100, 50]}
              maxConstraints={[300, 200]}
            >
              <div className="card">
                <ArcherElement
                  id={card.id}
                  relations={arrows
                    .filter((rel) => rel.start === card.id)
                    .map((rel) => ({
                      targetId: rel.end,
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: { strokeColor: "black", strokeWidth: 2 },
                    }))}
                >
                  <div onClick={() => handleCardClick(card.id)}>
                    <p className="para">{card.text.substring(0, 30)} ...</p>
                    <button onClick={() => toggleShowMore(card.id)}>
                      Show More
                    </button>
                  </div>
                </ArcherElement>
              </div>
            </ResizableBox>
          </Draggable>
        ))}
      </ArcherContainer>
      <Modal show={showModal} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default Canvas;
