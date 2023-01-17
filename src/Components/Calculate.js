import {useEffect, useState} from 'react'
import {FiTrash2} from 'react-icons/fi'

const getFullTime = () => {
  const body = document.querySelector('body')

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

  if (hour < 19) {
    body.classList.add('day-theme')
  } else if (hour > 8) {
    body.classList.add('night-theme')
  }

  return fullDate
}

const localStorageSet = (name, arr) => {
  localStorage.setItem(name, JSON.stringify(arr))
}

const getLocalStorage = () => {
  let table = localStorage.getItem('table')
  if (table) {
    return JSON.parse(localStorage.getItem('table'))
  } else {
    return []
  }
}

const utracone = () => {
  const array = getLocalStorage()

  const arrayUtr = array.filter((elem) => elem.uwagi === 'utracone')
  const utraconeTotal = arrayUtr.reduce((total, elem) => {
    total += parseInt(elem.operacji)
    return total
  }, 0)

  return utraconeTotal
}

const sumOperacji = () => {
  const suma = getLocalStorage()
  let total = 0
  if (suma.length > 0) {
    suma.forEach((element) => {
      total += parseInt(element.operacji)
    })
  }
  return total
}

export const Calculate = () => {
  const [switchTab, setSwitchTab] = useState(false)
  const [row, setRow] = useState({
    miejsce: '',
    kilometry: '',
    data: getFullTime(),
    operacji: 1,
    uwagi: '',
  })
  const [table, setTable] = useState(getLocalStorage())
  const [sumOper, setSumOper] = useState(0)
  const [sumTotal, setSumTotal] = useState({
    operacji: sumOperacji() - utracone(),
    operacjiUtracone: utracone(),
    jazda: 0,
    jazdaUtracone: 0,
    dyzur: 0,
    weekend: 0,
    premia: 0,
  })
  const [wyplata, setWyplata] = useState(0)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRow({...row, [name]: value})
    setSumTotal({...sumTotal, [name]: value})
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

  function getLocalStorage() {
    return localStorage.getItem('table')
      ? JSON.parse(localStorage.getItem('table'))
      : []
  }

  const removeRow = (id) => {
    setTable(table.filter((item) => item.id !== id))
  }

  useEffect(() => {
    localStorageSet('table', table)
    setSumOper(sumOperacji)
  }, [table])

  return (
    <>
      <div className="btn_container">
        <button
          className={`${switchTab ? 'tab_btn' : 'tab_btn active'}`}
          data-id="inputs"
          onClick={() => setSwitchTab(!switchTab)}
        >
          Dom
        </button>
        <button
          className={`${switchTab ? 'tab_btn active' : 'tab_btn'}`}
          data-id="tabs"
          onClick={() => setSwitchTab(!switchTab)}
        >
          Tabela
        </button>
      </div>

      <section className={`${switchTab ? 'tab' : 'tab active'}`} id="inputs">
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
                      <button className="usun">
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
          <div className="calculate">Operacji: {sumOper}</div>
        </div>
      </section>

      <section className={`${switchTab ? 'tab active' : 'tab'}`} id="tabs">
        <form action="form_wrapper">
          <p className="input_title">Operacji</p>
          <div className="input_wrapper">
            <input
              id="hour"
              type="number"
              className="input_value"
              placeholder="Ilość"
              inputMode="decimal"
              name="operacji"
              value={sumOperacji() - utracone()}
              onChange={handleChange}
            />
            <input
              id="hour"
              className="input_goal"
              value={(sumOperacji() - utracone()) * 42}
              readOnly
            />
          </div>
          <p className="input_title">Operacji utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input_value"
              placeholder="Ilość"
              inputMode="decimal"
              name="operacjiUtracone"
              value={utracone()}
              onChange={handleChange}
            />
            <input
              id="halfhour"
              className="input_goal"
              value={utracone() * 21}
              readOnly
            />
          </div>
          <p className="input_title">Jazda</p>
          <div className="input_wrapper">
            <input
              id="drive"
              type="text"
              className="input_value"
              placeholder="Godżiny"
              name="jazda"
              value={sumTotal.jazda}
              onChange={handleChange}
            />
            <input
              id="drive"
              className="input_goal"
              value={sumTotal.jazda * 42}
              readOnly
            />
          </div>
          <p className="input_title">Jazda utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input_value"
              placeholder="Godżiny"
              name="jazdaUtracone"
              value={sumTotal.jazdaUtracone}
              onChange={handleChange}
            />
            <input
              id="halfhour"
              className="input_goal"
              value={sumTotal.jazdaUtracone * 21}
              readOnly
            />
          </div>
          <p className="input_title">Dyżur</p>
          <div className="input_wrapper">
            <input
              id="payDays"
              type="number"
              className="input_value"
              placeholder="Dni"
              inputMode="decimal"
              name="dyzur"
              value={sumTotal.dyzur}
              onChange={handleChange}
            />
            <input
              id="payDays"
              className="input_goal"
              value={sumTotal.dyzur * 150}
              readOnly
            />
          </div>
          <p className="input_title">Weekendy</p>
          <div className="input_wrapper">
            <input
              id="payDays"
              type="number"
              className="input_value"
              placeholder="Dni"
              inputMode="decimal"
              name="weekend"
              value={sumTotal.weekend}
              onChange={handleChange}
            />
            <input
              id="payDays"
              className="input_goal"
              value={sumTotal.weekend * 150}
              readOnly
              name="goal"
            />
          </div>
          <p className="input_title">Premia (dni pracy)</p>
          <div className="input_wrapper">
            <input
              id="premia"
              type="decimal"
              className="input_value"
              placeholder="Ilość"
              inputMode="decimal"
              name="premia"
              value={sumTotal.premia}
              onChange={handleChange}
            />
            <input
              id="premia"
              className="input_goal"
              value={sumTotal.premia * 100}
              readOnly
            />
          </div>
          <button className="ready_btn">Policz</button>
        </form>
        <div className="summa_wyplaty">
          <p className="wyplata">{wyplata}</p>
        </div>
        <table className="tableTab"></table>
      </section>
    </>
  )
}
