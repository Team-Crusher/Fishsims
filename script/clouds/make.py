from PIL import Image
from random import random, randint
import os


def getTiles(path="tiles"):
    files = os.listdir(path)
    files.sort()
    tiles = []
    for file in files:
        tiles += [Image.open('{}/{}'.format(path, file))]
    return tiles


def fillSection(image, filler, box, tilesize=32, extras=[], extraChance=.7):
    for y in range(box[3]):
        for x in range(box[2]):
            box2 = ((x + box[0]) * tilesize, (y + box[1])*tilesize)
            image.paste(filler, box2)
            if len(extras) > 0 and random() < extraChance:
                extra = extras[randint(0, len(extras)-1)]
                image.paste(extra, box2, extra)


def makeCloudEdges(worldSize=(65, 65), padding=(30, 10), tilesize=32):
    width = (worldSize[0] + 2*padding[0]) * tilesize
    height = (worldSize[1] + 2*padding[1]) * tilesize
    img = Image.new("RGBA", (width, height))

    tiles = getTiles()

    fillSolid(img, worldSize, padding, tiles, tilesize)
    fillEdges(img, worldSize, padding, tiles, tilesize)

    img.save("../../public/assets/cloud.png")


def fillEdges(img, worldSize, padding, tiles, tilesize):
    edges = tiles[8:12]
    fillSection(img, edges[0], (padding[0],
                                padding[1], worldSize[0], 1))
    fillSection(img, edges[2], (padding[0],
                                padding[1] + worldSize[0]-1, worldSize[0], 1))

    fillSection(img, edges[3], (padding[0],
                                padding[1], 1, worldSize[1]))
    fillSection(img, edges[1], (padding[0] + worldSize[0] - 1,
                                padding[1], 1, worldSize[1]))
    pass


def fillSolid(img, worldSize, padding, tiles, tilesize):
    height = (worldSize[1] + 2*padding[1]) * tilesize
    solid = tiles[0]
    extras = tiles[1:8]
    # for e in extras:
    # print(e)
    # e.save("EXTRA.png")
    fillSection(img, solid, (0, 0, padding[0], int(
        height/tilesize)), extras=extras)
    fillSection(img, solid, (padding[0] + worldSize[0],
                             0,
                             padding[0],
                             int(height/tilesize)), extras=extras)
    fillSection(img, solid, (padding[0], 0,
                             worldSize[0], padding[1]), extras=extras)
    fillSection(
        img, solid, (padding[0], padding[1]+worldSize[1],
                     worldSize[0], padding[1]),
        extras=extras)


makeCloudEdges()
