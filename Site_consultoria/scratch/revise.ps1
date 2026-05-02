$content = Get-Content -Raw "site.html"
$css = [regex]::Match($content, '(?s)<style>(.*?)</style>').Groups[1].Value.Trim()
New-Item -ItemType Directory -Force -Path "css" | Out-Null
Set-Content -Path "css\style.css" -Value $css -Encoding UTF8

$content = [regex]::Replace($content, '(?s)<style>.*?</style>', '<link rel="stylesheet" href="css/style.css">')

# Wrap nav in header
$navPattern = '(?s)(<!-- NAVEGAÇÃO -->\s*)<div class="container">\s*<nav>.*?</nav>\s*</div>'
$navMatch = [regex]::Match($content, $navPattern)
if ($navMatch.Success) {
    $headerReplacement = $navMatch.Groups[1].Value + "<header>`n    " + $navMatch.Value.Replace($navMatch.Groups[1].Value, "").Replace("`n", "`n    ") + "`n</header>"
    $content = $content.Replace($navMatch.Value, $headerReplacement)
}

# Wrap main
$headerEnd = $content.IndexOf("</header>")
if ($headerEnd -ne -1) {
    $mainStartIdx = $headerEnd + "</header>".Length
    $footerStart = $content.IndexOf("<!-- FOOTER -->")
    if ($footerStart -ne -1) {
        $before = $content.Substring(0, $mainStartIdx)
        $middle = $content.Substring($mainStartIdx, $footerStart - $mainStartIdx)
        $after = $content.Substring($footerStart)
        $content = $before + "`n`n<main>" + $middle + "`n</main>`n`n" + $after
    }
}

Set-Content -Path "site.html" -Value $content -Encoding UTF8
