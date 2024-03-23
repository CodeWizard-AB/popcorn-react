function NavBar({ children }) {
	return <nav className="navbar">{children}</nav>;
}

function SearchBar({}) {
	return (
		<div className="search">
			<input type="text" />
		</div>
	);
}

function MoviesCount({ movies }) {
	return <p className="num-results">Found {movies.length} movies</p>;
}

export { MoviesCount, NavBar, SearchBar };
