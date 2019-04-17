import React from "react"
import styled, { css } from "styled-components"
import posed from "react-pose"
//import VisibilitySensor from 'react-visibility-sensor';
//import { isMobile } from 'react-device-detect';
import ReactTooltip from "react-tooltip"

//import { mediaSize } from '../data/configOptions';
//import SVGDrawIcon from "./SVGDrawIcon"
import Icon from "./Icon"
import "./font-devicons/devicons.min.css"

const ContainerConfig = {
  enter: {
    opacity: 0,
  },
  normal: {
    opacity: 1,
  },
  hovered: {
    opacity: 1,
  },
}

const Container = styled(posed.div(ContainerConfig))`
  position: relative;
  height: auto;
  padding: 10% 8%;
  display: grid;
  grid-template-columns: 250px;
  grid-template-rows: 10em auto 5em 4em 1.5em;
  grid-template-areas: "pic" "title" "desc" "stack" "links";
  margin-bottom: 2em;
  box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  & .__react_component_tooltip {
    display: inline;
  }
  /* Pseudo-element for shadow on container during focus */
  &:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 5px;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 500ms;
  }
  ${props =>
    props.focused
      ? css`
          &:before {
            opacity: 1;
          }
        `
      : null}
`

const ProjectPic = styled.img`
  /* Positioning */
  grid-area: pic;
  justify-self: center;
  align-self: center;
  /* Sizing */
  max-width: 95%;
  max-height: 95%;
  /* Design */
  transition: 1s filter;
  ${props =>
    props.focused
      ? css`
          filter: none;
        `
      : css`
          filter: grayscale(100%);
        `};
`

const ProjectTitle = styled.span`
  /* Positioning */
  grid-area: title;
  justify-self: start;
  align-self: center;
  padding-top: 0.5em;
  /* Design */
  font-size: 2em;
`

const ProjectDesc = styled.div`
  grid-area: desc;
  justify-self: start;
  align-self: center;
`

const ProjectStack = styled.div`
  grid-area: stack;
  justify-self: start;
  align-self: center;
`

const ProjectStackItem = styled.span`
  text-decoration: none;
  position: relative;
  z-index: 10;
  cursor: pointer;
  display: inline;
  color: ${props => props.color};
  filter: ${props => (props.focused ? "none" : "grayscale(100%)")};
  transition: 0.5s filter ease;
`

const ProjectLinkContainer = styled.div`
  grid-area: links;
  justify-self: center;
  align-self: end;
  width: 100%;
  position: relative;
  top: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
`

const ProjectLink = styled.div`
  display: inline;
`

class ProjectShowcase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  handleFocus(focused) {
    this.setState({ focused })
  }

  render() {
    return (
      <Container
        focused={this.state.focused ? 1 : 0}
        initialPose="enter"
        pose={this.state.focused ? "hovered" : "hovered"}
        onMouseEnter={() => this.handleFocus(true)}
        onMouseLeave={() => this.handleFocus(false)}
        color={this.props.color}
      >
        <ProjectPic
          src={this.props.project.imgSource}
          focused={this.state.focused}
        />
        <ProjectTitle>{this.props.project.name}</ProjectTitle>
        <ProjectDesc>{this.props.project.desc}</ProjectDesc>
        <ProjectStack>
          {this.props.project.techStack.map((tech, i) => {
            return (
              <ProjectStackItem
                key={i}
                focused={this.state.focused}
                color={tech.color}
                data-tip={tech.name}
                data-for={`techStackTip${this.props.id}${i}`}
              >
                <span className={tech.icon} style={{ fontSize: "1.5em" }} />
                <ReactTooltip
                  id={`techStackTip${this.props.id}${i}`}
                  effect="solid"
                />
              </ProjectStackItem>
            )
          })}
        </ProjectStack>
        <ProjectLinkContainer>
          {this.props.project.actionLinks.map((link, i) => {
            return (
              <ProjectLink
                key={i}
                data-tip={link.name}
                data-for={`actionLinkTip${this.props.id}${i}`}
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <Icon name={link.icon} size="1.5em" color="#595959" />
                </a>
                <ReactTooltip
                  id={`actionLinkTip${this.props.id}${i}`}
                  effect="solid"
                />
              </ProjectLink>
            )
          })}
        </ProjectLinkContainer>
      </Container>
    )
  }
}

export default ProjectShowcase
