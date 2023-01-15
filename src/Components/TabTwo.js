export const TabTwo = () => {
  return (
    <section className="tab operacji" id="tabs">
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
  )
}
