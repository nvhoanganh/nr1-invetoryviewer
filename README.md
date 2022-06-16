# List all APM Services and their key attributes (Language, NR and Run time version, etc)

```bash
# clone this repo and install dependencies
npm install

# replace the ACCOUNTID and USERAPIKEY below (from https://one.newrelic.com/api-keys)
ACCOUNTID=xxxx USERAPIKEY=yyyy node . > output.csv

```

![](2022-06-14-10-40-26.png)

## Deploy as Nerdpack

1. Ensure that you have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [NPM](https://www.npmjs.com/get-npm) installed. If you're unsure whether you have one or both of them installed, run the following command. (If you have them installed these commands will return a version number, if not, the commands won't be recognized.)

    ```bash
    git --version
    npm -v
    ```

2. Install the [New Relic One CLI](https://one.newrelic.com/launcher/developer-center.launcher) by going to [this link](https://one.newrelic.com/launcher/developer-center.launcher) and following the instructions (5 minutes or less) to install and set up your New Relic development environment.

3. Run the following command to clone this repository and run the code locally against your New Relic data:

    ```bash
    git clone https://github.com/nvhoanganh/nr1-invetoryviewer.git
    cd nr1-invetoryviewer/nr1-inventoryviewer
    nr1 nerdpack:serve
    ```

Visit [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local), navigate to the Nerdpack, and :sparkles:

## Deploying this Nerdpack

Open a command prompt in the Nerdpack's directory, and run the following commands.

```bash
# To create a new uuid for the nerdpack so that you can deploy it to your account:
# nr1 nerdpack:uuid -g [--profile=your_profile_name]

# To see a list of APIkeys / profiles available in your development environment:
# nr1 profiles:list

nr1 nerdpack:publish [--profile=your_profile_name]
nr1 nerdpack:deploy [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
nr1 nerdpack:subscribe [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
```
