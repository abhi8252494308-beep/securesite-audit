# Gunicorn configuration for Render deployment
import os

# The FastAPI application
wsgi_app = "backend.app.main:app"

# Worker configuration
worker_class = "uvicorn.workers.UvicornWorker"
workers = int(os.environ.get("WEB_CONCURRENCY", 4))
timeout = int(os.environ.get("WEB_TIMEOUT", 120))

# Binding
bind = "0.0.0.0:" + os.environ.get("PORT", "8000")

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Preload app for better performance
preload_app = True

# Worker temporary directory
worker_tmp_dir = "/dev/shm"