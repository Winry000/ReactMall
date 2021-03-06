import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMember } from '../actions';
import Card from '../components/Card';
import fire from '../config/Fire';

class Home extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      name: ''
    };
  }
  addOneMember(event) { 
    event.preventDefault();
    const { name } = this.state;
    this.props.addMember(name);
  }
  renderMembers() {
    const { members }  = this.props;
    return(
      <ul className="list-group col-sm-8 mt-2">
        {
          members.map(member => {
            return (
              <li className="list-group-item">
                <div className="list-item">
                  <Card member={ member }></Card>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  } 
  logOut() {
    fire.auth().signOut();
  }
  render() {
    const { members }  = this.props;
    return (
      <div className="App">
        <div className="title">Add Salad Bar Members
          <div className="form-inline">
            <div className="count-inline">
              <span>count:</span>
              <em>{members.length}</em>
            </div>
            <div className="form-group mr-2">
              <form>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="userName"
                  onChange={(event) => this.setState({text: event.target.value})}
                />
                 <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={ (event) => this.addOneMember(event) }
                >Add</button>
              </form>
            </div>
          </div>
        </div>
        { this.renderMembers() }
        <button onClick={this.logOut}>LogOut</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state----" + state)
  return {
    members: state
  }
}


export default connect(mapStateToProps, { addMember })(Home);
