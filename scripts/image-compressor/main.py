import os
from PIL import Image


def main():
    input_path = "../../dist/img"
    for (_, _, filenames) in os.walk(input_path):
        for filename in filenames:
            file_extension = filename.split(".")[-1]
            if file_extension != "png":
                continue

            file_path = os.path.join(input_path, filename)
            with Image.open(file_path) as image:
                image.save(file_path, quality=1, optimize=True)


main()
