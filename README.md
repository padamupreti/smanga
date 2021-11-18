# smanga
A minimalistic manga reader/server for serving local manga images on desktop browser.\
Provides a two-page view layout just as reading a physical copy.

![Reader Demo](https://i.imgur.com/8JdS584.png)

## Requirements

* [Python](https://python.org/downloads/ "Download Python") (with pip)
* [Node.js](https://nodejs.org/en/download/ "Download Node.js") (with npm)

**Recommended:** `Python >= v3.8` and `Node.js >= v16.4`

## Directory structure & naming
Following naming scheme is to be followed for all manga to be served:
```
| <manga-location-on-machine>
    |-- series-name-in-dash-case/
        |-- chapters/
            |-- 0001/
                |-- 001.png
                |-- 002.png
                ...
            |-- 0002/
            ...
        |-- volumes/
            |-- 030/
                |-- 0120/
                    |-- 001.png
                    ...
                ...
            |-- 031/
            ...
    |-- another-series/
    ...
```
Series require their own folder, like `one-piece` or `attack-on-titan` in *dash-case*.\
Within each, `chapters/`, `volumes/` or both are to be created.

**NOTE**: `volumes/` needs to have chapter folders; each folder having images pertaining to the chapter

|Item|No. of characters for naming|Naming example|
|---------|--------------|-----|
|Chapter|4|Chapter 220 &#8658; `0220/`|
|Volume|3|Volume 100 &#8658; `100/`|
|Image|3|Fourth image &#8658; `004.png`|

## Initial Setup
Note that `pip` and `python` are `pip3` and `python3` for Linux

First, clone this repository and navigate into it.\
Run the following to install Django dependencies:
```
pip install -r requirements.txt
```
Now, run the following to configure manga location:
```
python configure.py <manga-location-on-machine>
```
Here, `<manga-location-on-machine>` is the absolute directory location where all manga is stored on machine.
An optional `-s` flag may be passed to store chapters in database:
```
python configure.py -s <manga-location-on-machine>
```
This is useful for series with longer chapters. By default, only volumes are stored.

Next, run the following to create the database:
```
python manage.py makemigrations
python manage.py migrate
```
Finally, navigate into `uireader` and run the following to build the UI:
```
npm install
npm run build
```
The setup is complete.

## Usage
Naviage into root of the project and run the following to launch local Django server:
```
python manage.py runserver
```
This should launch the server on [localhost](http://localhost:8000 "localhost:8000"). Chapters and volumes are accessible through simple navigation.

### Reader Interface
Clicking on the middle of screen activates the following menus:

![Top Menu](https://i.imgur.com/gho9Aee.png)
* **Upper Menu**
  * `Re` toggle &#8658; Rearrange/correct image order in the viewer
  * `<` &#8658; Next chapter/volume
  * `#0909` &#8658; Go to chapters/volumes listing
  * `>` &#8658; Previous chapter/volume
  * `Home` &#8658; Go to series listing

* **Lower Menu**

![Bottom Menu](https://i.imgur.com/Q3m45by.png)
Provides slider to quickly move between pages

**Keyboard shortcuts**
* *&#8595; or &#8592; or spacebar* &#8658; Next couple of pages
* *&#8593; or &#8594;* &#8658; Previous couple of pages
* *F key* &#8658; Toggle fullscreen mode
