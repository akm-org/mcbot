import random
import string
import time
from minecraft.networking.connection import Connection
from minecraft.networking.packets import clientbound, serverbound

SERVER = "Animationmovie.aternos.me"
PORT = 62132


def random_name():
    return "Bot_" + ''.join(random.choices(string.ascii_letters + string.digits, k=6))


def start_bot():
    username = random_name()
    print("Starting bot:", username)

    connection = Connection(SERVER, PORT, username=username)

    def joined(packet):
        print(username, "joined the server")

    connection.register_packet_listener(joined, clientbound.play.JoinGamePacket)

    try:
        connection.connect()

        while True:
            time.sleep(20)

            # small movement packet to avoid AFK kick
            packet = serverbound.play.PlayerPositionPacket()
            packet.x = random.uniform(-1, 1)
            packet.y = 0
            packet.z = random.uniform(-1, 1)
            packet.on_ground = True

            connection.write_packet(packet)

    except Exception as e:
        print("Disconnected:", e)


while True:
    start_bot()
    print("Reconnecting in 10 seconds...")
    time.sleep(10)
