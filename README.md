

<div>
    <p align="center">
        <img src="https://i.imgur.com/k5aFLsJ.png"/>
    </p> 
    <h2 align="center">INSIDER</h2>
    <p align="center">Minimal Esp32 / Esp8266 smart door controll with your desktop</p>
</div>

#### What is insider ?

insider is a minimal smart door controll based on `esp32 / esp8266` microcontroller which can be controll through you desktop or latpop to trigger relay in order to open door .



### Flashing `Esp32 / Esp8266` :

Make sure that `python 3.x` and `pip` is install in your system. Download your respective micropython  firmware from [Official MicroPython](https://micropython.org/download) website.

In order to flash micropython firmware to your microcontroller you need to install `esptool.py`  & `rshell`, execute following command in Terminal (for windows it will be CMD).

```bash
pip install esptool
pip install rshell
```

Once you install esptool now its time to flash microPython firmware to the `Esp`

```bash
# First Erase Flash 
esptool.py --port DEVICE_YOUR_SERIAL_PORT erase_flash
# for Esp32
esptool.py --chip esp32 --port DEVICE_YOUR_SERIAL_PORT --baud 460800 write_flash -z 0x1000 esp32-downloaded-bin-file-path-here.bin

# for Esp8266
esptool.py --port DEVICE_YOUR_SERIAL_PORT --baud 460800 write_flash --flash_size=detect 0 esp8266-downloaded-bin-file-path-here.bin
```

Now that we have flashed the firmware clone this repository at you desier location .

```bash
git clone git@github.com:arslanmughal5566/Insider.git
cd Insider
```

before proceding first open `main.py`  file in text edditor and place your `ESSID` and `PASSWORD` and save now move `main.py`  into microcontroller using `rshell` .

```bash
rshell -p DEVICE_SERIAL_PORT
# once rshell connected sucessfully hit next command
cp main.py pyboard/
```


