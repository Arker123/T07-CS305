import os
import csv
import json
import logging
import argparse
from typing import Dict, List

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


def get_video_id(video_link: str) -> str:
    # Extract video ID from YouTube video link
    if "youtube.com/watch?v=" in video_link:
        video_id = video_link.split("youtube.com/watch?v=")[1].split("&")[0]
    elif "youtu.be" in video_link:
        video_id = video_link.split("youtu.be/")[1].split("?")[0]
    else:
        raise ValueError("Invalid YouTube video link")
    return video_id


def save_to_text(data: List[Dict[str, str]], text_filename: str) -> None:
    """
    Save the transcript text to a text file.
    """
    with open(text_filename, mode="w", encoding="utf-8") as text_file:
        for caption in data:
            start = caption["start"]
            end = caption["end"]
            text = caption["text"]
            text_file.write(f"{start} --> {end}  ")
            text_file.write(f"{text}\n")


def save_to_csv(data: List[Dict[str, str]], csv_filename: str) -> None:
    """
    Save the transcript data to a CSV file.
    """
    with open(csv_filename, mode="w", encoding="utf-8") as csv_file:
        fieldnames = ["start", "end", "text"]
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        for field in data:
            writer.writerow(
                {
                    fieldnames[0]: field[fieldnames[0]],
                    fieldnames[1]: field[fieldnames[1]],
                    fieldnames[2]: field[fieldnames[2]],
                }
            )


def save_to_file(data: List[Dict[str, str]], args: argparse.Namespace) -> None:
    output_path = "transcripts"
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    json_count = 0
    text_count = 0
    csv_count = 0

    # Save data to JSON
    if args.json:
        json_filename = "transcript_data.json"
        while os.path.exists(os.path.join(output_path, json_filename)):
            json_count += 1
            json_filename = f"transcript_data{json_count}.json"
        with open(os.path.join(output_path, json_filename), "w") as json_file:
            json.dump(data, json_file, indent=4)
            logger.info("Transcript data saved to %s", json_filename)

    # Save data to text
    if args.text:
        text_filename = "transcript_text.txt"
        while os.path.exists(os.path.join(output_path, text_filename)):
            text_count += 1
            text_filename = f"transcript_text{text_count}.txt"
        save_to_text(data, os.path.join(output_path, text_filename))
        logger.info("Transcript text saved to %s", text_filename)

    # Save data to CSV
    if args.csv:
        csv_filename = "transcript_data.csv"
        while os.path.exists(os.path.join(output_path, csv_filename)):
            csv_count += 1
            csv_filename = f"transcript_data{csv_count}.csv"
        save_to_csv(data, os.path.join(output_path, csv_filename))
        logger.info("Transcript data saved to %s", csv_filename)
