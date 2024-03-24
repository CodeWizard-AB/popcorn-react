function WatchedList({ watched }) {
	return (
		<ul className="list">
			{watched.map((movie, i) => (
				<Watched key={i} movie={movie} />
			))}
		</ul>
	);
}

function WatchedSummary({ watched }) {
	const average = (type, arr = watched) =>
		arr.reduce((total, movie) => total + movie[type], 0) || 0;
	const imdbRating = average("imdbRating").toFixed(2);
	const useRating = average("userRating").toFixed(2);
	const runtime = Math.round(average("runtime"));

	return (
		<div className="summary">
			<h2>MOVIES YOU WATCHED</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length}</span>
					<span>movies</span>
				</p>

				<p>
					<span>⭐️</span>
					<span>{imdbRating}</span>
				</p>

				<p>
					<span>🌟</span>
					<span>{useRating}</span>
				</p>

				<p>
					<span>⏳</span>
					<span>{runtime}</span>
					<span>min</span>
				</p>
			</div>
		</div>
	);
}

function Watched({ movie }) {
	return (
		<li>
			<img src={movie.poster} alt={movie.title} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>

				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>

				<p>
					<span>⏳</span>
					<span>{movie.runtime}</span>
					<span>min</span>
				</p>
				<button className="btn-delete">x</button>
			</div>
		</li>
	);
}

export { WatchedSummary, WatchedList };
