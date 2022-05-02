# Mini Digital Thermometer & Hygrometer Zigbee

DIY беспроводной датчик, работающий на базе SoC CC2530 (Зигби), питание от батареи CR2477, е-пэпер дисплей 1.02. Работает в Home Assistance (z2m, zha). Поддерживает биндинг, конфигурирование через exposes.

DIY wireless sensor powered by SoC CC2530 (Zigbee), powered by CR2477 battery, e-peper display 1.02. Works in Home Assistance (Z2M, ZHA). Supports binding, configuration via exposes.

### !!! It is forbidden to manufacture devices for commercial sale, only for personal use !!!

## You can make your own pcb here - https://www.pcbway.com/setinvite.aspx?inviteid=550959


#### Sale: hello@efektalab.com 

#### Video: https://youtu.be/Fae1yz_HcuA

#### Telegram DiyDev - https://t.me/diy_devices

More info at http://efektalab.com/eTHz

https://www.zigbee2mqtt.io/devices/EFEKTA_eTH102.html

---

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/0011.jpg) 

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/005.jpg) 

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/012.jpg) 


---

### How to flash the device

1. Download the Smart RF Flash Programmer V1 https://www.ti.com/tool/FLASH-PROGRAMMER

2. Open the application select the HEX firmware file

3. Connect the device with wires to CCDebugger, first erase the chip, then flash it.

---

### How to install IAR

https://github.com/ZigDevWiki/zigdevwiki.github.io/blob/main/docs/Begin/IAR_install.md

https://github.com/sigma7i/zigbee-wiki/wiki/zigbee-firmware-install (RU)

---

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/015.jpg) 

### How to join:
#### If device in FN(factory new) state:
##### one way
1. Open z2m, make sure that joining is prohibited
2. Insert the battery into the device
3. Click on the icon in z2m - allow joining (you have 180 seconds to add the device)
4. Go to the LOGS tab
5. Press the reset button on the device (the join procedure will begin, еhe device starts flashing the LED repeatedly)
6. Wait, in case of successfull join, device will flash led 5 times, if join failed, device will flash led 2 times

##### another way
1. Open z2m, make sure that joining is prohibited
2. Insert the battery into the device
3. Click on the icon in z2m - allow joining (you have 180 seconds to add the device)
4. Go to the LOGS tab
5. Press and hold button (1) for 2-3 seconds, until device start flashing the LED repeatedly
6. Wait, in case of successfull join, device will flash led 5 times, if join failed, device will flash led 2 times


#### If device in a network:
##### one way 
1. Hold button (1) for 10 seconds, this will reset device to FN(factory new) status 
2. Click on the icon in z2m - allow joining (you have 180 seconds to add the device)
3. Go to the LOGS tab
5. Press and hold button (1) for 2-3 seconds, until device start flashing the LED repeatedly
6. Wait, in case of successfull join, device will flash led 5 times, if join failed, device will flash led 2 times

##### another way
1.Find the device in the list of z2m devices and delete it by applying force remove
2. Click on the icon in z2m - allow joining (you have 180 seconds to add the device)
3. Go to the LOGS tab
4. Press the reset button on the device (the join procedure will begin, еhe device starts flashing the LED repeatedly)
5. Wait, in case of successfull join, device will flash led 5 times, if join failed, device will flash led 2 times


### How to binding:

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/009.jpg) 

### How to configure:

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/010.jpg) 

![Mini Digital Thermometer & Hygrometer Zigbee](https://github.com/smartboxchannel/Mini-Digital-Thermometer-Hygrometer-Zigbee/blob/main/IMAGES/011.jpg) 



### Troubleshooting

If a device does not connect to your coordinator, please try the following:

1. Power off all routers in your network.
2. Move the device near to your coordinator (about 1 meter).
or if you cannot disable routers (for example, internal switches), you may try the following:
2.1. Disconnect an external antenna from your coordinator.
2.2. Move a device to your coordinator closely (1-3 centimeters).
3. Power on, power on the device.
4. Restart your coordinator (for example, restart Zigbee2MQTT if you use it).

If the device has not fully passed the join

1. If the device is visible in the list of z2m devices, remove it by applying force remove
2. Restart your coordinator (for example, restart Zigbee2MQTT if you use it).
3. Click on the icon in z2m - allow joining (you have 180 seconds to add the device)
4. Go to the LOGS tab
5. Press and hold button (1) for 2-3 seconds, until device start flashing the LED repeatedly
6. Wait, in case of successfull join, device will flash led 5 times, if join failed, device will flash led 2 times



### Other checks

Please, ensure the following:

1. Your power source is OK (a battery has more than 3V). You can temporarily use an external power source for testings (for example, from a debugger).
2. The RF part of your E18 board works. You can upload another firmware to it and try to pair it with your coordinator. Or you may use another coordinator and build a separate Zigbee network for testing.
3. Your coordinator has free slots for direct connections.
4. You permit joining on your coordinator.
5. Your device did not join to other opened Zigbee network. When you press and hold the button, it should flash every 3-4 seconds. It means that the device in the joining state.
