# -*- coding: utf-8 -*-
"""chatbot.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1bD-IvZU-gU3rj-1oLbqb-mQ2-_Tx1u8Q
"""

from transformers import BertTokenizer, BertForQuestionAnswering
import torch

# Load pre-trained BERT model and tokenizer
model_name = "bert-large-uncased-whole-word-masking-finetuned-squad"
model = BertForQuestionAnswering.from_pretrained(model_name)
tokenizer = BertTokenizer.from_pretrained(model_name)

import nltk
nltk.download('punkt')

from nltk.tokenize import sent_tokenize

paragraph=input("Give summary: ")

sentences = sent_tokenize(paragraph)

def split_into_paragraphs(sentences, max_words=350):
    current_paragraph = []
    paragraphs = []
    # print(sentences)
    for sentence in sentences:
        current_paragraph.append(sentence)
        word_count = sum(len(s.split()) for s in current_paragraph)

        if word_count >= max_words:
            paragraphs.append(' '.join(current_paragraph))
            current_paragraph = []

    if current_paragraph:
        paragraphs.append(' '.join(current_paragraph))
    # print(len())
    return paragraphs

paragraphs = split_into_paragraphs(sentences)

for index, p in enumerate(paragraphs):
    print(f"Paragraph {index + 1}: {p}\n")

# Function to answer question
def answer_question(paragraph, question):
    inputs = tokenizer(question, paragraph, return_tensors='pt')
    start_scores, end_scores = model(**inputs).values()
    answer_start = torch.argmax(start_scores)
    answer_end = torch.argmax(end_scores) + 1
    tokens = tokenizer.convert_ids_to_tokens(inputs['input_ids'][0])
    answer = tokenizer.convert_tokens_to_string(tokens[answer_start:answer_end])
    return answer

while True:
  question: str = input("Ask question or type \"exit\" to exit: ")

  if question.lower() == "exit":
    break

  answers = []
  for paragraph in paragraphs:
      answer = answer_question(paragraph, question)
      answers.append(answer)
      # print("Answer:", answer)

  print(answers)

  filtered_answers = [answer for answer in answers if '[CLS]' not in answer and '[SEP]' not in answer and answer!=""]

  if filtered_answers:
    final_answer=filtered_answers[0]
  else:
    final_answer="Could not find answer to that question"

  if final_answer=='':
    final_answer="Could not find answer to that question"
  print(final_answer)