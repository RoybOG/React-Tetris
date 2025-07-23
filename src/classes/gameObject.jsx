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

export default GameObject;
