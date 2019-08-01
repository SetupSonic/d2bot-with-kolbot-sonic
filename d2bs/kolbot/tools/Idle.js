function main() {
	print("loaded Anti Idler");
	var t = 0;
	while (true) {
		if (getTickCount()-t>4*60*1000 && me.gameReady) {
			sendPacket(1,0x40);
			print(".");
			t = getTickCount();
		}
		delay(1000);
	}
}