export default function FilterBar({activeFilters, toggleFilter, clearFilters}) {
    return (
        <div>
            <input type = "checkbox" checked = {activeFilters.includes("Hoverboard")} onChange = {() => {toggleFilter("Hoverboard")}} />
            <label>Hoverboard</label>

            <input type = "checkbox" checked = {activeFilters.includes("Hoverbike")} onChange = {() => {toggleFilter("Hoverbike")}} />
            <label>Hoverbike</label>

            <input type = "checkbox" checked = {activeFilters.includes("Hoverskates")} onChange = {() => {toggleFilter("Hoverskates")}} />
            <label>Hoverskates</label>

            <input type = "checkbox" checked = {activeFilters.includes("Other")} onChange = {() => {toggleFilter("Other")}} />
            <label>Other</label>

            <button onClick = {clearFilters}>Clear</button>
        </div>
    );
}