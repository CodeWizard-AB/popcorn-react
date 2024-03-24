function WatchedList({ watched, handleDeletion }) {
	return (
		<ul className="list">
			{watched.map((movie, i) => (
				<Watched
					key={i}
					movie={movie}
					handleDeletion={handleDeletion.bind(null, movie)}
				/>
			))}
		</ul>
	);
}

function WatchedSummary({ watched }) {
	const average = (type, arr = watched) =>
		arr.reduce((total, movie) => total + movie[type], 0) || 0;
	const imdbRating = average("imdbRating").toFixed(2);
	const userRating = average("userRating").toFixed(2);
	const runtime = Math.round(average("Runtime"));

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
					<span>{userRating}</span>
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

function Watched({ movie, handleDeletion }) {
	return (
		<li>
			<img src={movie.Poster} alt={movie.Title} />
			<h3>{movie.Title}</h3>
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
					<span>{movie.Runtime}</span>
					<span>min</span>
				</p>
				<button className="btn-delete" onClick={handleDeletion}>
					x
				</button>
			</div>
		</li>
	);
}

export { WatchedSummary, WatchedList };
