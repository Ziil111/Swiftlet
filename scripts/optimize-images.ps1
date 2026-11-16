# Resizes and compresses source photos into web-optimised JPEGs (assets/img).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1 -Source <folder>
param(
  [string]$Source = "$PSScriptRoot\..\assets\img\raw",
  [string]$Dest = "$PSScriptRoot\..\assets\img",
  [int]$Quality = 80
)
Add-Type -AssemblyName System.Drawing

# target name => [match prefix, max width]
$map = [ordered]@{
  'hero'       = @('hero', 1920)
  'trade'      = @('trade', 1600)
  'grades'     = @('grades', 1200)
  'statistics' = @('statistics', 1200)
  'authentic'  = @('authentic', 1200)
  'about'      = @('about', 960)
  'product-1'  = @('product_1', 800)
  'product-2'  = @('product_2', 800)
  'product-3'  = @('product_3', 800)
  'product-4'  = @('product_4', 800)
  'product-5'  = @('product_5', 800)
  'product-6'  = @('product_6', 800)
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)

New-Item -ItemType Directory -Force -Path $Dest | Out-Null
foreach ($name in $map.Keys) {
  $prefix, $maxW = $map[$name]
  $file = Get-ChildItem -Path $Source -File | Where-Object { $_.BaseName -match "^$([regex]::Escape($prefix))(_\d+)?$" -or $_.BaseName -eq $name } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $file) { Write-Warning "Missing source for $name"; continue }
  $src = [System.Drawing.Image]::FromFile($file.FullName)
  $w = [Math]::Min($maxW, $src.Width)
  $h = [int]($src.Height * $w / $src.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($src, 0, 0, $w, $h)
  $out = Join-Path $Dest "$name.jpg"
  $bmp.Save($out, $codec, $params)
  $g.Dispose(); $bmp.Dispose(); $src.Dispose()
  "{0,-12} {1}x{2}  {3:N0} KB" -f $name, $w, $h, ((Get-Item $out).Length / 1KB)
}
