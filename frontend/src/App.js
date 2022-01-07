import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

// the refreshList() function is called each time an API request is completed. It updates Todo list to display the most recent list of added items 
// this is a reusable function
  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

// handleSubmit() function is responsible for the 'create' and 'update' operations
  handleSubmit = (item) => {
    this.toggle();
// if the item does have an id: 
    if (item.id) { 
      axios
        .put(`/api/todos/${item.id}/`, item) // it selects the corresponding item allowing you to update it
        .then((res) => this.refreshList()); // then it refreshes the page to show the most updated list of Todos
      return;
    }
    // if the item passed as the parameter doesn't have an id:
    axios
      .post("/api/todos/", item) // the function will create a new todo
      .then((res) => this.refreshList()); // then it will update 
  };


  // this function handles deleting an item

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`) // selects the item by its corresponding ID and deletes it
      .then((res) => this.refreshList()); // then refreshes the todo list
  };


  // creates an item 
  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  // edits an item 
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  displayCompleted = (status) => {
    if (status) { 
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };


  // The renderTabList function renders two spans that will assist in controlling which set of items are displayed 
  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
         {/* Clicking on the 'Completed' tab will display the completed tasks */}
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
         {/* Clicking on the 'Incomplete' tab will display the incomplete tasks */}
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;