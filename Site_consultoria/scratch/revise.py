import os
import re

file_path = "site.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract CSS
style_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
if style_match:
    css_content = style_match.group(1).strip()
    
    if not os.path.exists("css"):
        os.makedirs("css")
        
    with open("css/style.css", "w", encoding="utf-8") as f:
        f.write(css_content)
        
    # Replace <style>...</style> with <link rel="stylesheet" href="css/style.css">
    content = content[:style_match.start()] + '<link rel="stylesheet" href="css/style.css">' + content[style_match.end():]

# Now let's wrap nav in <header>
nav_pattern = r"(<!-- NAVEGAÇÃO -->\s*)<div class=\"container\">\s*<nav>.*?</nav>\s*</div>"
nav_match = re.search(nav_pattern, content, re.DOTALL)
if nav_match:
    header_replacement = nav_match.group(1) + "<header>\n    " + nav_match.group(0).replace(nav_match.group(1), "").replace("\n", "\n    ") + "\n</header>"
    content = content[:nav_match.start()] + header_replacement + content[nav_match.end():]

# Now let's wrap the rest in <main>
# We can find the start of <main> after </header> and end before <footer>
header_end = content.find("</header>")
if header_end != -1:
    main_start_idx = header_end + len("</header>")
    footer_start = content.find("<!-- FOOTER -->")
    
    if footer_start != -1:
        # Wrap everything in between
        before = content[:main_start_idx]
        middle = content[main_start_idx:footer_start]
        after = content[footer_start:]
        
        # Add <main> tags
        content = before + "\n\n<main>" + middle + "\n</main>\n\n" + after

with open("site.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Revision complete.")
