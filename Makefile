all:
	cp assets/icons/{LICENCE.md,study-{16,32,64}.png} data/icons/
	cfx --output-file=build/ezproxy-helper.xpi xpi

