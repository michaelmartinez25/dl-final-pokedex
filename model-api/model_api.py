import os
from flask import Flask, request
import torch
import torch.nn as nn
import torchvision.models as models
from glob import glob
from torchvision.transforms.functional import pil_to_tensor
from PIL import Image

UPLOAD_FOLDER = './upload'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/model/classify', methods=['POST'])
def classify_pokemon():
    """POST Method to recieve an Pokemon image and return its classification
    
    Invoked by the REACT front end at the url */model/classify

    Returns:
        The string pokemon classification of the image in the upload folder
    """
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file was uploaded"
        file = request.files['file']

        if file:
            if file.filename == '':
                return "Uploaded file has no filename"
            
            if not validate_extension(file.filename):
                return f"Invalid file extension for file: {file.filename}"

            # Removing old uploaded images in the directory
            for filename_to_del in glob(UPLOAD_FOLDER+'/*.*'):
                os.remove(filename_to_del)

            path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(path)
            return classify()
        
        return "File was uploaded improperly"
    return "Non POST requests are not supported"


def validate_extension(filename):
    """Validates whether or not the extension on the file is valid"""
    return filename.split(".")[1] in ["png", "jpeg", "jpg"]


def classify():
    """Classifies the input image using a finetuned ResNet50 model 
    
    Gets the image from the upload folder and conducts inference on it

    Returns: 
        The string pokemon classification of the image in the upload folder
    """
    resnet50 = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)
    for param in resnet50.parameters():
        param.requires_grad = False
    resnet50.avgpool = nn.AdaptiveAvgPool2d(output_size=(1,1))
    resnet50.fc = nn.Sequential(
        nn.Flatten(),
        nn.Linear(2048, 1024),
        nn.BatchNorm1d(1024),  # Batch normalization
        nn.ReLU(),
        nn.Dropout(0.5),  # Dropout with 50% probability
        nn.Linear(1024, 512),
        nn.BatchNorm1d(512),  # Batch normalization
        nn.ReLU(),
        nn.Dropout(0.5),  # Dropout with 50% probability
        nn.Linear(512, 151)
    )

    resnet50.load_state_dict(torch.load("final_state_dict.pt", map_location=torch.device('cpu')))
    resnet50.eval()

    img_paths = glob(UPLOAD_FOLDER+'/*.*')
    if len(img_paths) == 0:
        return "No file uploaded"

    img = pil_to_tensor(Image.open(img_paths[0]).convert('RGB'))
    transforms = models.ResNet50_Weights.IMAGENET1K_V1.transforms()
    img = transforms(img)

    argmax = resnet50(img.unsqueeze(0)).argmax(dim=1)

    # Gets the associated pokemon with the argmax index
    return POKEMON_LIST[argmax]

# All 151 Generation 1 pokemon in alphabetical order
POKEMON_LIST = [
    'Abra',
    'Aerodactyl',
    'Alakazam',
    'Arbok',
    'Arcanine',
    'Articuno',
    'Beedrill',
    'Bellsprout',
    'Blastoise',
    'Bulbasaur',
    'Butterfree',
    'Caterpie',
    'Chansey',
    'Charizard',
    'Charmander',
    'Charmeleon',
    'Clefable',
    'Clefairy',
    'Cloyster',
    'Cubone',
    'Dewgong',
    'Diglett',
    'Ditto',
    'Dodrio',
    'Doduo',
    'Dragonair',
    'Dragonite',
    'Dratini',
    'Drowzee',
    'Dugtrio',
    'Eevee',
    'Ekans',
    'Electabuzz',
    'Electrode',
    'Exeggcute',
    'Exeggutor',
    'Farfetchd',
    'Fearow',
    'Flareon',
    'Gastly',
    'Gengar',
    'Geodude',
    'Gloom',
    'Golbat',
    'Goldeen',
    'Golduck',
    'Golem',
    'Graveler',
    'Grimer',
    'Growlithe',
    'Gyarados',
    'Haunter',
    'Hitmonchan',
    'Hitmonlee',
    'Horsea',
    'Hypno',
    'Ivysaur',
    'Jigglypuff',
    'Jolteon',
    'Jynx',
    'Kabuto',
    'Kabutops',
    'Kadabra',
    'Kakuna',
    'Kangaskhan',
    'Kingler',
    'Koffing',
    'Krabby',
    'Lapras',
    'Lickitung',
    'Machamp',
    'Machoke',
    'Machop',
    'Magikarp',
    'Magmar',
    'Magnemite',
    'Magneton',
    'Mankey',
    'Marowak',
    'Meowth',
    'Metapod',
    'Mew',
    'Mewtwo',
    'Moltres',
    'MrMime',
    'Muk',
    'Nidoking',
    'Nidoqueen',
    'Nidoran-f',
    'Nidoran-m',
    'Nidorina',
    'Nidorino',
    'Ninetales',
    'Oddish',
    'Omanyte',
    'Omastar',
    'Onix',
    'Paras',
    'Parasect',
    'Persian',
    'Pidgeot',
    'Pidgeotto',
    'Pidgey',
    'Pikachu',
    'Pinsir',
    'Poliwag',
    'Poliwhirl',
    'Poliwrath',
    'Ponyta',
    'Porygon',
    'Primeape',
    'Psyduck',
    'Raichu',
    'Rapidash',
    'Raticate',
    'Rattata',
    'Rhydon',
    'Rhyhorn',
    'Sandshrew',
    'Sandslash',
    'Scyther',
    'Seadra',
    'Seaking',
    'Seel',
    'Shellder',
    'Slowbro',
    'Slowpoke',
    'Snorlax',
    'Spearow',
    'Squirtle',
    'Starmie',
    'Staryu',
    'Tangela',
    'Tauros',
    'Tentacool',
    'Tentacruel',
    'Vaporeon',
    'Venomoth',
    'Venonat',
    'Venusaur',
    'Victreebel',
    'Vileplume',
    'Voltorb',
    'Vulpix',
    'Wartortle',
    'Weedle',
    'Weepinbell',
    'Weezing',
    'Wigglytuff',
    'Zapdos',
    'Zubat',
]

