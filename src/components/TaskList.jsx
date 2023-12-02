import { useState, useEffect } from "react";

export default function TaskList() {
  const today = new Date();
  const [value, setValue] = useState("");
  const [list, setList] = useState(() => {
    const localValue = localStorage.getItem('NEWITEMS')
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem('NEWITEMS', JSON.stringify(list))
  }, [list])

  function handleAddListItem(event) {
    if (event.key === 'Enter') {
      setList(prevList => {
        return [...prevList, value];
      });
      setValue('');
    }
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(
      'en-US',
      { weekday: 'long' }
    ).format(date);
  }
  function TitleOfList() {
    return (
      <h2>Todo List for {formatDate(today)}</h2>
    )
  }
  return (
    <>
      <TitleOfList />
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleAddListItem}
      />
      <ul>
        {list.map((item, index) => {
         return <li key={index}>
            {item}
          </li>
        })}
      </ul>
    </>
  )
}

