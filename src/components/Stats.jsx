function Stats ({ coffees }) {
    if (coffees.length === 0) {
        return <p className="emppty-message">Add a coffee to see your status.</p>;
    }

    const total = coffees.length;
    const average =
        coffees.reduce ((sum, coffee) => sum + coffee.rating, 0) / total;
    const best = coffees.reduce((top, coffee) =>
        coffee.rating > top.rating ? coffee : top,
    );

    return (
        <section className="stats">
            <h2>Your Status</h2>
            <p>Coffees logged: {total}</p>
            <p>Average rating: {average.toFixed(1)}</p>
            <p>
                Top rated: {best.name} ({best.rating})
            </p>
        </section>
    );
}

export default Stats;
