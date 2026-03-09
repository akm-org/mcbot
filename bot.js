const bedrock = require('bedrock-protocol')

function randomName() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let name = "Bot_"
  for (let i = 0; i < 6; i++) {
    name += chars[Math.floor(Math.random() * chars.length)]
  }
  return name
}

function startBot() {

  const client = bedrock.createClient({
    host: "Animationmovie.aternos.me",
    port: 62132,
    username: randomName(),
    offline: true
  })

  console.log("Bot connecting...")

  client.on('join', () => {
    console.log("Bot joined server")
  })

  client.on('disconnect', () => {
    console.log("Disconnected. Reconnecting...")
    setTimeout(startBot, 5000)
  })
}

startBot()
