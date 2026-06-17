export default async function handler(req, res) {
  // Allow requests from your Framer site
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  // Forward any query params (status, dateFrom, dateTo, etc.)
  const params = new URLSearchParams(req.query)
  const url = `https://api.football-data.org/v4/matches?${params}`
  const response = await fetch(url, {
    headers: { "X-Auth-Token": "30795c549d0b4ef78ad135a82817ceb0" }
  })
  const data = await response.json()
  // Forward rate-limit headers to the client
  for (const header of [
    "X-RateLimit-Remaining",
    "X-RateLimit-Reset",
    "X-Requests-Available-Minute",
    "X-RequestCounter-Reset"
  ]) {
    if (response.headers.get(header)) {
      res.setHeader(header, response.headers.get(header))
    }
  }
  res.status(response.status).json(data)
}
