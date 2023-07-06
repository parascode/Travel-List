import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems([...items, newItem]);
  }
  // function handleDeleteItem(item) {}
  // function handleDeleteItem(item) {
  //   const ind = items.indexOf(item);
  //   if (ind > -1) setItems([...items.splice(ind, 1)]);
  // }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/* <Form items={items} setItems={setItems} /> */}
      <PackingList items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️Far Away👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [packed, setPacked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false };
    console.log(newItem);
    // setItems([...items, newItem]);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  // const ar = [1, 2, 3, 4, 5];
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, setItems }) {
  // const orders = [
  //   { id: 0, text: "SORT BY INPUT ORDER" },
  //   { id: 1, text: "SORT BY DESCRIPTION" },
  //   { id: 2, text: "SORT BY PACKED STATUS" },
  // ];
  const [order, setOrder] = useState(0);
  var sortedItems;
  function handleChangeOrder(id) {
    setOrder(id);
  }
  if (order === 0) {
    // setItems(items.sort((it1, it2) => it1.id - it2.id));
    sortedItems = items.slice().sort((it1, it2) => it1.id - it2.id);
    // sortedItems = items.slice().sort((it1, it2) => it1.id - it2.id);
  } else if (order === 1) {
    sortedItems = items
      .slice()
      .sort((it1, it2) => it1.description.localeCompare(it2.description));
  } else {
    sortedItems = items
      .slice()
      .sort((it1, it2) => String(it1.packed).localeCompare(String(it2.packed)));
  }
  // handleChangeOrder(-1);

  function handleDeleteItem(deleteItem) {
    // const ind = items.indexOf(deleteItem);
    // console.log(ind);

    setItems(items.filter((item) => item !== deleteItem));
  }
  function handlePackedItem(change, val) {
    setItems(
      items.map((item) => (item === change ? { ...item, packed: val } : item))
    );
  }
  function handleClearList() {
    setItems([]);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            handleDeleteItem={handleDeleteItem}
            handlePackedItem={handlePackedItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="">
        <select
          value={order.text}
          onChange={(e) => handleChangeOrder(Number(e.target.value))}
        >
          {/* {orders.map((orr) => (
            <option value={orr.id}>{orr.text}</option>
          ))} */}
          <option value={0}>SORT BY INPUT ORDER</option>
          <option value={1}>SORT BY DESCRIPTION</option>
          <option value={2}>SORT BY PACKED STATUS</option>
        </select>
        <button
          onClick={() =>
            window.confirm("Are you sure you want to delete all items?")
              ? handleClearList()
              : null
          }
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

function Item({ item, handleDeleteItem, handlePackedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={(e) => handlePackedItem(item, e.target.checked)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const countPacked = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  return (
    <footer className="stats">
      {items.length === 0 ? (
        <em>Start adding some items to your packing list 🚀</em>
      ) : items.length === countPacked ? (
        <em>You got everything! Ready to go ✈️</em>
      ) : (
        <em>
          👜You have {items.length} items in your list, and you already packed{" "}
          {countPacked} ({Math.trunc((countPacked / items.length) * 100)}%)
        </em>
      )}

      {/* <em>👜You have X items in your list, and you already packed X (X%)</em> */}
      {/* <em>You got everything! Ready to go ✈️</em> */}
    </footer>
  );
}
