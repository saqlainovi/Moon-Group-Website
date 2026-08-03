import re

html = open('temp_drive.html').read()
pattern = re.compile(r'\["(1[a-zA-Z0-9_-]{32})",\["11njaiODo6p8E26w6U9CZEVXjQSOu6gbO"\],"([^"]+\.jpg)"')
matches = pattern.findall(html)
for m in set(matches):
    print(f'https://lh3.googleusercontent.com/d/{m[0]}')
