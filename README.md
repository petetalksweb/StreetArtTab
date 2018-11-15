# StreetArtTab

I like street art, always have, probably always will.

As it is, Google Chrome's default new tab screen is more likely to convince me to click on a link to [Twitter](https://twitter.com/PeteTalksWeb/) than
it is to help me be productive.

Ergo: Street Art Tab, a Google Chrome extension that replaces Chrome's default new tab with a ~~in my opinion~~ beautiful 
street art image.

![image](https://user-images.githubusercontent.com/3345162/48565145-75f12100-e8bd-11e8-922b-7bcffdf818c3.png)

## Where can I find it?

[Here](https://chrome.google.com/webstore/detail/street-art-tab/ebjknfneccjdmkjccpoddhmpciomphok?utm_source=chrome-ntp-icon).

## How are images selected?

The images displayed are hand-picked by me and saved into this [Unsplash collection](https://unsplash.com/collections/3274043/street-art).
If there is an image you would like displayed, please upload it to Unsplash and email the Unsplash link to [streetarttab@gmail.com](mailto:streetarttab@gmail.com).

## What if I don't use Google Chrome?

You clearly have bigger issues than what shows up on your new tab page... but for now just go ahead and set [streetarttab.com](https://streetarttab.com/) as your homepage.

## How does it work?

[Unsplash](https://unsplash.com/) is an amazing site, that provides:

> Beautiful, free photos. Gifted by the world’s most generous community of photographers.

And fortunately for us, they have an [API](https://unsplash.com/developers).

Now, this free API, does have rate limits, and since I do not want to risk having my rate limit used up fetching images for the
extension (or more maliciously by someone stealing my API key and using it for their applications), I had to set it up so that
the Unsplash API was only called a certain number of times.

Enter [AWS Lambda](https://aws.amazon.com/lambda/?nc2=h_m1).

Using Python and AWS Lambda, I easily made a script that will call the Unsplash API and get 30 random landscape oriented, 
and 30 random portrait oriented images from my street art images collection. Then, I set up an [Amazon CloudWatch](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) 
trigger to run the function once per day, ensuring that I always stay in [AWS Lambda's free tier](https://aws.amazon.com/lambda/pricing/).

Now that I am pulling my image information for free, where do I host this information for my extension to pull for free? 
[GitHub Pages](https://pages.github.com/). 

Just add a couple lines to my AWS Lambda function that use [PyGitHub](https://github.com/PyGithub/PyGithub)
to commit the new image data as a JSON file on my gh-pages branch, and vualá, I have a [free, constantly updating, JSON file](https://streetarttab.com/unsplashLinks.json)
of hand picked street art images for my extension to pull.

## Attributions

All images are hosted on [Unsplash](https://unsplash.com/), and credit for each individual image is given to the photographer
whenever their image is displayed on the extension and website.

The extension uses [Font Awesome](https://fontawesome.com/)'s redo icon. Check out their license [here](https://fontawesome.com/license).

The image displayed in the screenshot taken for this readme, and used as the thumbnail for [Open Graph tags](http://ogp.me/), was taken by Mark Hayward. Check out his Unsplash portfolio [here](https://unsplash.com/@mhayward).

