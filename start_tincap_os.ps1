$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledPython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
$pyCommand = Get-Command py -ErrorAction SilentlyContinue

if (Test-Path $bundledPython) {
    Start-Process -WindowStyle Hidden -FilePath $bundledPython -ArgumentList @('run.py') -WorkingDirectory $projectRoot
    exit 0
}

if ($pythonCommand) {
    Start-Process -WindowStyle Hidden -FilePath $pythonCommand.Source -ArgumentList @('run.py') -WorkingDirectory $projectRoot
    exit 0
}

if ($pyCommand) {
    Start-Process -WindowStyle Hidden -FilePath $pyCommand.Source -ArgumentList @('-3', 'run.py') -WorkingDirectory $projectRoot
    exit 0
}

Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('Python is not installed or not available in PATH.', 'TinCap OS')
exit 1
