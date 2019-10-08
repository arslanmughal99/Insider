

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

before proceding first open `main.py`  file in text edditor and place your `ESSID`, `PASSWORD` , `ACTION_PIN`  and save now move `main.py`  into microcontroller using `rshell` .

```bash
rshell -p DEVICE_SERIAL_PORT
# once rshell connected sucessfully hit next command
cp main.py pyboard/
```

After all press restart button of `esp` and thats it from `esp` side.

### Insider Desktop App :

Download latest release for desktop application [here](https://github.com/arslanmughal5566/Insider/releases)

<u>***if you need to build from source check out the DesktopTrayApp directory in the repo.***</u>

Once Downloaded double click setup file and it will automatically install in you system and a tray icon for `Insider` will appear like this .

<div>
    <p align="center">
        <img src="https://i.imgur.com/4Y33D66.png" />    
    </p>
</div>

Click the icon you will find somting like this make sure that you pc is connected to your esp wifi .

<div>
    <p align="center">
        <img src="https://i.imgur.com/4rCdN7j.png" />
    </p>
</div>

Now click that little settings icon on top right corrner of the tray app and select you interface that is connected to the esp wifi .

<div>
    <p align="center">
        <img src="https://i.imgur.com/et7ZzvE.png" />
    </p>
</div>

Now back and click the gaint Door icon and **done** .



<div>
    <p align="center">
        <img src="https://i.imgur.com/a9hcGW1.png" />
    </p>
</div>
