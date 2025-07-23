import { Component } from 'react';

class GameObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props?.x || 0,
      y: this.props?.y || 0,
    };
  }

  render() {
    const obj_style = { left: this.state.x, top: this.state.y };
    //console.log('hi');
    return (
      <div className="gameObject" style={obj_style}>
        {this.props.children}
      </div>
    );
  }
}
{
  /* <h3 style={{ margin: 0 }}>^_^</h3> */
}
/*
class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props?.x || 0,
      y: this.props?.y || 0,
    };
    document.addEventListener('keydown', this.handlekeyPress);
  }
  handlekeyPress = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        this.setState((prevState) => {
          return {
            x: prevState.x + 1,
          };
        });
        break;
      case 'ArrowLeft':
        this.setState((prevState) => {
          return {
            x: prevState.x - 1,
          };
        });
        break;

      case 'ArrowUp':
        this.setState((prevState) => {
          return {
            y: prevState.y - 1,
          };
        });
        break;
      case 'ArrowDown':
        this.setState((prevState) => {
          return {
            y: prevState.y + 1,
          };
        });
        break;
    }
  };
  render() {
    const obj_style = { left: this.state.x, top: this.state.y };
    //console.log('hi');
    return (
      <div className="gameObject" style={obj_style}>
        {this.props.children}
      </div>
    );
  }
}
*/

class Snake extends GameObject {
  constructor(props) {
    super(props);
    document.addEventListener('keydown', this.handlekeyPress);
  }
  handlekeyPress = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        this.setState((prevState) => {
          return {
            x: prevState.x + 1,
          };
        });
        break;
      case 'ArrowLeft':
        this.setState((prevState) => {
          return {
            x: prevState.x - 1,
          };
        });
        break;

      case 'ArrowUp':
        this.setState((prevState) => {
          return {
            y: prevState.y - 1,
          };
        });
        break;
      case 'ArrowDown':
        this.setState((prevState) => {
          return {
            y: prevState.y + 1,
          };
        });
        break;
    }
  };
}

export default Snake;
