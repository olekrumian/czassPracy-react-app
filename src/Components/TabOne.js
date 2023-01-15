import {useEffect, useState} from 'react'
import {FiTrash2} from 'react-icons/fi'

const getFullTime = () => {
  let today = new Date()

  let day = today.getDate()
  let month = today.getMonth() + 1
  if (month < 10) month = '0' + month
  let year = today.getFullYear()

  let hour = today.getHours()
  if (hour < 10) hour = '0' + hour

  let min = today.getMinutes()
  if (min < 10) min = '0' + min

  let fullDate = `${day}.${month}.${year} ${hour}:${min}`
  return fullDate
}

const getLocalStorage = () => {
  let table = localStorage.getItem('table')
  if (table) {
    return JSON.parse(localStorage.getItem('table'))
  } else {
    return []
  }
}

export const TabOne = () => {
  const [row, setRow] = useState({
    miejsce: '',
    kilometry: '',
    data: getFullTime(),
    operacji: '',
    uwagi: '',
  })
  const [table, setTable] = useState(getLocalStorage())

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRow({...row, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (row.miejsce && row.kilometry && row.data && row.operacji) {
      const newRow = {...row, id: new Date().getTime().toString()}
      setTable([...table, newRow])
      setRow({
        miejsce: '',
        kilometry: '',
        data: getFullTime(),
        operacji: '',
        uwagi: '',
      })
    }
  }

  const removeRow = (id) => {
    setTable(table.filter((item) => item.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('table', JSON.stringify(table))
  }, [table])

  return (
    <section className="tab active" id="inputs">
      <form className="form_wrapper">
        <input
          type="text"
          className="miejsce"
          name="miejsce"
          id="miejsce"
          placeholder="Miejsce"
          value={row.miejsce}
          onChange={handleChange}
        />
        <input
          type="number"
          inputMode="decimal"
          maxLength={7}
          className="kilometry"
          name="kilometry"
          id="kilometry"
          placeholder="Kilometry"
          value={row.kilometry}
          onChange={handleChange}
        />
        <input
          id="date"
          className="date"
          name="date"
          defaultValue={getFullTime()}
          value={row.getFullTime}
        />
        <input
          type="number"
          inputMode="decimal"
          className="operacji"
          name="operacji"
          id="operacji"
          placeholder="Ilosc operacji"
          value={row.operacji}
          onChange={handleChange}
        />
        <input
          type="textarea"
          className="uwagi"
          name="uwagi"
          placeholder="Uwagi"
          value={row.uwagi}
          onChange={handleChange}
        />
        <div className="button_wrapper">
          <button className="ready_btn" type="submit" onClick={handleSubmit}>
            Gotowe
          </button>
        </div>
      </form>

      <div className="table_wrapper">
        <table id="table" className="table">
          <thead>
            <tr>
              <th>Miejsce</th>
              <th>Kilometry</th>
              <th>Data</th>
              <th>IO</th>
              <th>Uwagi</th>
              <th>
                <FiTrash2 />
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            {table.map((row, index) => {
              const {id, miejsce, kilometry, data, operacji, uwagi} = row
              return (
                <tr className="table_row" key={index} id={id}>
                  <td>{miejsce}</td>
                  <td>{kilometry}</td>
                  <td>{data}</td>
                  <td>{operacji}</td>
                  <td>{uwagi}</td>
                  <td>
                    <button class="usun">
                      <FiTrash2 onClick={() => removeRow(id)} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="button_wrapper">
        <button className="remove_btn">Oczyszć</button>
        <div className="calculate"></div>
      </div>
    </section>
  )
}
