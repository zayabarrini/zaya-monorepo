import time
import subprocess
import sys
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class ReloadHandler(FileSystemEventHandler):
    def __init__(self):
        self.process = None
        self.restart()

    def restart(self):
        if self.process:
            self.process.kill()
        print("\n🔄 Restarting Flask server...")
        self.process = subprocess.Popen([sys.executable, "api/index.py"])

    def on_modified(self, event):
        if event.src_path.endswith(".py"):
            print(f"📝 {event.src_path} changed")
            self.restart()


if __name__ == "__main__":
    handler = ReloadHandler()
    observer = Observer()
    observer.schedule(handler, path="api", recursive=True)
    observer.schedule(handler, path="src", recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        if handler.process:
            handler.process.kill()
    observer.join()
