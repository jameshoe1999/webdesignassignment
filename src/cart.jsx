import React, { Component } from "react";
import Swal from "sweetalert2";
import _ from "lodash";

const imgStyle = {
  "max-width": "150px",
  "max-height": "150px",
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    const carts = sessionStorage.getItem("carts");
    if (carts !== null && carts.length > 0) {
      const items = JSON.parse(carts);
      getData(items)
        .then((values) => this.setState({ items: values }))
        .catch((error) => console.error(error));
    }

    this.mapItem = this.mapItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumericChange = this.handleNumericChange.bind(this);
  }

  handleRemove(index) {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }

  handleRemoveAll() {
    this.setState({ items: [] });
  }

  handleNumericChange(e, index) {
    let { value, name } = e.target;
    value = parseInt(value);
    const items = this.state.items;

    if (value < 1) {
      Swal.fire({
        title: "Oh No!",
        text: "Minimum 1 cup per serving, or would you like to remove it?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Yes, remove it.",
        confirmButtonText: "Alright, it's fine.",
      }).then((result) => {
        if (!result.isConfirmed) {
          items.splice(index, 1);
          this.setState({ items });
          return;
        }
      });
      value = 1;
    }
    items[index][name] = value;
    this.setState({ items });
  }

  handleInputChange(e, index) {
    let { value, name } = e.target;
    const { items } = this.state;
    items[index][name] = value;
    this.setState({ items });
  }

  mapItem(item, index) {
    const { id, name, description, url, price, qty, remark } = item;
    return (
      <tr key={"juice-" + id} id={name}>
        <td>
          <img
            style={imgStyle}
            src={url || "assets/images/cups/all-berry-bang-cup.png"}
            alt={`${name} image`}
          />
          {name}
        </td>
        <td>{description}</td>
        <td>MYR {price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            name="qty"
            id={"qty-" + id}
            className="form-control"
            min="1"
            value={qty}
            onChange={() => this.handleNumericChange(event, index)}
            width="75"
          />
        </td>
        <td>
          <input
            type="text"
            name="remark"
            id={"remark-" + id}
            className="form-control"
            value={remark}
            onChange={() => this.handleInputChange(event, index)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.handleRemove(index)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  renderHeader() {
    return (
      <thead>
        <th>Juices</th>
        <th>Description</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Remark</th>
        <th>Action</th>
      </thead>
    );
  }

  renderFooter() {
    const { items } = this.state;
    return (
      <tfoot>
        <th colSpan="2">No. of items: {items.length}</th>
        <th>
          MYR{" "}
          {items
            .map((item) => item.price * item.qty)
            .reduce((acc, cur) => acc + cur, 0.0)
            .toFixed(2)}
        </th>
        <th colSpan="2">
          {items.reduce((acc, cur) => acc + parseInt(cur.qty), 0)}
        </th>
        <th className="text-muted text-danger">
          <button
            className="btn btn-outline-danger"
            onClick={this.handleRemoveAll}
          >
            Remove All
          </button>
        </th>
      </tfoot>
    );
  }

  render() {
    const { items } = this.state;
    if (items.length < 1) {
      return <td colSpan="100%">Nothing is here, get your order now!</td>;
    }
    const carts = items.map(this.mapItem);
    return (
      <React.Fragment>
        {this.renderHeader()}
        <tbody>{carts}</tbody>
        {this.renderFooter()}
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    let { items } = this.state;
    items = items.map((item) =>
      _.omit(item, ["description", "price", "name", "url"])
    );
    const JSONString = JSON.stringify(items);
    sessionStorage.setItem("carts", JSONString);
  }
}

export default Cart;
