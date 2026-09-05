#!/usr/bin/env bash
# Build script for Render deployment

set -e  # Exit on error

echo "=== Starting build process ==="
echo "Python version: $(python --version)"

# Verify Python version is 3.11.x
if [[ "$(python --version 2>&1)" != *"3.11"* ]]; then
    echo "ERROR: Python 3.11 required, but found $(python --version)"
    exit 1
fi

# Ensure only binary wheels are used (no Rust compilation)
export PIP_ONLY_BINARY=:all:
export PIP_PREFER_BINARY=1

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies - only use pre-built wheels
echo "=== Installing Python dependencies ==="
pip install --no-cache-dir --only-binary=:all: -r backend/requirements.txt

# Create reports directory
mkdir -p backend/reports

echo "=== Build completed successfully ==="