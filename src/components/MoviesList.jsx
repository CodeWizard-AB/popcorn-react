export default function MoviesList({ setSelectedId, movies }) {
	return (
		<ul className="list list-movies">
			{movies &&
				movies.map((movie, i) => (
					<Movie movie={movie} key={i} setSelectedId={setSelectedId} />
				))}
		</ul>
	);
}

function Movie({ movie, setSelectedId}) {
	return (
		<li onClick={setSelectedId.bind(null, movie.imdbID)}>
			<img src={movie.Poster} alt={movie.Title} />
			<h3>{movie.Title}</h3>
			<p>🗓 {movie.Year}</p>
		</li>
	);
}
