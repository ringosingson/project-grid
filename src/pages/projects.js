import React from "react"
import styled from "styled-components"
import { projectsList } from "../components/projects/projectData"
import ProjectShowcase from "../components/projects/ProjectShowcase"
//import posed from 'react-pose';

const ProjectGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 3vmin;
  justify-items: center;
`

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ProjectGrid style={this.props.transition && this.props.transition.style}>
        {projectsList.map((project, i) => (
          <ProjectShowcase key={i} id={i} project={project} />
        ))}
      </ProjectGrid>
    )
  }
}

export default ProjectsPage
