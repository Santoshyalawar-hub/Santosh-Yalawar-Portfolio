const ChipList = ({ items }) => (
  <div className="chips">
    {items.map((item) => (
      <span className="chip" key={item}>
        {item}
      </span>
    ))}
  </div>
)

export default ChipList
