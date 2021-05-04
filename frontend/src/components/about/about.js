import React from "react";
import henry from "./henry.jpg";
import ben from "./ben.jpg";
import nat from "./nat.jpg";
import tommy from "./tommy.jpg";
import "./about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExternalLinkAlt  } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faAngellist } from "@fortawesome/free-brands-svg-icons";

export default ({ closeModal }) => {
  return (
    <>
      <div className="modal-header">
        <span className="modal-icon" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></span>
        <a className="modal-icon" href="https://github.com/henry-pan/Choosy"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
      <div className="modal-content">
        <h1 className="title">About</h1>
        <p className="about-p">Have you ever been out with your friends and can't decide what to do or where to go? Do you have trouble deciding on which item to cross off of your to-do list first? Do you ever need a quick way to bounce your decisions off of something?</p>
        <p className="about-p">Choosy is a mobile-friendly app that helps individuals and groups quickly make decisions. Users will collaboratively make a list of all the possible decisions, and then go through quick rounds of voting methods that narrow the more popular decisions down to a final winner.</p>
      </div>
      <div className="about-team">
        <div className="about-member">
          <img className="about-member-pic" src={henry} />
          <span>Henry Pan</span>
          <div className="about-member-links">
            <a href="https://github.com/henry-pan/"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.linkedin.com/in/henry-pan/"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://angel.co/u/henrypan"><FontAwesomeIcon icon={faAngellist} /></a>
            <a href="https://www.henry-pan.com"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </div>
        </div>
        <div className="about-member">
          <img className="about-member-pic" src={ben} />
          <span>Ben Young</span>
          <div className="about-member-links">
            <a href="https://github.com/benyoungmusic"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.linkedin.com/in/benjamin-young-63869931/"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://angel.co/u/benjamin-young-7"><FontAwesomeIcon icon={faAngellist} /></a>
            <a href="#"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </div>
        </div>
        <div className="about-member">
          <img className="about-member-pic" src={nat} />
          <span>Nat Kozak</span>
          <div className="about-member-links">
            <a href="https://github.com/natkozak"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.linkedin.com/in/nat-kozak-23179049/"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://angel.co/u/nat-kozak"><FontAwesomeIcon icon={faAngellist} /></a>
            <a href="#"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </div>
        </div>
        <div className="about-member">
          <img className="about-member-pic" src={tommy} />
          <span>Tommy Lee</span>
          <div className="about-member-links">
            <a href="https://github.com/SouVangLee"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.linkedin.com/in/sou-vang-tommy-lee/"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://angel.co/u/souvanglee"><FontAwesomeIcon icon={faAngellist} /></a>
            <a href="#"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </div>
        </div>
      </div>
    </>
  );
}
