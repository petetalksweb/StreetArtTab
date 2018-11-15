# StreetArtTab

I like street art, always have, probably always will.

I think Google Chrome's default new tab screen is more likely to convince me to click on the link to Facebook than
it is to help me be productive.

Ergo: Street Art Tab, a Google Chrome extension that replaces Chrome's default new tab with a ~~in my opinion~~ beautiful 
street art image.

![image](https://user-images.githubusercontent.com/3345162/48524418-cfb60480-e845-11e8-9475-f8c02de8ab80.png)

## How are images selected

The images displayed are handpicked by me and saved into this [Unsplash collection](https://unsplash.com/collections/3274043/street-art).
If there is an image you would like displayed, please upload it to Unsplash and email the Unsplash link to [streetarttab@gmail.com](mailto:streetarttab@gmail.com).

## What if I don't use Google Chrome?

Go ahead and just set [streetarttab.com](https://streetarttab.com/) as your homepage then!

## How it works

[Unsplash](https://unsplash.com/) is an amazing site, that provides:

> Beautiful, free photos. Gifted by the world’s most generous community of photographers.

And fortunately for us, they have an [API](https://unsplash.com/developers).

Now, this free API, does have rate limits, and since I do not want to risk having my rate limit used up fetching images for the
extension (or more malisciously by someone stealing my API key and using it for their applications), I had to set it up so that
the Unsplash API was only called a certain number of times.

Enter [AWS Lambda](https://aws.amazon.com/free/webapps/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=ACQ-P%7CPS-GO%7CBrand%7CDesktop%7CSU%7CCompute%7CLambda%7CUS%7CEN%7CText&sc_content=lambda_e&sc_detail=aws%20lambda&sc_category=Compute&sc_segment=293647287583&sc_matchtype=e&sc_country=US&s_kwcid=AL!4422!3!293647287583!e!!g!!aws%20lambda&ef_id=CjwKCAiArK_fBRABEiwA0gOOc0AwtmO9vIaIxjmDcwQqLGN0uqgaAvlCX1KsNkJjHvDm9l37l-YweRoClvwQAvD_BwE:G:s).

Using Python and AWS Lambda, I easily made a script that will call the Unsplash API and get 30 random landscape oriented, 
and 30 random portrait oriented images from my street art images collection. Then, I set up an [Amazon CloudWatch](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) 
trigger to run the function once per day, ensuring that I always stay in [AWS Lambda's free tier](https://aws.amazon.com/lambda/pricing/).

Now that I am pulling my image information for free, where do I host this information for my extension to pull for free? 
[GitHub Pages](https://pages.github.com/). 

Just add a couple lines to my AWS Lambda function that use [PyGitHub](https://github.com/PyGithub/PyGithub)
to commit the new image data as a JSON file to my gh-pages branch, and vualá, I have a [free, constantly updating, JSON file](https://streetarttab.com/unsplashLinks.json)
of hand picked street art images for my extension to pull.

## Attributions

All images are hosted on [Unsplash](https://unsplash.com/), and credit for each individual image is given to the photographer
whenever their image is displayed on the extension and website.

The extension uses [Font Awesome](https://fontawesome.com/)'s redo icon. Check out their license [here](https://fontawesome.com/license).

The screenshot taken for this readme was taken by Mark Hayward. Check out his Unsplash portfolio [here](https://unsplash.com/@mhayward).

