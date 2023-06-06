import './SearchForm.css'

export default function SearchForm() {

  return (
    <form className='form-search'>
      <div className='form-search__container'>
          <input
              type='search'
              placeholder='Фильм'
              className='form-search__input'
          />
          <button
              type='button'
              aria-label='Поиск'
              className='form-search__magnifier'
          />
      </div>
      <div className='form-search__toggle'>
          <span className='form-search__text'>Короткометражки</span>
          <button
              type='button'
              aria-label='Искать короткометражки'
              className='toggle'
          >
              <span className='toggle__turn'>
              </span>
          </button>
      </div>
    </form>
  )
}