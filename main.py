import network 
import socket
import time
from machine import Pin

# Change Wifi Ap ESSID(name) and PASSWORD with yours
ESSID = "<Replace_With_your_essid>"
PASSWORD = "<Replace_with_your_password>"

# Defining Pin and constants
UP_TIME = 0.2
ACTION_PIN = 21

outpin = Pin(ACTION_PIN, Pin.OUT)

# Creating access point AP
ap = network.WLAN(network.AP_IF)
# AP configurations
ap.config(essid=ESSID, authmode=3, channel=11, hidden=True, password=PASSWORD)
# Activating AP
ap.active(True)

# Creating Server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Binding socket with ESP32 IP
s.bind(("192.168.4.1", 1234))
# Listenning to request and Queue max 5 clients 
s.listen(5)

# make outpin high for specified time
def openGate():
    outpin.value(1)
    time.sleep(UP_TIME)
    outpin.value(0)

while True: 
    client, addr = s.accept()
    client.send("200".encode("utf-8"))
    openGate()
    client.close()






