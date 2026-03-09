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

  console.log("Starting bot:", username)

  const client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: username,
    offline: true
  })

  client.on('join', () => {
    console.log(username + " joined server")

    // random walking loop
    setInterval(() => {

      const x = (Math.random() - 0.5) * 2
      const z = (Math.random() - 0.5) * 2

      client.write("player_auth_input", {
        pitch: 0,
        yaw: Math.random() * 360,
        position: { x: x, y: 64, z: z },
        move_vector: { x: x, z: z },
        head_yaw: 0,
        input_data: { forward: true }
      })

      console.log("Random move")

    }, 10000)
  })

  client.on("disconnect", () => {
    console.log("Disconnected, reconnecting...")
    setTimeout(startBot, 5000)
  })

  client.on("error", err => {
    console.log("Error:", err)
  })
}

startBot()
