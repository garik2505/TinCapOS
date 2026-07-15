$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$frontendRoot = Join-Path $projectRoot 'frontend'
$bundledNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$node = $null

if ($nodeCommand) {
    $node = $nodeCommand.Source
} elseif (Test-Path $bundledNode) {
    $node = $bundledNode
}

if (-not $node) {
    throw 'Node.js is not available. Install Node.js 20+ or run from Codex runtime.'
}

$tsc = Join-Path $frontendRoot 'node_modules\typescript\bin\tsc'
$next = Join-Path $frontendRoot 'node_modules\next\dist\bin\next'

if (-not (Test-Path $tsc) -or -not (Test-Path $next)) {
    throw 'Frontend dependencies are not installed. Run: cd frontend; npm install'
}

Push-Location $frontendRoot
try {
    & $node $tsc --noEmit
    & $node $next build
}
finally {
    Pop-Location
}
