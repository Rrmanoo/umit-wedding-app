import urllib.request
import re

css_url = "https://static.tildacdn.pro/ws/project13340371/tilda-blocks-page120492923.min.css"
try:
    req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        css_content = response.read().decode('utf-8')
    
    # Search for font-family
    families = re.findall(r"font-family:[^;\"'}]+", css_content)
    print("Fonts found in CSS:")
    for f in set(families):
        print(f.strip())
except Exception as e:
    print("Error:", e)
