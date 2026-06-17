export default async function handler(req, res) {
  try {
    const status = req.query.status || "LIVE"

    const response = await fetch(
      `https://api.football-data.org/v4/matches?status=${status}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
        },
      }
    )

    const data = await response.json()

    res.setHeader(
      "X-Requests-Available",
      response.headers.get("X-Requests-Available") || ""
    )

    res.setHeader(
      "X-RequestCounter-Reset",
      response.headers.get("X-RequestCounter-Reset") || ""
    )

    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch matches",
      message: error.message,
    })
  }
}
