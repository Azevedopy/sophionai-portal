$replacements = @{
    'Ã§' = 'ç'
    'Ã£' = 'ã'
    'Ã³' = 'ó'
    'Ã©' = 'é'
    'Ãª' = 'ê'
    'Ã­' = 'í'
    'Ã¡' = 'á'
    'Ãº' = 'ú'
    'Ã¢' = 'â'
    'Ãµ' = 'õ'
    'Ã ' = 'à'
    'Â·' = '·'
    'â€“' = '–'
    'â†’' = '→'
    'â€”' = '—'
    'Â©' = '©'
    'â ±ï¸ ' = '⏱️'
    'Ã‡' = 'Ç'
    'Ãƒ' = 'Ã'
    'Ã“' = 'Ó'
    'Ã‰' = 'É'
    'ÃŠ' = 'Ê'
    'Ã ' = 'Í'
    'Ã ' = 'Á'
    'Ãš' = 'Ú'
    'Ã‚' = 'Â'
    'Ã•' = 'Õ'
}

$files = @("site.html", "css\style.css")

foreach ($file in $files) {
    $content = Get-Content -Raw $file -Encoding UTF8
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    [System.IO.File]::WriteAllText($file, $content, (New-Object System.Text.UTF8Encoding $false))
}
