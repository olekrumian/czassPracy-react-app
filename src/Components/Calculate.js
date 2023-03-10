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

  if (hour > 7 && hour < 19) {
    body.classList.add('day-theme')
  } else {
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
    total += parseInt(elem.iOperacji)
    return total
  }, 0)

  return utraconeTotal
}

const sumOperacji = () => {
  const suma = getLocalStorage()
  if (suma.length > 0) {
    const operacjiTotal = suma.reduce((total, elem) => {
      return (total += parseInt(elem.iOperacji))
    }, 0)
    return operacjiTotal
  }
}

export const Calculate = () => {
  const [switchTab, setSwitchTab] = useState(false)
  const [row, setRow] = useState({
    miejsce: '',
    kilometry: '',
    data: getFullTime(),
    iOperacji: 1,
    uwagi: '',
  })
  const [table, setTable] = useState(getLocalStorage())
  const [sumOper, setSumOper] = useState(0)
  const [sumTotal, setSumTotal] = useState({
    operacji: sumOperacji() - utracone(),
    operacjiUtracone: utracone(),
    jazda: '',
    jazdaUtracone: '',
    dyzur: '',
    weekend: '',
    premia: '',
  })
  const [sumWyplata, setSumWyplata] = useState({
    value1: sumTotal.operacji * 42,
    value2: sumTotal.operacjiUtracone * 21,
    value3: sumTotal.jazda * 42,
    value4: sumTotal.jazdaUtracone * 21,
    value5: sumTotal.dyzur * 150,
    value6: sumTotal.weekend * 150,
    value7: sumTotal.premia * 100,
  })

  const [autoUtracone, setAutoUtracone] = useState('utracone')
  const [sum, setsum] = useState(0)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRow({...row, [name]: value.toLowerCase()})
    setSumTotal({...sumTotal, [name]: value})
    setSumWyplata({
      ...sumWyplata,
      value3: sumTotal.jazda * 42,
      value4: sumTotal.jazdaUtracone * 21,
      value5: sumTotal.dyzur * 150,
      value6: sumTotal.weekend * 150,
      value7: sumTotal.premia * 100,
    })
    setsum(
      sumWyplata.value1 +
        sumWyplata.value2 +
        sumWyplata.value3 +
        sumWyplata.value4 +
        sumWyplata.value5 +
        sumWyplata.value6 +
        sumWyplata.value7
    )
    setAutoUtracone(() => {
      const input = row.miejsce.includes('operacji(utracone)')
      if (input) {
        setRow({...row, [name]: value, uwagi: 'utracone'})
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (row.miejsce && row.kilometry && row.data && row.iOperacji) {
      const newRow = {...row, id: new Date().getTime().toString()}
      setTable([...table, newRow])
      setRow({
        miejsce: '',
        kilometry: '',
        data: getFullTime(),
        iOperacji: 1,
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
    setSumWyplata({
      ...sumWyplata,
      value3: sumTotal.jazda * 42,
      value4: sumTotal.jazdaUtracone * 21,
      value5: sumTotal.dyzur * 150,
      value6: sumTotal.weekend * 150,
      value7: sumTotal.premia * 100,
    })
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
          <datalist id="miejsce">
            <option value="Val" />
            <option value="Zee" />
            <option value="Seneffe" />
            <option value="Wallenius" />
            <option value="ICO405" />
            <option value="ICO502" />
            <option value="C.RO" />
            <option value="Serwis" />
            <option value="Jazda(Utracone)" />
            <option value="Operacji(Utracone)" />
          </datalist>
          <input
            type="text"
            list="miejsce"
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
            name="iOperacji"
            id="operacji"
            placeholder="Ilosc operacji"
            value={row.iOperacji}
            onChange={handleChange}
          />
          <datalist id="uwagi">
            <option value="utracone" />
            <option value="brak aut" />
          </datalist>
          <input
            type="textarea"
            className="uwagi"
            name="uwagi"
            list="uwagi"
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
                const {id, miejsce, kilometry, data, iOperacji, uwagi} = row
                return (
                  <tr className="table_row" key={index} id={id}>
                    <td>{miejsce}</td>
                    <td>{kilometry}</td>
                    <td>{data}</td>
                    <td>{iOperacji}</td>
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
              if (window.confirm('Potwierdzi??')) {
                return setTable([])
              }
              return window.location.reload()
            }}
          >
            Oczysz??
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
              placeholder="Ilo????"
              inputMode="decimal"
              name="operacji"
              value={`${sumOperacji() ? sumOperacji() - utracone() : 0}`}
              onChange={handleChange}
            />
            <p
              id="finalValue"
              name="value1"
              className="p_goal"
              onChange={handleChange}
            >{`${sumOperacji() ? (sumOperacji() - utracone()) * 42 : 0}`}</p>
          </div>
          <p className="input_title">Operacji utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input_value"
              placeholder="Ilo????"
              inputMode="decimal"
              name="operacjiUtracone"
              value={utracone()}
              onChange={handleChange}
            />
            <p
              id="finalValue"
              name="value2"
              className="p_goal"
              onChange={handleChange}
            >
              {`${sumOperacji() ? utracone() * 21 : 0}`}
            </p>
          </div>
          <p className="input_title">Jazda</p>
          <div className="input_wrapper">
            <input
              id="drive"
              type="number"
              inputMode="decimal"
              className="input_value"
              placeholder="God??iny"
              name="jazda"
              value={sumTotal.jazda}
              onChange={handleChange}
            />
            <p
              id="finalValue"
              name="value3"
              className="p_goal"
              onChange={handleChange}
            >
              {sumTotal.jazda * 42}
            </p>
          </div>
          <p className="input_title">Jazda utracone</p>
          <div className="input_wrapper">
            <input
              id="halfhour"
              type="number"
              className="input_value"
              placeholder="God??iny"
              name="jazdaUtracone"
              value={sumTotal.jazdaUtracone}
              onChange={handleChange}
            />
            <p
              id="finalValue"
              name="value4"
              className="p_goal"
              onChange={handleChange}
            >
              {sumTotal.jazdaUtracone * 21}
            </p>
          </div>
          <p className="input_title">Dy??ur</p>
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
            <p
              id="finalValue"
              name="value5"
              className="p_goal"
              onChange={handleChange}
            >
              {sumTotal.dyzur * 150}
            </p>
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
            <p
              id="finalValue"
              name="value6"
              className="p_goal"
              onChange={handleChange}
            >
              {sumTotal.weekend * 150}
            </p>
          </div>
          <p className="input_title">Premia (dni pracy)</p>
          <div className="input_wrapper">
            <input
              id="premia"
              type="number"
              className="input_value"
              placeholder="Ilo????"
              inputMode="decimal"
              name="premia"
              value={sumTotal.premia}
              onChange={handleChange}
            />
            <p
              id="finalValue"
              name="value7"
              className="p_goal"
              onChange={handleChange}
            >
              {sumTotal.premia * 100}
            </p>
          </div>
          {/* <button className="ready_btn">Policz</button> */}
        </form>
        <div className="summa_wyplaty">
          <p className="wyplata" onChange={handleChange}>
            {`${sum > 0 ? sum : 0}`}
          </p>
        </div>
        <table className="tableTab"></table>
      </section>
    </>
  )
}
