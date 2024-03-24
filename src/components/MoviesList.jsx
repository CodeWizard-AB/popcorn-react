export default function MoviesList({ movies }) {
	return (
		<ul className="list list-movies">
			{movies && movies.map((movie, i) => <Movie movie={movie} key={i} />)}
		</ul>
	);
}

function Movie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={movie.Title} />
			<h3>{movie.Title}</h3>
			<p>🗓 {movie.Year}</p>
		</li>
	);
}
