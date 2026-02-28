#!/bin/bash

# Script to create a new post with smart image selection
# Usage: ./create-post.sh "Post Title" [--slug custom-slug]

POSTS_DIR="/home/zaya/Downloads/Zayas/zayaweb/apps/web/src/posts"
IMAGES_BASE_DIR="/home/zaya/Downloads/Zayas/zayaweb/apps/web/static/css/img"
SCRIPTS_DIR="/home/zaya/Downloads/Zayas/zayaweb/apps/web/scripts"

# Function to slugify a string
slugify() {
    echo "$1" | iconv -t ascii//TRANSLIT | sed -r 's/[^a-zA-Z0-9]+/-/g' | sed -r 's/^-+\|-+$//g' | tr A-Z a-z
}

# Function to get random image from directory
get_random_image() {
    local dir="$1"
    local pattern="$2"
    if [ -d "$dir" ]; then
        local images=($(find "$dir" -name "$pattern" -type f 2>/dev/null))
        if [ ${#images[@]} -gt 0 ]; then
            local random_index=$((RANDOM % ${#images[@]}))
            local image_path="${images[$random_index]}"
            # Convert to web path
            echo "${image_path#/home/zaya/Downloads/Zayas/zayaweb/apps/web/static}"
        fi
    fi
    echo ""
}

# Function to smartly select image based on post title
select_smart_image() {
    local title="$1"
    local slug="$2"
    local lowercase_title=$(echo "$title" | tr '[:upper:]' '[:lower:]')
    
    # Define keyword to folder mappings
    declare -A keyword_mappings=(
        ["bing"]="Bing"
        ["cinema"]="Cinema" 
        ["film"]="Cinema"
        ["movie"]="Cinema"
        ["psychoanalysis"]="Psychoanalysis"
        ["psychology"]="Psychoanalysis"
        ["lacan"]="Psychoanalysis"
        ["freud"]="Psychoanalysis"
        ["kb"]="KB"
        ["ndp"]="NdP"
        ["anguish"]="NdP/Anguish"
        ["anime"]="NdP/Anime"
        ["arthistory"]="NdP/ArtHistory"
        ["creatures"]="NdP/Creatures"
        ["mobius"]="NdP/Mobius"
        ["algorithm"]="Bing"
        ["digital"]="Bing"
        ["machine"]="Bing"
        ["math"]="Bing"
        ["physics"]="Bing"
        ["business"]="KB"
        ["economy"]="KB"
        ["cv"]="KB"
        ["career"]="KB"
        ["language"]="NdP"
        ["linguistics"]="NdP"
        ["phonetics"]="NdP"
        ["quotes"]="Psychoanalysis"
        ["literature"]="Psychoanalysis"
        ["book"]="Psychoanalysis"
        ["theater"]="Cinema"
        ["volleyball"]="KB"
        ["dev"]="Bing"
        ["coding"]="Bing"
        ["terminal"]="Bing"
        ["linktree"]="KB"
    )
    
    # Check for specific patterns in slug or title
    for keyword in "${!keyword_mappings[@]}"; do
        if [[ "$lowercase_title" == *"$keyword"* ]] || [[ "$slug" == *"$keyword"* ]]; then
            local folder="${keyword_mappings[$keyword]}"
            local full_path="$IMAGES_BASE_DIR/$folder"
            
            # Determine pattern based on folder
            case "$folder" in
                "Bing")
                    echo $(get_random_image "$full_path" "bing*.png")
                    return 0
                    ;;
                "Cinema")
                    echo $(get_random_image "$full_path" "Cinema*.png")
                    return 0
                    ;;
                "KB")
                    echo $(get_random_image "$full_path" "*.png")
                    return 0
                    ;;
                "Psychoanalysis")
                    echo $(get_random_image "$full_path" "*.png")
                    return 0
                    ;;
                "NdP"*)
                    echo $(get_random_image "$full_path" "*.png")
                    return 0
                    ;;
            esac
        fi
    done
    
    # Default fallback - try Bing first, then others
    local default_image=$(get_random_image "$IMAGES_BASE_DIR/Bing" "bing*.png")
    if [ -n "$default_image" ]; then
        echo "$default_image"
    else
        # Fallback to any image
        local all_images=($(find "$IMAGES_BASE_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -type f 2>/dev/null))
        if [ ${#all_images[@]} -gt 0 ]; then
            local random_index=$((RANDOM % ${#all_images[@]}))
            local image_path="${all_images[$random_index]}"
            echo "${image_path#/home/zaya/Downloads/Zayas/zayaweb/apps/web/static}"
        else
            echo "/css/img/default.png"  # Ultimate fallback
        fi
    fi
}

# Main script
if [ $# -eq 0 ]; then
    echo "Usage: $0 \"Post Title\" [--slug custom-slug]"
    exit 1
fi

POST_TITLE="$1"
CUSTOM_SLUG=""

# Parse arguments
if [ $# -gt 1 ] && [ "$2" = "--slug" ] && [ $# -gt 2 ]; then
    CUSTOM_SLUG="$3"
    SLUG=$(slugify "$CUSTOM_SLUG" | sed -E 's/\b(\w)/\U\1/g')
else
    SLUG=$(slugify "$POST_TITLE" | sed -E 's/\b(\w)/\U\1/g')
fi

# Generate current date
CURRENT_DATE=$(date +%Y-%m-%d)

# Smart image selection
IMG_URL=$(select_smart_image "$POST_TITLE" "$SLUG")

# Create post file - FIXED: using .md extension instead of .mdx
POST_FILE="$POSTS_DIR/${SLUG}.md"

if [ -f "$POST_FILE" ]; then
    echo "Error: Post with slug '$SLUG' already exists!"
    exit 1
fi

# Create post content
cat > "$POST_FILE" << POST_CONTENT
---
title: "$POST_TITLE"
imgUrl: "$IMG_URL"
youtubeId: ""
publishedAt: "$CURRENT_DATE"
updatedAt: "$CURRENT_DATE"
summary: "Add a brief summary here"
---

# $POST_TITLE

Start writing your post content here...

POST_CONTENT

echo "✅ Post created successfully: $POST_FILE"
echo "📝 Title: $POST_TITLE"
echo "🔗 Slug: $SLUG"
echo "🖼️  Image: $IMG_URL"
echo "📅 Date: $CURRENT_DATE"