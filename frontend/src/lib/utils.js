export function formatDate(date) {
    const d = new Date(date); // convert to Date object
    if (isNaN(d.getTime())) {
        return "Invalid Date"; // optional: handle bad inputs
    }
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
