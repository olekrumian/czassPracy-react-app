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

export const Calculate = () => {
  const [switchTab, setSwitchTab] = useState(false)
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
    <>
      <div className="btn_container">
        <button
          className={`${switchTab ? 'tab_btn active' : 'tab_btn'}`}
          data-id="inputs"
          onClick={() => setSwitchTab(!switchTab)}
        >
          Dom
        </button>
        <button
          className={`${switchTab ? 'tab_btn' : 'tab_btn active'}`}
          data-id="tabs"
          onClick={() => setSwitchTab(!switchTab)}
        >
          Tabela
        </button>
      </div>

      <section className={`${switchTab ? 'tab active' : 'tab'}`} id="inputs">
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
                <th>Usun</th>
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
          <button
            className="remove_btn"
            onClick={() => {
              if (window.confirm('Potwierdzić')) {
                return setTable([])
              }
              return window.location.reload()
            }}
          >
            Oczyszć
          </button>
          <div className="calculate"></div>
        </div>
      </section>

      <section className={`${switchTab ? 'tab' : 'tab active'}`} id="tabs">
        <form className="input form_operacji" data-id="operacji">
          <p className="input_title">Operacji</p>
          <div className="input_wrapper">
            <input
              id="hour"
              type="number"
              className="input input_value hourMatch"
              placeholder="Ilość"
              inputMode="decimal"
            />
            <input id="hour" className="input input_goal hour" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="uoperacji">
          <p className="input_title">Operacji utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input input_value"
              placeholder="Ilość"
              inputMode="decimal"
            />
            <input id="halfhour" className="input input_goal" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="jazda">
          <p className="input_title">Jazda</p>
          <div className="input_wrapper">
            <input
              id="drive"
              type="text"
              className="input input_value"
              placeholder="Godżiny"
            />
            <input id="drive" className="input input_goal" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="ujazda">
          <p className="input_title">Jazda utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input input_value"
              placeholder="Godżiny"
            />
            <input id="halfhour" className="input input_goal" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="dyzur">
          <p className="input_title">Dyżur</p>
          <div className="input_wrapper">
            <input
              id="payDays"
              type="number"
              className="input input_value"
              placeholder="Dni"
              inputMode="decimal"
            />
            <input id="payDays" className="input input_goal" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="weekend">
          <p className="input_title">Weekendy</p>
          <div className="input_wrapper">
            <input
              id="payDays"
              type="number"
              className="input input_value"
              placeholder="Dni"
              inputMode="decimal"
            />
            <input id="payDays" className="input input_goal" value="0" />
          </div>
        </form>
        <form className="input form_operacji" data-id="premia">
          <p className="input_title">Premia (dni pracy)</p>
          <div className="input_wrapper">
            <input
              id="premia"
              type="decimal"
              className="input input_value"
              placeholder="Ilość"
              inputMode="decimal"
            />
            <input id="premia" className="input input_goal" value="0" />
          </div>
        </form>
        <p className="input_title-comentarz">Komentarz</p>
        <textarea
          name=""
          id="komentarz"
          className="input_textarea"
          placeholder="Uwagi"
        ></textarea>
        <button id="pdf" className="exportxls">
          Export to excel
        </button>
        <div className="summa_wyplaty">
          <p className="wyplata">0</p>
        </div>
        <table className="tableTab"></table>
      </section>
    </>
  )
}
