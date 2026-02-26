#!/bin/bash

# Script to fix image URLs in existing posts
# Usage: ./fix-post-images.sh [post-slug]

POSTS_DIR="/home/zaya/Downloads/Zayas/zayaweb/src/posts"
IMAGES_BASE_DIR="/home/zaya/Downloads/Zayas/zayaweb/static/css/img"

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
            echo "${image_path#/home/zaya/Downloads/Zayas/zayaweb/static}"
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
            echo "${image_path#/home/zaya/Downloads/Zayas/zayaweb/static}"
        else
            echo "/css/img/default.png"  # Ultimate fallback
        fi
    fi
}

# Function to process a single post
process_post() {
    local post_file="$1"
    local post_slug=$(basename "$post_file" .md)
    
    echo "Processing: $post_slug"
    
    # Extract current title
    local title=$(grep -m 1 '^title:' "$post_file" | cut -d '"' -f 2)
    
    if [ -z "$title" ]; then
        echo "  ⚠️  Could not find title, using slug for image selection"
        title="$post_slug"
    fi
    
    # Smart image selection
    local new_img_url=$(select_smart_image "$title" "$post_slug")
    
    if [ -n "$new_img_url" ]; then
        # Update the imgUrl in the post file
        if grep -q '^imgUrl:' "$post_file"; then
            # Replace existing imgUrl
            sed -i "s|^imgUrl: \".*\"|imgUrl: \"$new_img_url\"|" "$post_file"
            echo "  ✅ Updated image to: $new_img_url"
        else
            # Add imgUrl if it doesn't exist (shouldn't happen with our structure)
            sed -i "/^title:/a imgUrl: \"$new_img_url\"" "$post_file"
            echo "  ➕ Added image: $new_img_url"
        fi
    else
        echo "  ❌ Could not find suitable image"
    fi
}

# Main script
if [ $# -eq 1 ]; then
    # Process specific post
    POST_FILE="$POSTS_DIR/$1.md"
    if [ -f "$POST_FILE" ]; then
        process_post "$POST_FILE"
    else
        echo "Error: Post $1 not found!"
        exit 1
    fi
else
    # Process all posts
    echo "Fixing images for all posts..."
    for post_file in "$POSTS_DIR"/*.md; do
        if [ -f "$post_file" ]; then
            process_post "$post_file"
        fi
    done
    echo "✅ All posts processed!"
fi