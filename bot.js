const bedrock = require("bedrock-protocol")
const http = require("http")

const HOST = "Animationmovie.aternos.me"
const PORT = 62132

let botRunning = false
let client = null

// Render needs an HTTP server
const WEB_PORT = process.env.PORT || 3000

http.createServer((req, res) => {
  res.writeHead(200)
  res.end("Minecraft bot running")
}).listen(WEB_PORT, () => {
  console.log("Web server running on port", WEB_PORT)
})

function randomName() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let name = "Bot_"
  for (let i = 0; i < 6; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

function startBot() {

  if (botRunning) {
    console.log("Bot already running")
    return
  }

  botRunning = true

  const username = randomName()
  console.log("Connecting as", username)

  client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: username,
    offline: true
  })

  client.on("join", () => {
    console.log(username + " joined server")

    setInterval(() => {
      console.log("Bot active...")
    }, 15000)
  })

  client.on("disconnect", () => {
    console.log("Disconnected → reconnecting")
    botRunning = false
    setTimeout(startBot, 5000)
  })

  client.on("error", (err) => {
    console.log("Connection error:", err.message)
    botRunning = false
    setTimeout(startBot, 10000)
  })
}

startBot()
