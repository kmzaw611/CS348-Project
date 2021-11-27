export function getAPIDomain() {
  // Dynamically choose our api domain (Heroku vs localhost) depending on where the front-end is running.
  // https://stackoverflow.com/questions/62886751/fetching-from-localhost-server-in-create-react-app-during-development-vs-fetchin
  // Check post above for detailed explanation.

  if (process.env.NODE_ENV === "production") {
    return "https://stugamez-backend.herokuapp.com";
  } else {
    return "http://localhost:8000";
  }
}
