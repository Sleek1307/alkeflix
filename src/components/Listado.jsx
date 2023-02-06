import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import swal from 'sweetalert';

export default function Listado(props) {

  const { favorites } = props;
  const token = sessionStorage.getItem('token');
  const [movieResponse, setMovieResponse] = useState([]);

  useEffect(() => {
    if (movieResponse.length === 0) {
      const apiKey = 'e3c2cca8dcb273b5e674f40415045ef9';
      const apiUri = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&page=1`;

      axios.get(apiUri).then(response => {
        setMovieResponse(response.data.results)
      }).catch(() => swal('Oh no!', 'algo ha salido mal', 'error'));
    }

  }, [movieResponse]);

  return (
    <>
      {!token && <Navigate to={'/alkeflix'} />}
      <div className="row">
        {movieResponse.map((movie, index) => {
          return (
            <div className="col-12 col-md-4 col-sm-6 my-4 d-flex justify-content-center" key={index}>
              <div className="card" style={{ width: '18rem' }}>
                <button className='btn-favorite' onClick={props.addOrRemoveFromFavs} data-movie-id={movie.id}>
                  {
                    favorites.find(item => item.id === movie.id.toString()) === undefined
                      ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                      </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                      </svg>
                  }
                </button>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                <div className="card-body h-50 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title" >{movie.title}</h5>
                    <p className="card-text overflow-hidden">{movie.overview.split('').length <= 200 ? movie.overview : movie.overview.substring(0, 100).trim() + '...'}</p>
                  </div>
                  <Link to={`/alkeflix/detalle?movieId=${movie.id}`} className="btn btn-primary mt-3">Ver</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}