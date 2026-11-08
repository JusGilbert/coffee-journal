import { useState, useEffect } from "react";
import "./App.css";
import CoffeeCard from "./components/CoffeeCard";
import CoffeeForm from "./components/CoffeeForm";
import { Routes, Route, NavLink } from "react-router";
import Stats from "./components/Stats";



const startingCoffees = [
  {
    id: 1,
    name: "Saigon Cinnamon",
    place: "Offbeat Coffee",
    rating: 4.5,
    notes:
      "A delightful blend of cinnamon and coffee, perfect for a cozy morning.",
    music: "Sometimes K-Pop, other times some vibey music",
    vibe: "Very chill and relaxing, great for unwinding after a long day.",
  },
  {
    id: 2,
    name: "Horchata Shaken Espresso",
    place: "Starbucks",
    rating: 4.9,
    notes:
      "A refreshing twist on the classic espresso, with a hint of horchata flavor.",
    music: "None",
    vibe: "Basic Starbucks vibes, but still enjoyable for a quick pick-me-up.",
  },
  {
    id: 3,
    name: "Iced Vanilla Latte with Oat Milk",
    place: "Mast",
    rating: 4,
    notes:
      "Basic iced vanilla latte, but with the added creaminess of oat milk.",
    music: "Chill music, nothing noticable",
    vibe: "It was nice and the breakfast was surprisingly good!",
  },
];

function loadCoffees() {
  try {
    const saved = localStorage.getItem("coffees");
    return saved ? JSON.parse(saved) : startingCoffees;
  } catch {
    return startingCoffees;
  }
}

function App() {
  const [coffees, setCoffees] = useState(loadCoffees);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    localStorage.setItem("coffees", JSON.stringify(coffees));
  }, [coffees]);

  function addCoffee(coffee) {
    setCoffees([...coffees, { ...coffee, id: Date.now() }]);
  }

  function deleteCoffee(id) {
    setCoffees(coffees.filter((coffee) => coffee.id !== id));
  }

  const visibleCoffees = coffees.filter((coffee) => coffee.rating >= minRating);

  return (
    <div className="app">
      <h1>Coffee Journal</h1>

      <nav className="nav">
        <NavLink to="/">Journal</NavLink>
        <NavLink to="/stats">Stats</NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <CoffeeForm onAddCoffee={addCoffee} />

              <label className="filter-bar">
                Show:
                <select
                  className="rating-filter"
                  value={minRating}
                  onChange={(event) => setMinRating(Number(event.target.value))}
                >
                  <option value={0}>All ratings</option>
                  <option value={3}>3 and up</option>
                  <option value={4}>4 and up</option>
                  <option value={4.5}>4.5 and up</option>
                </select>
              </label>

              {visibleCoffees.length === 0 ? (
                <p className="empty-message">No coffees match that rating yet.</p>
              ) : (
                <div className="coffee-grid">
                  {visibleCoffees.map((coffee) => (
                    <CoffeeCard
                      key={coffee.id}
                      {...coffee}
                      onDelete={deleteCoffee}
                    />
                  ))}
                </div>
              )}
            </>
          }
        />
        <Route path="/stats" element={<Stats coffees={coffees} />} />
      </Routes>
    </div>
  );
}

export default App;
