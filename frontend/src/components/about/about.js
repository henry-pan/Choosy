import React from "react";
import "./about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExternalLinkAlt  } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faAngellist } from "@fortawesome/free-brands-svg-icons";

export default ({ closeModal }) => {
  return (
    <>
      <div className="about-header">
        <span className="about-header-icon" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></span>
        <a className="about-header-icon" href="https://github.com/henry-pan/Choosy"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
      <div className="about-content">
        <h1 className="splash-logo">About</h1>
        <p>Have you ever been out with your friends and can't decide what to do or where to go? Do you have trouble deciding on which item to cross off of your to-do list first? Do you ever need a quick way to bounce your decisions off of something?</p>
        <p>Choosy is a mobile-friendly app that helps individuals and groups quickly make decisions. Users will collaboratively make a list of all the possible decisions, and then go through quick rounds of voting methods that narrow the more popular decisions down to a final winner.</p>
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faLinkedin} />
        <FontAwesomeIcon icon={faAngellist} />
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </div>
    </>
  );
}
