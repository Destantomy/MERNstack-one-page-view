import {Link} from 'react-router-dom'

const navbar = () => {
  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1>Aplikasi !semangat DIET cukkk</h1>
            </Link>
        </div>
    </header>
  )
}

export default navbar
