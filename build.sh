#!/usr/bin/env bash
# Build script for Render deployment

set -e  # Exit on error

echo "=== Starting build process ==="
PYTHON_VERSION=$(python --version 2>&1)
echo "Python version: $PYTHON_VERSION"

# Verify Python version is 3.11.x
if [[ "$PYTHON_VERSION" != *"3.11"* ]]; then
    echo "ERROR: Python 3.11 required, but found $PYTHON_VERSION"
    echo "This build will fail because pydantic-core requires Rust compilation on Python 3.14+"
    exit 1
fi

# Ensure only binary wheels are used (no Rust compilation)
export PIP_ONLY_BINARY=:all:
export PIP_PREFER_BINARY=1
export PIP_NO_BUILD_ISOLATION=1

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies - only use pre-built wheels
echo "=== Installing Python dependencies ==="
pip install --no-cache-dir --only-binary=:all: --prefer-binary -r backend/requirements.txt

# Create reports directory
mkdir -p backend/reports

echo "=== Build completed successfully ==="