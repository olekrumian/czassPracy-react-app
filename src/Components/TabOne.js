import {FiTrash2} from 'react-icons/fi'

export const TabOne = () => {
  return (
    <div className="tab active" id="inputs">
      <div className="form_wrapper">
        <input className="miejsce" list="miejsce" placeholder="Miejsce" />
        <datalist id="miejsce">
          <option value="Valenciennes" />
          <option value="Zeebrugge" />
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
          type="number"
          inputMode="decimal"
          maxLength={7}
          className="kilometry"
          placeholder="Kilometry"
        />
        <input
          id="date"
          className="date"
          value={() => {
            let today = new Date()

            let day = today.getDate()
            let month = today.getMonth() + 1
            if (month < 10) month = '0' + month
            let year = today.getFullYear()

            let hour = today.getHours()
            if (hour < 10) hour = '0' + hour

            let min = today.getMinutes()
            if (min < 10) min = '0' + min

            const fullDate = `${day}.${month}.${year} ${hour}:${min}`
            return fullDate

            // inputDate.value = `${day}.${month}.${year} ${hour}:${min}`

            // if (hour < 19) {
            //   body.classList.add('day-theme')
            // } else if (hour > 8) {
            //   body.classList.add('night-theme')
            // }
          }}
        />
        <input
          type="number"
          inputMode="decimal"
          className="operacji"
          placeholder="Ilosc operacji"
        />
        <input type="textarea" className="uwagi" placeholder="Uwagi" />
        <div className="button_wrapper">
          <button className="ready_btn">Gotowe</button>
        </div>
      </div>

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
          <tbody className="tbody"></tbody>
        </table>
      </div>
      <div className="button_wrapper">
        <button className="remove_btn">Oczyszć</button>
        <div className="calculate"></div>
      </div>
    </div>
  )
}
