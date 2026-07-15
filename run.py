from __future__ import annotations

import shutil
import subprocess
import sys
import threading
import time
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"
APP_URL = "http://localhost:3000"


def first_existing(paths: list[Path]) -> Path | None:
    for path in paths:
        if path.exists():
            return path
    return None


def find_node() -> str | None:
    bundled_node = (
        Path.home()
        / ".cache"
        / "codex-runtimes"
        / "codex-primary-runtime"
        / "dependencies"
        / "node"
        / "bin"
        / "node.exe"
    )
    return shutil.which("node") or (str(bundled_node) if bundled_node.exists() else None)


def find_chrome() -> str | None:
    chrome = first_existing(
        [
            Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
            Path("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
        ]
    )
    return str(chrome) if chrome else None


def open_browser() -> None:
    chrome = find_chrome()
    if not chrome:
        return

    time.sleep(3)
    subprocess.Popen([chrome, APP_URL], cwd=PROJECT_ROOT)


def schedule_browser_open() -> None:
    threading.Thread(target=open_browser, daemon=True).start()


def main() -> int:
    next_bin = FRONTEND_DIR / "node_modules" / "next" / "dist" / "bin" / "next"
    node = find_node()

    if next_bin.exists() and node:
        schedule_browser_open()
        return subprocess.call([node, str(next_bin), "dev", "-H", "127.0.0.1", "-p", "3000"], cwd=FRONTEND_DIR)

    npm = shutil.which("npm")
    if npm:
        schedule_browser_open()
        return subprocess.call([npm, "run", "dev"], cwd=FRONTEND_DIR)

    print("TinCap OS cannot start: Node.js/npm is not available and frontend dependencies are not installed.")
    print("Install Node.js 20+, then run: cd frontend && npm install && npm run dev")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
