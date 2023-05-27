import nltk
from nltk.tokenize import word_tokenize

def tokenize(text):
    tokens = word_tokenize(text)
    return '\n'.join(tokens)

# Read the input text from standard input
text = input()

# Tokenize the text and print the tokens
tokenized_text = tokenize(text)
print(tokenized_text)
