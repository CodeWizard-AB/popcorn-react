function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			<div className="logo">
				<span>🍿</span> <h1>usePopcorn</h1>
			</div>
			{children}
		</nav>
	);
}

function SearchBar({ query, setQuery }) {
	return (
		<input
			type="text"
			className="search"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

function MoviesCount({ movies }) {
	return (
		<p className="num-results">Found {movies ? movies.length : 0} movies</p>
	);
}

export { MoviesCount, NavBar, SearchBar };
