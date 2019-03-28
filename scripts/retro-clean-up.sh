#!/bin/bash

# the following script is used by a cronjob to clean up unused boards

# delete all board data older than 3 weeks
find ~/retro/backend/storage/ -type f -name '*.json' -mtime +21 -exec rm {} \;

# delete all images generated from the export feature, which are older than 3 weeks
find ~/retro/backend/storage/ -type f -name '*.png' -mtime +21 -exec rm {} \;