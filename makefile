MESSAGE=$1

push:
	git add . && git commit -m "$(MESSAGE)" && git push
 