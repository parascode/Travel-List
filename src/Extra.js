function PackingList({ items, setItems }) {
  const orders = [
    { id: 0, text: "SORT BY INPUT ORDER" },
    { id: 1, text: "SORT BY DESCRIPTION" },
    { id: 2, text: "SORT BY PACKED STATUS" },
  ];
  const [order, setOrder] = useState({ id: 0, text: "SORT BY INPUT ORDER" });
  var sortedItems;
  function handleChangeOrder(id) {
    setOrder(() => orders.filter((ord) => ord.id === id));
  }
  if (order.id === 0) {
    // setItems(items.sort((it1, it2) => it1.id - it2.id));
    sortedItems = items.slice().sort((it1, it2) => it1.id - it2.id);
    // sortedItems = items.slice().sort((it1, it2) => it1.id - it2.id);
  } else if (order.id === 1) {
    sortedItems = items
      .slice()
      .sort((it1, it2) => it1.description.localeCompare(it2.description));
  } else {
    sortedItems = items
      .slice()
      .sort((it1, it2) => it1.packed.localeCompare(it2.packed));
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
      <div className="actions">
        <select
          value={order.text}
          onChange={(e) => handleChangeOrder(Number(e.target.value))}
        >
          {orders.map((orr) => (
            <option value={orr.id}>{orr.text}</option>
          ))}
          {/* <option>SORT BY INPUT ORDER</option>
          <option>SORT BY DESCRIPTION</option>
        <option>SORT BY PACKED STATUS</option> */}
        </select>
      </div>
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
  );
}
