#!/bin/bash
echo "Setting up transliteration service..."

# Create necessary directories
mkdir -p uploads processed static/downloads

# Download Japanese dictionary if needed
python -c "
try:
    import unidic
    unidic.download()
except:
    print('unidic download failed, will download at runtime')
"

echo "Setup complete!"