import React from "react";
import Slider from "react-slick";
import './Projects.css';

const projects = [
  {
    title: "Project 1",
    imageUrl: "/project1.png",
    description: "This is project 1",
  },
  {
    title: "Project 2",
    imageUrl: "http://example.com/project2.jpg",
    description: "This is project 2",
  },
  // ...
];

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="page-container">
      <div className="projects-container">
      <h2>My Projects</h2>
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index} className="project-slide">
            <div className="project-image-container">
              <img src={project.imageUrl} alt={project.title} className="project-image" />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default Projects;
