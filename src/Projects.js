import React from "react";
import Slider from "react-slick";

const projects = [
  {
    title: "Project 1",
    imageUrl: "http://example.com/project1.jpg",
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
    <Slider {...settings}>
      {projects.map((project, index) => (
        <div key={index}>
          <h3>{project.title}</h3>
          <img src={project.imageUrl} alt={project.title} />
          <p>{project.description}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Projects;
