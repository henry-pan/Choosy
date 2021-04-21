import React from "react";
import "./about.css";

export default ({ closeModal }) => {
  return (
    <>
      <div className="about-header">
        <span className="modal-close" onClick={closeModal}>&times;</span>
        <a href="https://github.com/henry-pan/Choosy">Github</a>
      </div>
      <div className="about-content">
        <h1 className="splash-logo">About</h1>
        <p>Have you ever been out with your friends and can't decide what to do or where to go? Do you have trouble deciding on which item to cross off of your to-do list first? Do you ever need a quick way to bounce your decisions off of something?</p>
        <p>Choosy is a mobile-friendly app that helps individuals and groups quickly make decisions. Users will collaboratively make a list of all the possible decisions, and then go through quick rounds of voting methods that narrow the more popular decisions down to a final winner.</p>
      </div>
    </>
  );
}
