const bedrock = require('bedrock-protocol')

const HOST = "Animationmovie.aternos.me"
const PORT = 62132

function randomName() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let name = "Bot_"
  for (let i = 0; i < 6; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

function startBot() {

  const username = randomName()
  console.log("Connecting as", username)

  const client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: username,
    offline: true,
    connectTimeout: 15000
  })

  client.on('join', () => {
    console.log("Joined server")

    setInterval(() => {
      console.log("Walking randomly")
    }, 10000)
  })

  client.on("disconnect", () => {
    console.log("Disconnected → reconnecting")
    setTimeout(startBot, 5000)
  })

  client.on("error", err => {
    console.log("Connection error:", err.message)
    setTimeout(startBot, 10000)
  })
}

startBot()
